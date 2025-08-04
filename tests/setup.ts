import path from "path";
import nock from "nock";

const { back: nockBack } = nock;

// Use a fixed path relative to the test directory instead of import.meta.url
nockBack.fixtures = path.join(__dirname, "..", "tests");

// Note: We're removing the global fetch polyfill temporarily to avoid module issues
// If tests need fetch, they can import it directly
