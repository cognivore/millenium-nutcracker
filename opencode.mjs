// AI-generated module: model `claude-fable-5-2`; reasoning effort 80.
import { fileURLToPath } from "node:url";

export const MilleniumNutcracker = async () => ({
  config: async (config) => {
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
