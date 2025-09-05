#!/usr/bin/env node

/**
 * Documentation Version Management Script
 *
 * Enforces our documentation versioning policy:
 * - Maximum of 2 major version lines at any time
 * - Stable cycle: Latest major + Previous major
 * - Pre-release cycle: Latest major + New pre-release (removes old previous major or current pre-release)
 */

const fs = require('fs');
const path = require('path');
const semver = require('semver');

const DOCS_DIR = './docs';
const VERSIONS_JS_FILE = path.join(DOCS_DIR, 'versions.js');

/**
 * Get current version from package.json
 */
function getCurrentVersion() {
  return require('../package.json').version;
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
 * Update versions.js for TypeDoc plugin
 */
function updateVersionsFile(versionsToKeep) {
  const versionNames = versionsToKeep.map((version) => `'v${version}'`);
  const versionsJsContent = `"use strict"
export const DOC_VERSIONS = [
\t${versionNames.join(',\n\t')},
];
`;

  fs.mkdirSync(DOCS_DIR, { recursive: true });
  fs.writeFileSync(VERSIONS_JS_FILE, versionsJsContent);
  console.log(
    `📝 Updated versions.js with ${versionsToKeep.length} versions`
  );
}

/**
 * Main function
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

if (require.main === module) {
  main();
}

module.exports = {
  getCurrentVersion,
  getExistingVersions,
  getVersionsToKeep,
  cleanupOldVersions,
  updateVersionsFile,
};
