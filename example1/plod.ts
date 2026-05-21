const currentNow = now();
const entry = entryFrom(Deno.args) ?? entryFrom(currentNow);
await Deno.writeTextFile(logFilePath(), `${currentNow} --\n${entry}\n`, {
  append: true,
});

function logFilePath() {
  // TODO: Check for `${HOME}/.plodrc` for now we'll just assume it's not there
  const path = Deno.env.get("HOME") ?? ".";
  return `${path}/plod.log`; // use `.plog.log` to make a "hidden file"
}

function entryFrom(param: string | string[]) {
  if (Array.isArray(param)) {
    return param.length > 0 ? param.join(" ") : undefined;
  }
  const currentNow = param;
  console.log(`${currentNow} --`);
  return prompt(``);
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
