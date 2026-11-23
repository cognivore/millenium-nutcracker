// AI-generated module: model `claude-fable-5-2`; reasoning effort 80.
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const backupWholeHome = () => {
  const home = process.env.HOME;
  if (!home) {
    throw new Error("Trample guard: $HOME is unset; refusing to guess what to back up.");
  }
  const stamp = new Date().toISOString().replace(/\D/g, "");
  const dest = join(home, `backup-${stamp}`);
  mkdirSync(dest, { recursive: true });
  execFileSync("tar", [
    "-czf",
    join(dest, "home.tar.gz"),
    "--exclude=backup-20*",
    "--exclude=./backup-20*",
    "-C",
    home,
    ".",
  ]);
  return dest;
};

export const MilleniumNutcracker = async () => ({
  config: async (config) => {
    // To prevent trampling, we backup $HOME
    if (process.env.NUTCRACKER_TRAMPLE_GUARD === "1") {
      backupWholeHome();
    }
    const skills = fileURLToPath(new URL("./skills", import.meta.url));
    config.skills = {
      ...config.skills,
      paths: [...new Set([...(config.skills?.paths ?? []), skills])],
    };
    const keepGoing = fileURLToPath(
      new URL("./skills/keep-going/SKILL.md", import.meta.url),
    );
    const improveSelfEsteem = fileURLToPath(
      new URL("./skills/improve-self-esteem/SKILL.md", import.meta.url),
    );
    config.command = {
      "keep-going": {
        description: "Apply keep-going to a goal that is not yet achieved or not perfected",
        template: `Read and apply ${keepGoing} to the following task.\n\n$ARGUMENTS`,
      },
      "improve-self-esteem": {
        description: "Apply improve-self-esteem to a goal that appears unattainable",
        template: `Read and apply ${improveSelfEsteem} to the following task.\n\n$ARGUMENTS`,
      },
      ...config.command,
    };
  },
});
