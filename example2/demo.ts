import { Database } from "jsr:@db/sqlite@0.12";

const DB_PATH = "plod.db";
const PORT = 8181;

// Initialize database
function initDb(): Database {
  const db = new Database(DB_PATH);
  db.exec(`
    CREATE TABLE IF NOT EXISTS plod (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      summary TEXT NOT NULL,
      tags TEXT,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  return db;
}

// Open browser based on platform
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

// HTML template
function renderHtml(rows: Array<{ id: number; summary: string; tags: string; description: string; created_at: string }>, sortBy: string, sortDir: string, filter: string): string {
  const toggleDir = sortDir === "asc" ? "desc" : "asc";
  const summaryArrow = sortBy === "summary" ? (sortDir === "asc" ? " ▲" : " ▼") : "";
  const dateArrow = sortBy === "created_at" ? (sortDir === "asc" ? " ▲" : " ▼") : "";

  const tableRows = rows.map(row => `
    <tr>
      <td>${escapeHtml(row.summary)}</td>
      <td>${escapeHtml(row.tags || "")}</td>
      <td>${escapeHtml(row.description || "")}</td>
      <td>${row.created_at}</td>
    </tr>
  `).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Plod - Task Manager</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; max-width: 900px; margin: 0 auto; padding: 20px; background: #f5f5f5; }
    h1 { color: #333; }
    form { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 20px; }
    label { display: block; margin-bottom: 5px; font-weight: 600; color: #555; }
    input[type="text"], textarea { width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; }
    textarea { height: 100px; resize: vertical; }
    button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; }
    button:hover { background: #0056b3; }
    .filter-section { background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 20px; }
    .filter-section input { margin-bottom: 0; }
    table { width: 100%; background: white; border-collapse: collapse; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    th, td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #eee; }
    th { background: #007bff; color: white; cursor: pointer; user-select: none; }
    th a { color: white; text-decoration: none; display: block; }
    th:hover { background: #0056b3; }
    tr:hover { background: #f8f9fa; }
    tr:last-child td { border-bottom: none; }
    .empty { text-align: center; padding: 40px; color: #999; }
  </style>
</head>
<body>
  <h1>Plod</h1>

  <form method="POST" action="/add">
    <label for="summary">Summary</label>
    <input type="text" id="summary" name="summary" required placeholder="Enter task summary...">

    <label for="tags">Tags</label>
    <input type="text" id="tags" name="tags" placeholder="Enter tags (comma separated)...">

    <label for="description">Description</label>
    <textarea id="description" name="description" placeholder="Enter detailed description..."></textarea>

    <button type="submit">Add Entry</button>
  </form>

  <div class="filter-section">
    <label for="filter">Filter by Summary or Tags</label>
    <input type="text" id="filter" name="filter" placeholder="Type to filter..." value="${escapeHtml(filter)}" oninput="applyFilter(this.value)">
  </div>

  <table>
    <thead>
      <tr>
        <th><a href="/?sort=summary&dir=${sortBy === "summary" ? toggleDir : "asc"}&filter=${encodeURIComponent(filter)}">Summary${summaryArrow}</a></th>
        <th>Tags</th>
        <th>Description</th>
        <th><a href="/?sort=created_at&dir=${sortBy === "created_at" ? toggleDir : "desc"}&filter=${encodeURIComponent(filter)}">Date${dateArrow}</a></th>
      </tr>
    </thead>
    <tbody>
      ${tableRows || '<tr><td colspan="4" class="empty">No entries yet. Add one above!</td></tr>'}
    </tbody>
  </table>

  <script>
    let debounceTimer;
    function applyFilter(value) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const url = new URL(window.location);
        url.searchParams.set("filter", value);
        window.location = url.toString();
      }, 300);
    }
  </script>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Main server
async function main() {
  const db = initDb();
  console.log(`Server starting on http://localhost:${PORT}`);

  // Open browser after a short delay
  setTimeout(() => openBrowser(`http://localhost:${PORT}`), 500);

  const server = Deno.serve({ port: PORT }, async (req) => {
    const url = new URL(req.url);

    if (req.method === "POST" && url.pathname === "/add") {
      const formData = await req.formData();
      const summary = formData.get("summary") as string;
      const tags = formData.get("tags") as string;
      const description = formData.get("description") as string;

      if (summary) {
        db.exec(
          "INSERT INTO plod (summary, tags, description) VALUES (?, ?, ?)",
          [summary, tags || "", description || ""]
        );
      }

      return new Response(null, {
        status: 303,
        headers: { Location: "/" },
      });
    }

    if (req.method === "GET" && (url.pathname === "/" || url.pathname === "")) {
      const sortBy = url.searchParams.get("sort") || "created_at";
      const sortDir = url.searchParams.get("dir") || "desc";
      const filter = url.searchParams.get("filter") || "";

      const validSortColumns = ["summary", "created_at"];
      const validDirs = ["asc", "desc"];
      const safeSort = validSortColumns.includes(sortBy) ? sortBy : "created_at";
      const safeDir = validDirs.includes(sortDir) ? sortDir : "desc";

      let query = "SELECT id, summary, tags, description, created_at FROM plod";
      const params: string[] = [];

      if (filter) {
        query += " WHERE summary LIKE ? OR tags LIKE ?";
        params.push(`%${filter}%`, `%${filter}%`);
      }

      query += ` ORDER BY ${safeSort} ${safeDir}`;

      const rows = db.prepare(query).all(...params) as Array<{
        id: number;
        summary: string;
        tags: string;
        description: string;
        created_at: string;
      }>;

      const html = renderHtml(rows, safeSort, safeDir, filter);

      return new Response(html, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    return new Response("Not Found", { status: 404 });
  });

  await server.finished;
  db.close();
}

main();
