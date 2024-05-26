import * as assert from "node:assert";
import { getFiles } from "./_bootstrap";
describe.skip("Tests", () => {
  before(function () {
    this.timeout(20000);
    return getFiles();
  });
  it("should work", () => {
    assert.strictEqual(true, true);
  });
});
