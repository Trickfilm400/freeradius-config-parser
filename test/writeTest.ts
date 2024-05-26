import { File } from "../src/index";
import * as assert from "node:assert";
import { Block } from "../src/types/Block";
import { Comment } from "../src/types/Comment";
import { Value } from "../src/types/Value";
import { Blank } from "../src/types/Blank";

describe("Writing-Test", () => {
  it("should parse simple block", () => {
    const inputStr = "block {\n    setting = yes\n}";
    const obj = new File(inputStr);
    //console.log(obj.getElements());
    assert.deepStrictEqual(obj.getElements(), [
      new Block("block", [new Value("setting", "=", "yes")]),
    ]);
    assert.strictEqual(obj.write(true), inputStr + "\n");
  });
  it("should parse nested block", () => {
    const inputStr = "block {\n    setting = yes\n    # comment\n}";
    const obj = new File(inputStr);
    //console.log(obj.getElements());
    assert.deepStrictEqual(obj.getElements(), [
      new Block("block", [
        new Value("setting", "=", "yes"),
        new Comment("# comment"),
      ]),
    ]);
    assert.strictEqual(obj.write(true), inputStr + "\n");
  });
  it("should parse nested block with blank line", () => {
    const inputStr = "block {\n    setting = yes\n    \n    # comment\n}";
    const obj = new File(inputStr);
    //console.log(obj.getElements());
    assert.deepStrictEqual(obj.getElements(), [
      new Block("block", [
        new Value("setting", "=", "yes"),
        new Blank(1),
        new Comment("# comment"),
      ]),
    ]);
    assert.strictEqual(obj.write(true), inputStr + "\n");
  });

  it("should write nested block with blank line", () => {
    const inputStr = "block {\n    setting = yes\n    \n    # comment\n}";
    const obj = new File("./file.conf", false, [
      new Block("block", [
        new Value("setting", "=", "yes"),
        new Blank(1),
        new Comment("# comment"),
      ]),
    ]);
    //console.log(obj.getElements());
    assert.strictEqual(obj.write(true), inputStr + "\n");
  });
});
