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

