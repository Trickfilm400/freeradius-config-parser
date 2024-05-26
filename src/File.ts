import { Block } from "./types/Block";
import * as fs from "node:fs";
import { AllTypes } from "./interfaces/AllTypesEnum";
import { Comment } from "./types/Comment";
import { Blank } from "./types/Blank";
import { Value } from "./types/Value";

/**
 * Main Class for Handling configuration files
 * @author Trickfilm400
 * @version 0.0.1
 * @since 0.0.1
 * @class
 * @public
 */
export class File {
  /** array of the parsed file as lines, split by line separator*/
  private _fileLines: string[];
  /** @internal array of configuration blocks. Used for parsing and storing the actual config options in it as elements*/
  private _currentBlock: Block[];
  /** Filename used for reading and writing this configuration elements of this class*/
  private readonly _filename: string;

  /** @constructor for parsing a string of a config file separated by line separator, useful when getting the file contents manually*/
  constructor(fileNameOrContentString: string);
  /** @constructor mainly for saving a config into a file: filename with config elements and optionally writeDirectly without having to call the `write` method*/
  constructor(filename: string, writeDirectly: boolean, elements: AllTypes[]);
  /** @constructor mainly for reading a file: filename must be given and optionally the parsing can be started without needing to run `parse` method */
  constructor(filename: string, parseDirectly: boolean);
  constructor(file: string, directAction?: boolean, optElement?: AllTypes[]) {
    if (fs.existsSync(file)) {
      this._filename = file || "./test/proxy.conf";
      if (directAction) this.parse();
    } else if (!optElement) {
      this._fileLines = file.split("\n").map((e) => e.trim());
      this.runParsing();
    }
    if (optElement) {
      this._currentBlock = [new Block("root", optElement)];
      if (directAction) this.write();
    }
  }

  /**
   * Getting all configuration elements
   * @public
   */
  public getElements() {
    return this._currentBlock?.[0].getChildren();
  }

  private readFile() {
    this._fileLines = fs
      .readFileSync(this._filename, { encoding: "utf-8" })
      .toString()
      .split("\n")
      .map((e) => e.trim());
  }

  /**
   * Starting the parsing process of a file WITH reading the file of the filesystem
   * @public
   */
  public parse() {
    this.readFile();
    if (!this._currentBlock) this._currentBlock = [new Block("root")];
    this.runParsing();
  }

  private addToBlock(x: AllTypes) {
    if (!x) return;
    const innerBlock = this._currentBlock[this._currentBlock.length - 1];
    innerBlock.addChild(x);
  }

  private getLastType() {
    const innerBlock = this._currentBlock[this._currentBlock.length - 1];
    return innerBlock.getChildren()[innerBlock.getChildren().length - 1];
  }

  private runParsing() {
    if (!this._currentBlock) this._currentBlock = [new Block("root")];
    if (this._fileLines.length <= 1)
      throw new Error("One-Line-Config is not supported.");
    this._fileLines.forEach((value) => {
      if (value.startsWith("#")) {
        const last = this.getLastType();
        if (last instanceof Comment) {
          last.addLine(value);
        } else this.addToBlock(new Comment(value));
      } else if (value === "") {
        const last = this.getLastType();
        if (last instanceof Blank) {
          last.addLine();
        } else this.addToBlock(new Blank(1));
      } else if (value.endsWith("{")) {
        this._currentBlock.push(new Block(value.split(" ").slice(0, -1)));
      } else if (value.endsWith("}")) {
        const innerBlock = this._currentBlock.pop()!;
        this.addToBlock(innerBlock);
      } else {
        this.addToBlock(new Value(value));
      }
    });
  }

  /**
   * @public
   * @param {true} getAsString - if TRUE; do NOT save a file, return the file content only as string with line separator
   * @throws Error - if no parsed data was found
   */
  public write(getAsString?: boolean): string;
  /**
   * @public
   * @param {string} overWriteFileName - if STRING; specify another file name to write into, maybe useful for checking some config without overwriting it
   * @throws Error - if no parsed data was found
   */
  public write(overWriteFileName?: string): void;
  public write(config?: boolean | string): string | void {
    let str = "";
    if (!this.getElements()) throw new Error("Need to parse Data first.");
    this.getElements().forEach((el) => {
      str += el.getFileString(0);
    });
    if (config === true) return str;
    return fs.writeFileSync(
      typeof config === "string" ? config : this._filename,
      str,
      "utf-8",
    );
  }
}
