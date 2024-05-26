import { TypeClassInterface } from "../interfaces/TypeClassInterface";

export class Blank implements TypeClassInterface {
  private length = 0;

  constructor(length?: number) {
    if (length) this.length += length;
  }

  addLine() {
    this.length += 1;
  }

  getLength() {
    return this.length;
  }

  getFileString(depth = 0) {
    return `${" ".repeat(depth * 4)}${"\n".repeat(this.length)}`;
  }
}
