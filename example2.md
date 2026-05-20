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

