# Remix SPA + MUI Build error

This template leverages [Remix SPA Mode](https://remix.run/docs/en/main/guides/spa-mode) to build your app as a Single-Page Application using [Client Data](https://remix.run/docs/en/main/guides/client-data) for all of your data loads and mutations.

To reproduce the bug run:
1. `npm install`
2. `npm run build`

You should see the following error:

```
app/root.tsx (10:7): "default" is not exported by "node_modules/@mui/material/locale/index.js", imported by "app/root.tsx".
file: /Users/nicopm/WebstormProjects/remix_spa_mui_repro/app/root.tsx:10:7

 8: import "./tailwind.css";
 9: import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
10: import pkg from '@mui/material/locale/index.js';
           ^
11: const { esES } = pkg;

...
```

Tried using vite-plugin-cjs-interop, noExternal, and serverModuleFormat: 'cjs' in vite.config.ts without success.

Funny enough, setting ssr: false in vite.config.ts makes the build work (of course, this doesn't make any sense because this is an SPA app).
