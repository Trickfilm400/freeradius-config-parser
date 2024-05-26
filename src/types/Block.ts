import { AllTypes } from "../interfaces/AllTypesEnum";
import { TypeClassInterface } from "../interfaces/TypeClassInterface";

export class Block implements TypeClassInterface {
  private readonly children: AllTypes[] = [];
  private readonly names: string[];

  constructor(name: string, children?: AllTypes[]);
  constructor(name: string[], children?: AllTypes[]);
  constructor(names: string | string[], children?: AllTypes[]) {
    if (children) this.children = children;
    if (Array.isArray(names)) this.names = names;
    else this.names = [names];
  }

  addChild(x: AllTypes) {
    this.children.push(x);
  }

  getChildren() {
    return this.children;
  }

  getFileString(depth = 0) {
    let str = `${" ".repeat(depth * 4)}${this.names.join(" ")} {\n`;
    this.children.forEach((el) => {
      str += el.getFileString(depth + 1);
    });
    str += " ".repeat(depth * 4) + "}\n";
    return str;
  }
}
