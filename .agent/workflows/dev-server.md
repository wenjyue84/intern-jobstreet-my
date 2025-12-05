---
description: Development server configuration and port settings
---

# Development Server Configuration

## Port Configuration

> [!CAUTION]
> **DO NOT USE PORT 3000** - It is already in use by another application.

**Always use `localhost:5000`** when running this application.

## Running the Development Server

// turbo
1. Start the dev server on port 5000:
```bash
npm run dev -- -p 5000
```

Or if using `next dev` directly:
```bash
npx next dev -p 5000
```

## Important Notes

- The user has another application running on `localhost:3000`
- All browser testing and verification should use `http://localhost:5000`
- When starting the dev server, always specify port 5000
