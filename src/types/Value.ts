import { TypeClassInterface } from "../interfaces/TypeClassInterface";

export class Value implements TypeClassInterface {
  private readonly key: string;
  private readonly value: string;
  private readonly operator?: string;

  constructor(rawString: string);
  constructor(key: string, operator: string, value: string);
  constructor(a: string, b?: string, c?: string) {
    if (a && b && c) {
      this.key = a;
      this.operator = b;
      this.value = c;
    } else {
      const array = a
        .trim()
        .split(" ")
        .map((e) => e.trim())
        .filter((e) => e !== "");
      if (array.length === 3) {
        this.key = array[0];
        this.operator = array[1];
        this.value = array[2];
      } else {
        console.error(new Error("Count not parse Config line :: '" + a + "'"));
      }
    }
  }

  getFileString(depth = 0) {
    return `${" ".repeat(depth * 4)}${this.key} ${this.operator} ${this.value}\n`;
  }
}
