---

# Example 1: Hello World HTTP Server

---

# Simple HTTP Server

```typescript
// server.ts
Deno.serve({ port: 8000 }, (request: Request): Response => {
  const url = new URL(request.url);

  return new Response(`Hello from ${url.pathname}!`, {
    headers: { "content-type": "text/plain" },
  });
});

console.log("Server running on http://localhost:8000");
```

---

# Running the Server

```bash
deno run --allow-net server.ts
```

**Permission flags:**
- `--allow-net` - Allow network access
- `--allow-read` - Allow file system reads
- `--allow-write` - Allow file system writes
- `--allow-env` - Allow environment variable access
- `-A` - Allow all permissions (use with caution!)

---

# Using the Standard Library

```typescript
import { serveDir } from "jsr:@std/http/file-server";

Deno.serve((req: Request) => {
  return serveDir(req, {
    fsRoot: "public",
    showIndex: true,
  });
});
```

Serve static files with just a few lines!

