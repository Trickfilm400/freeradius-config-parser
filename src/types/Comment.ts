import { TypeClassInterface } from "../interfaces/TypeClassInterface";

export class Comment implements TypeClassInterface {
  private lines: string[] = [];

  constructor(line?: string) {
    if (line) this.lines.push(line);
  }

  addLine(s: string) {
    this.lines.push(s);
  }

  getLines() {
    return this.lines;
  }

  getFileString(depth = 0) {
    return (
      this.lines
        .map((e) => (e.startsWith("#") ? e : `# ${e}`))
        .map((el) => `${" ".repeat(depth * 4)}${el}`)
        .join("\n") + "\n"
    );
  }
}
