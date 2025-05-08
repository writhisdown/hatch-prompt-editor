<p align="center" textAlign="center">
    <img src="https://www.usehatchapp.com/hubfs/favicon.ico" alt="Hatch Logo" width="32" height="32">
</p>

---
# Hatch prompt editor
This is a frontend challenge based on a real-world problem we've solved at Hatch.

We're excited to see how you approach a complex editing interface involving markdown.

## Goal

You'll improve our prompt building editor to:

- (Read) Renders the markdown beautifully
- Renders tool calling placeholders as interactive badges
- Supports replacing, inserting, and deleting functions
- (Write) Supports serialization back to markdown (round-trip)

## Repository Structure

```
.
├── src/
│   ├── data/           # Data models and types
│   ├── components/     # React components
│   ├── lib/           # Utility functions and helpers
│   ├── assets/        # Static assets
│   └── App.tsx        # Main application component
├── public/            # Public static files
└── [config files]     # Various configuration files
```

## Tech Stack

This repo uses:

- React (with Vite)
- TypeScript
- TailwindCSS
- shadcn/ui (for UI components)

You are free to add any dependencies you'd like, but please document why you chose that approach.

---

## Requirements

### 1. Rich Markdown Rendering

- Parse and render markdown with support for:
  - Headings, bold, italic, underline
  - Lists, horizontal rules
  - Inline code / blocks
- Match the visual style shown in the design (clean, readable)

### 2. Function Badges

- Replace all `<% function UUID %>` placeholders with interactive badges
- Each badge must:
  - Display the function's description on hover (tooltip)
  - Be clickable → opens dropdown or popover
  - Allow choosing another function from the list
  - Support deletion with confirmation

### 3. Serialization

- Your system must convert the editor state back to markdown:
  - Preserve all regular markdown formatting
  - Replace function badges with their correct placeholder syntax: `<% function UUID %>`
- Ensure round-trip works:
  - Load → Edit → Serialize → Load again should preserve structure

#### (stretch) Slash Commands

- Typing `/` inside the editor opens a slash command menu
- The menu must:
  - Show a list of available functions (name + description)
  - Be keyboard accessible
  - Insert a function badge at cursor position when selected

## What to Submit

- A GitHub repo (public)
- Your solution with a working local dev setup
- A `SOLUTION.md` that includes:
  - Your editor stack choice and why
  - Trade-offs made
  - How to run the project locally
  - What's working and what's not (why?)
  - Anything you'd improve with more time

---

## Final Notes

This is not a test with a single correct solution.
We're looking to understand how you:

- Navigate ambiguity
- Data model
- Reason about trade-offs

We're excited to see what you come up with. Good luck!

— The Hatch Team
