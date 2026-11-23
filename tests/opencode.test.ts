// @ts-nocheck
// AI-generated tests: model `claude-fable-5-2`; reasoning effort 80.
//
// The expected configuration is recomputed here, independently of opencode.mjs, and compared.
import assert from "node:assert/strict";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { MilleniumNutcracker } from "../opencode.mjs";

async function reference(config: any): Promise<any> {
  const skills: any = fileURLToPath(new URL("../skills", import.meta.url));
  config.skills = {
    ...config.skills,
    paths: [...new Set([...(config.skills?.paths ?? []), skills])],
  };
  const keepGoing: any = fileURLToPath(new URL("../skills/keep-going/SKILL.md", import.meta.url));
  const improveSelfEsteem: any = fileURLToPath(new URL("../skills/improve-self-esteem/SKILL.md", import.meta.url));
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
}

test("the plugin configures OpenCode as an independent implementation does", async () => {
  var configs: any = [{}, { skills: { paths: ["/existing/skills"] }, command: { existing: { template: "keep" } } }, { skills: { urls: ["https://example.test/skills"] }, instructions: ["/existing/instructions.md"] }];
  for (var i = 0; i < configs.length; i++) {
    var actual: any = structuredClone(configs[i]);
    var expected: any = structuredClone(configs[i]);
    var plugin: any = await MilleniumNutcracker();
    await plugin.config(actual);
    await reference(expected);
    assert.deepStrictEqual(actual, expected);
    await plugin.config(actual);
    await reference(expected);
    assert.deepStrictEqual(actual, expected);
  }
});
