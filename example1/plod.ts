import { format } from "jsr:@std/internal@^1.0.5/format";

function from(param: string | string[]) {
if (Array.isArray(param)) {
  return param.length > 1 ? param.join(' ') : undefined
}
  const now = param;
  console.log(`${now} --`);
  return prompt(``);
}

const now = new Date().toLocaleString("en-US", {
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});
const entry = from(Deno.args) ?? from(now);
await Deno.writeTextFile("log.txt", `${now} --\n${entry}\n`, { append: true });
