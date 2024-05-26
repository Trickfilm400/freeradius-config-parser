/**
 * download http://ftp.de.debian.org/debian/pool/main/f/freeradius/freeradius-config_3.2.3+dfsg-2+b4_amd64.deb
 *
 * verify hash
 */

import { spawn } from "node:child_process";
import * as path from "node:path";
import * as fs from "node:fs";

// download();
//console.log(process.cwd());
const arr = [
  "run",
  "--rm",
  "-t",
  "-v",
  path.join(process.cwd(), "./test/docker") + ":/data",
  "alpine:3.20",
  "/data/execute.sh",
];

/**
 * CURRENTLY UNUSED
 */
export function getFiles() {
  return new Promise((resolve, reject) => {
    return resolve(void 0);
    // console.log(process.cwd());
    //fast-fail
    if (fs.existsSync(path.join(process.cwd(), "./test/docker/done")))
      return resolve(void 0);

    //get config files with docker
    const dockerProcess = spawn("docker", arr);

    dockerProcess.stderr.on("data", (t) => console.log(t.toString()));
    dockerProcess.stdout.on("data", (t) => console.log(t.toString()));
    dockerProcess.on("message", console.log);
    dockerProcess.on("exit", (code, err) => {
      console.log("exit", code, err);
      if (code) return reject(code);
      else return resolve(code);
    });
    dockerProcess.on("spawn", console.log);
    dockerProcess.on("error", console.log);
  });
}
