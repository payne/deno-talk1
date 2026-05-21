---
marp: true
theme: default
paginate: true
header: 'Introduction to Deno'
footer: 'https://github.com/payne/deno-talk1'
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

- Handy runtime for JavaScript and TypeScript
- Builds stand alone executables for Windows, Linux, and Macintosh OS X

### During this 30-minute talk
- We'll build a command line utility
- We'll build a small web application

---

# I like deno because

- `deno compile` bundles the application to run on computers without deno installed.
- [deno has a nice security model by default code is not allowed to do more than run (no file system or network access).](https://docs.deno.com/runtime/fundamentals/security/) `-A` for the lazy is handy.
- Diverse, competitive ecosystems can make things better

---

# Let's write some typescript!

This talk is not a television episode.  There is a pre-recorded YouTube of this talk if that's your jam.

Let's interact!  Let's have fun!

## Crazy goal -- in 30 minutes or less 
- We'll build a command line utility -- a simple version of plod
  - [plod is a 33+ year old utility for keeping a work journal](https://www.usenix.org/legacy/publications/library/proceedings/lisa93/full_papers/pomeranz.pdf) the link takes you to a [USENIX.org](https://www.usenix.org/) paper from 1993.
- We'll build a small web application
  - I want to show you a trick that warms my heart
