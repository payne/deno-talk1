const PORT = 4242;

async function openBrowser(url: string) {
  const commands: Record<string, string[]> = {
    darwin: ["open", url],
    windows: ["cmd", "/c", "start", url],
    linux: ["xdg-open", url],
  };

  const cmd = commands[Deno.build.os];
  if (cmd) {
    const command = new Deno.Command(cmd[0], {
      args: cmd.slice(1),
      stdout: "null",
      stderr: "null",
    });
    await command.spawn();
  }
}

function main() {
  // Open browser after a half second delay
  setTimeout(() => openBrowser(`http://localhost:${PORT}`), 500);

  Deno.serve({ port: PORT }, async (req) => {
    const dateStr = new Date();
    return new Response(`Time is now: ${dateStr}`);
  });
}
main();
