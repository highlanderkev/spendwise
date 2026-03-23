---
description: Start the SpendWise preview server
---

# Preview Project Workflow

This workflow starts the Next.js development server to preview the application locally.

1. Ensure you are in the project root directory.
2. Form the command to start the Next.js development server. It will automatically find an open port (usually 3000, or 9002 if 3000 is occupied).
```bash
npm run dev
```

> [!NOTE]
> The server will output the local URL (e.g., `http://localhost:3000`). You can use the `read_url_content` tool or a browser subagent to verify the rendering.
