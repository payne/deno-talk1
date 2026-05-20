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

