#!/usr/bin/env -S deno run -A
const currentNow = now();
const entry = await entryFrom(Deno.args) ?? await entryFrom(currentNow);
await Deno.writeTextFile(logFilePath(), `${currentNow} --\n${entry}\n`, {
  append: true,
});

function logFilePath() {
  // TODO: Check for `${HOME}/.plodrc` for now we'll just assume it's not there
  const path = Deno.env.get("HOME") ?? ".";
  return `${path}/plod.log`; // use `.plog.log` to make a "hidden file"
}

async function entryFrom(param: string | string[]) {
  if (Array.isArray(param)) {
    return param.length > 0 ? param.join(" ") : undefined;
  }
  const currentNow = param;
  console.log(`${currentNow} --`);
  return await multiLinePrompt(``);
}

async function multiLinePrompt(promptString: string) {
  if (promptString) console.log(promptString);

  const decoder = new TextDecoder();
  let input = "";

  for await (const chunk of Deno.stdin.readable) {
    input += decoder.decode(chunk);
  }
  return input;
}

function now(): string {
  return new Date().toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
}
