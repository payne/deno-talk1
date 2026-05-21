const now = new Date().toLocaleString("en-US", {
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});
console.log(`${now} --`);
const entry = prompt(``);
await Deno.writeTextFile("log.txt", `${now} --\n${entry}\n`, { append: true });
