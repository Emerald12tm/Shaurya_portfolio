import { test } from "node:test";
import assert from "node:assert/strict";
import { clampText, safeHttpUrl, safeUrlOnHost } from "../src/lib/safeUrl.ts";

test("allows normal http(s) links", () => {
  assert.equal(safeHttpUrl("https://safespace-ashen.vercel.app"), "https://safespace-ashen.vercel.app/");
  assert.equal(safeHttpUrl("http://example.com/a?b=1"), "http://example.com/a?b=1");
  assert.equal(safeHttpUrl("  example.com  "), "https://example.com/");
});

test("blocks script-running and non-web schemes", () => {
  for (const evil of [
    "javascript:alert(1)",
    "JaVaScRiPt:alert(document.cookie)",
    " javascript:alert(1)",
    "data:text/html,<script>alert(1)</script>",
    "vbscript:msgbox(1)",
    "file:///etc/passwd",
    "ftp://example.com",
  ]) {
    assert.equal(safeHttpUrl(evil), null, evil);
  }
});

test("blocks credentials, empty and malformed values", () => {
  assert.equal(safeHttpUrl("https://user:pass@example.com"), null);
  assert.equal(safeHttpUrl(""), null);
  assert.equal(safeHttpUrl(null), null);
  assert.equal(safeHttpUrl("https://"), null);
  assert.equal(safeHttpUrl("http://exa mple.com"), null);
});

test("host allow-list rejects look-alike domains", () => {
  assert.equal(safeUrlOnHost("https://github.com/Emerald12tm/safespace", ["github.com"]), "https://github.com/Emerald12tm/safespace");
  assert.equal(safeUrlOnHost("https://github.com.evil.io/x", ["github.com"]), null);
  assert.equal(safeUrlOnHost("https://evil.io/github.com", ["github.com"]), null);
  assert.equal(safeUrlOnHost("javascript:alert(1)//github.com", ["github.com"]), null);
});

test("clampText caps length and handles empties", () => {
  assert.equal(clampText("x".repeat(500), 10)?.length, 10);
  assert.equal(clampText("  hi  "), "hi");
  assert.equal(clampText("   "), null);
  assert.equal(clampText(null), null);
});
