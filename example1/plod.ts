import { format } from "jsr:@std/internal@^1.0.5/format";

const currentNow = now();
const entry = from(Deno.args) ?? from(currentNow);
await Deno.writeTextFile("log.txt", `${currentNow} --\n${entry}\n`, { append: true });

function from(param: string | string[]) {
if (Array.isArray(param)) {
  return param.length > 0 ? param.join(' ') : undefined
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
