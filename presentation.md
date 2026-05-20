---
marp: true
theme: default
paginate: true
header: 'Introduction to Deno'
style: |
  section {
    background-color: #1a1a2e;
    color: #eaeaea;
  }
  h1 {
    color: #70c7ff;
  }
  h2 {
    color: #b8b8b8;
  }
  strong {
    color: #70c7ff;
  }
  code {
    background-color: #2d2d44;
    color: #f8f8f2;
  }
  pre {
    background-color: #2d2d44;
  }
  a {
    color: #70c7ff;
  }
  table {
    color: #eaeaea;
  }
  th {
    background-color: #2d2d44;
  }
  header, footer {
    color: #888;
  }
---

![w:200](deno-logo.svg)

# Deno is node reimagined and node compatible

* Handy runtime for JavaScript and TypeScript 
* Builds stand alone executables for Windows, Linux, and Macintosh OS X

### During this 30-minute talk
* We'll build a command line utility 
* We'll build a small web application 

---

# What is Deno?

- A **secure** runtime for JavaScript and TypeScript
- Built on **V8** and written in **Rust**
- Created by **Ryan Dahl** (original creator of Node.js)
- First-class TypeScript support (no configuration needed)
- Ships as a single executable

---

# Key Features

- **Secure by default** - No file, network, or environment access unless explicitly enabled
- **TypeScript out of the box** - No `tsconfig.json` required
- **Standard library** - Audited, maintained modules
- **Modern tooling** - Built-in formatter, linter, test runner, bundler
- **Web-compatible APIs** - `fetch`, `WebSocket`, `localStorage`, etc.

---

# History of Deno

---

# 2009: Node.js is Born

- Ryan Dahl creates Node.js
- JavaScript moves to the server
- npm ecosystem explodes in popularity
- But... some design decisions were made quickly

---

# 2018: "10 Things I Regret About Node.js"

Ryan Dahl's famous JSConf EU talk highlighted:

1. Not sticking with Promises
2. Security - everything has access to everything
3. The build system (GYP)
4. `package.json` and `node_modules`
5. `require()` without extensions
6. `index.js` resolution

---

# 2018-2020: Deno Development

- Development begins in 2018
- Written in Rust (originally Go)
- Focus on security, simplicity, and modern standards
- **Deno 1.0 released May 13, 2020**

---

# 2022-Present: Deno 2.0 Era

- **Node.js compatibility** - Run npm packages directly
- **deno.json** - Simple project configuration
- **JSR** - JavaScript Registry for modern packages
- Focus on backwards compatibility
- Production-ready for enterprise use

---

# Setting Up Deno

---

# Installation

**macOS / Linux:**
```bash
curl -fsSL https://deno.land/install.sh | sh
```

**Windows (PowerShell):**
```powershell
irm https://deno.land/install.ps1 | iex
```

**Homebrew:**
```bash
brew install deno
```

---

# Verify Installation

```bash
deno --version
```

Output:
```
deno 2.x.x
v8 12.x.x
typescript 5.x.x
```

---

# IDE Setup

**VS Code:**
1. Install the "Deno" extension by denoland
2. Enable Deno for your workspace:

```json
// .vscode/settings.json
{
  "deno.enable": true,
  "deno.lint": true,
  "deno.unstable": false
}
```

---

# Project Configuration

Create `deno.json` in your project root:

```json
{
  "tasks": {
    "dev": "deno run --watch main.ts",
    "start": "deno run --allow-net main.ts"
  },
  "imports": {
    "@std/": "jsr:@std/"
  }
}
```

Run tasks with: `deno task dev`

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

---

# Example 2: Using npm Packages

---

# npm Compatibility

Deno 2.0+ supports npm packages directly:

```typescript
// Using npm specifiers
import express from "npm:express@4";
import chalk from "npm:chalk@5";

const app = express();

app.get("/", (req, res) => {
  console.log(chalk.green("Request received!"));
  res.send("Hello from Express on Deno!");
});

app.listen(3000);
```

---

# Running npm-based Code

```bash
deno run --allow-net --allow-read --allow-env main.ts
```

- No `npm install` required
- Dependencies are cached globally
- Lock files supported via `deno.lock`

---

# Testing in Deno

```typescript
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

// math_test.ts
import { assertEquals } from "jsr:@std/assert";
import { add } from "./math.ts";

Deno.test("add function", () => {
  assertEquals(add(2, 3), 5);
  assertEquals(add(-1, 1), 0);
});
```

Run tests: `deno test`

---

# Built-in Tooling

```bash
# Format code
deno fmt

# Lint code
deno lint

# Type check
deno check main.ts

# Bundle for browser
deno bundle main.ts output.js

# Compile to executable
deno compile --allow-net main.ts
```

---

# Next Steps

---

# Resources to Explore

- **Official Docs**: [docs.deno.com](https://docs.deno.com)
- **Deno Standard Library**: [jsr.io/@std](https://jsr.io/@std)
- **JSR Registry**: [jsr.io](https://jsr.io)
- **Deno Deploy**: Serverless edge hosting
- **Fresh**: Full-stack web framework for Deno

---

# Migration Path from Node.js

1. Start with new projects or microservices
2. Use `npm:` specifiers for existing dependencies
3. Gradually adopt Deno-native packages from JSR
4. Leverage built-in tooling (no more ESLint, Prettier configs)
5. Enjoy the security model in production

---

# When to Choose Deno

| Use Deno When | Stick with Node When |
|---------------|----------------------|
| New projects | Large existing codebase |
| Security is critical | Native addon dependencies |
| TypeScript-first | Specific npm packages don't work |
| Want minimal config | Team familiarity matters |
| Edge/serverless | Established CI/CD pipelines |

---

# Thank You!

## Questions?

**Get Started Today:**
```bash
curl -fsSL https://deno.land/install.sh | sh
deno run https://examples.deno.land/hello-world.ts
```

🦕 Happy coding with Deno!

