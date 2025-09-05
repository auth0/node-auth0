#!/usr/bin/env node

/**
 * Documentation Version Management Script
 *
 * Enforces our documentation versioning policy:
 * - Maximum of 2 major version lines at any time
 * - Stable cycle: Latest major + Previous major
 * - Pre-release cycle: Latest major + New pre-release (removes old previous major or current pre-release)
 */

import fs from 'fs';
import path from 'path';
import semver from 'semver';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = './docs';
const VERSIONS_JS_FILE = path.join(DOCS_DIR, 'versions.js');

/**
 * Get current version from package.json
 */
function getCurrentVersion() {
  const packageJsonPath = path.join(__dirname, '../package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
  return packageJson.version;
}

/**
 * Get all existing version directories
 */
function getExistingVersions() {
    if (!fs.existsSync(DOCS_DIR)) return [];

    return fs
        .readdirSync(DOCS_DIR, { withFileTypes: true })
        .filter(
            (entry) =>
                entry.isDirectory() && semver.valid(entry.name.replace(/^v/, ''))
        )
        .map((entry) => entry.name.replace(/^v/, ''))
        .sort(semver.rcompare);
}

/**
 * Determine which versions to keep based on our policy
 */
function getVersionsToKeep(currentVersion, existingVersions) {
    const allVersions = [...new Set([currentVersion, ...existingVersions])].sort(
        semver.rcompare
    );
    const isCurrentPrerelease = semver.prerelease(currentVersion);

    // Get current branch from environment (GitHub Actions) or git
    const currentBranch = process.env.GITHUB_REF_NAME ||
        process.env.GITHUB_HEAD_REF ||
        'master';

    console.log(`🌿 Current branch: ${currentBranch}`);

    if (isCurrentPrerelease || currentBranch.startsWith('v')) {
        // Scenario B: Pre-release or version branch - Keep more versions for development
        const currentMajor = semver.major(currentVersion);
        const stableVersions = allVersions.filter((v) => !semver.prerelease(v));

        // Keep current version + latest stable major + previous major
        const latestStableMajor = stableVersions.find(
            (v) => semver.major(v) < currentMajor
        );
        const previousMajor = stableVersions.find(
            (v) => semver.major(v) < semver.major(latestStableMajor || currentVersion)
        );

        return [currentVersion, latestStableMajor, previousMajor].filter(Boolean);
    } else {
        // Scenario A: Stable - Keep latest 2 major versions (stable only)
        const stableVersions = allVersions.filter((v) => !semver.prerelease(v));
        const majorVersions = [...new Set(stableVersions.map(semver.major))].slice(
            0,
            2
        );

        return majorVersions.map((major) =>
            stableVersions.find((v) => semver.major(v) === major)
        );
    }
}

/**
 * Clean up old version directories
 */
function cleanupOldVersions(versionsToKeep, existingVersions) {
    const toRemove = existingVersions.filter((v) => !versionsToKeep.includes(v));

    toRemove.forEach((version) => {
        const versionDir = path.join(DOCS_DIR, `v${version}`);
        if (fs.existsSync(versionDir)) {
            console.log(`🗑️  Removing old documentation: v${version}`);
            fs.rmSync(versionDir, { recursive: true, force: true });
        }
    });
}

/**
 * Clean up symlinks and directories that TypeDoc versioning plugin will manage
 * This prevents EEXIST errors when the plugin tries to create new symlinks
 */
function cleanupVersionSymlinks() {
    const symlinkNames = ['stable', 'dev', 'latest', 'next'];

    // Also clean up potential version alias symlinks (like v4.29, v5.0, etc.)
    const existingVersions = getExistingVersions();
    existingVersions.forEach(version => {
        const majorMinor = `v${semver.major(version)}.${semver.minor(version)}`;
        const major = `v${semver.major(version)}`;
        symlinkNames.push(majorMinor, major);
    });

    symlinkNames.forEach((name) => {
        const linkPath = path.join(DOCS_DIR, name);
        if (fs.existsSync(linkPath)) {
            const stats = fs.lstatSync(linkPath);
            if (stats.isSymbolicLink()) {
                console.log(`🔗 Removing existing symlink: ${name}`);
                fs.unlinkSync(linkPath);
            } else if (stats.isDirectory()) {
                // Only remove directories that match version patterns or known aliases
                if (name.match(/^v\d+(\.\d+)?$/) || ['stable', 'dev', 'latest', 'next'].includes(name)) {
                    console.log(`📁 Removing conflicting directory: ${name}`);
                    fs.rmSync(linkPath, { recursive: true, force: true });
                }
            }
        }
    });
}

/**
 * Update versions.js for TypeDoc plugin
 * Orders versions with stable versions first, then pre-release versions
 */
function updateVersionsFile(versionsToKeep) {
    // Sort versions: stable versions first (descending), then pre-release versions (descending)
    const sortedVersions = [...versionsToKeep].sort((a, b) => {
        const aIsPrerelease = semver.prerelease(a);
        const bIsPrerelease = semver.prerelease(b);

        // If one is stable and the other is pre-release, stable comes first
        if (!aIsPrerelease && bIsPrerelease) return -1;
        if (aIsPrerelease && !bIsPrerelease) return 1;

        // If both are the same type (both stable or both pre-release), sort by version descending
        return semver.rcompare(a, b);
    });

    const versionNames = sortedVersions.map((version) => `'v${version}'`);
    const versionsJsContent = `"use strict"
export const DOC_VERSIONS = [
\t${versionNames.join(',\n\t')},
];
`;

    fs.mkdirSync(DOCS_DIR, { recursive: true });
    fs.writeFileSync(VERSIONS_JS_FILE, versionsJsContent);
    console.log(
        `📝 Updated versions.js with ${versionsToKeep.length} versions in order: ${sortedVersions.join(', ')}`
    );
}

/**
 * Pre-build cleanup function - call this before running TypeDoc
 */
function preBuildCleanup() {
    console.log('🧹 Pre-build cleanup...');
    cleanupVersionSymlinks();
    console.log('✅ Pre-build cleanup complete!');
}

/**
 * Main function - call this after TypeDoc has generated documentation
 */
function main() {
    console.log('🚀 Managing documentation versions...');

    const currentVersion = getCurrentVersion();
    const isPrerelease = semver.prerelease(currentVersion)
        ? 'pre-release'
        : 'stable';
    console.log(`📦 Current version: ${currentVersion} (${isPrerelease})`);

    const existingVersions = getExistingVersions();
    console.log(
        `📚 Found ${existingVersions.length} existing documentation versions`
    );

    const versionsToKeep = getVersionsToKeep(currentVersion, existingVersions);
    console.log(`✅ Keeping ${versionsToKeep.length} versions:`, versionsToKeep);

    cleanupOldVersions(versionsToKeep, existingVersions);
    updateVersionsFile(versionsToKeep);

    console.log('✨ Documentation version management complete!');
}

// Check if this file is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
    // Check if we should run pre-build cleanup
    const args = process.argv.slice(2);
    if (args.includes('--pre-build')) {
        preBuildCleanup();
    } else {
        main();
    }
}

export {
    getCurrentVersion,
    getExistingVersions,
    getVersionsToKeep,
    cleanupOldVersions,
    cleanupVersionSymlinks,
    updateVersionsFile,
    preBuildCleanup,
    main,
};
