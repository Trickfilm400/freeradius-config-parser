import { File } from "../src/index";
import * as assert from "node:assert";
import { Block } from "../src/types/Block";
import { Comment } from "../src/types/Comment";
import { Value } from "../src/types/Value";
import { Blank } from "../src/types/Blank";

describe("Parsing-Test", () => {
  it("should parse simple block", () => {
    const obj = new File("block {\nsetting = yes\n}");
    //console.dir(obj.getElements(), { depth: 5 });
    assert.deepStrictEqual(obj.getElements(), [
      new Block("block", [new Value("setting", "=", "yes")]),
    ]);
  });
  it("should parse nested block", () => {
    const obj = new File("block {\nsetting = yes\n# comment\n}");
    //console.log(obj.getElements());
    assert.deepStrictEqual(obj.getElements(), [
      new Block("block", [
        new Value("setting", "=", "yes"),
        new Comment("# comment"),
      ]),
    ]);
  });
  it("should parse nested block with blank line", () => {
    const obj = new File("block {\nsetting = yes\n\n# comment\n}");
    //console.log(obj.getElements());
    assert.deepStrictEqual(obj.getElements(), [
      new Block("block", [
        new Value("setting", "=", "yes"),
        new Blank(1),
        new Comment("# comment"),
      ]),
    ]);
  });
});
