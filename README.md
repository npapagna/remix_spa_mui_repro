# Remix SPA + MUI Build error

This template leverages [Remix SPA Mode](https://remix.run/docs/en/main/guides/spa-mode) to build your app as a
Single-Page Application using [Client Data](https://remix.run/docs/en/main/guides/client-data) for all of your data
loads and mutations.

To reproduce the bug run:
1. `npm install`
2. `npm run build`

You should see the following error:

```
vite v5.3.1 building for production...
transforming (9) node_modules/@remix-run/react/dist/esm/server.js
warn - No utility classes were detected in your source files. If this is unexpected, double-check the `content` option in your Tailwind CSS configuration.
warn - https://tailwindcss.com/docs/content-configuration
✓ 1150 modules transformed.
build/client/.vite/manifest.json                1.35 kB │ gzip:  0.35 kB
build/client/assets/root-BMTRAcdn.css           4.73 kB │ gzip:  1.39 kB
build/client/assets/_index-Dke1C9x1.js          1.29 kB │ gzip:  0.69 kB
build/client/assets/jsx-runtime-BG3Xf6ew.js     8.56 kB │ gzip:  3.17 kB
build/client/assets/entry.client-85w0dC1l.js   11.63 kB │ gzip:  4.09 kB
build/client/assets/root-ZSaFmcbW.js           21.45 kB │ gzip:  8.69 kB
build/client/assets/createTheme-LlYCATvD.js    24.82 kB │ gzip:  9.19 kB
build/client/assets/components-qaatCR4t.js    224.07 kB │ gzip: 72.46 kB
✓ built in 4.35s
vite v5.3.1 building SSR bundle for production...
✓ 7 modules transformed.
build/server/.vite/manifest.json               0.22 kB
build/server/assets/server-build-BMTRAcdn.css  4.73 kB
build/server/index.js                          4.54 kB
x Build failed in 177ms
[remix] Named export 'esES' not found. The requested module '@mui/material/locale/index.js' is a CommonJS module, which may not support all module.exports as named exports.
CommonJS modules can always be imported via the default export, for example using:

import pkg from '@mui/material/locale/index.js';
const { esES } = pkg;

file:///Users/nicopm/WebstormProjects/remix_spa_mui_repro/build/server/index.js:5
import { esES } from "@mui/material/locale/index.js";
         ^^^^
SyntaxError: Named export 'esES' not found. The requested module '@mui/material/locale/index.js' is a CommonJS module, which may not support all module.exports as named exports.
CommonJS modules can always be imported via the default export, for example using:

import pkg from '@mui/material/locale/index.js';
const { esES } = pkg;

    at ModuleJob._instantiate (node:internal/modules/esm/module_job:132:21)
    at async ModuleJob.run (node:internal/modules/esm/module_job:214:5)
    at async ModuleLoader.import (node:internal/modules/esm/loader:329:24)
    at async importModuleDynamicallyWrapper (node:internal/vm/module:431:15)
    at async handleSpaMode (/Users/nicopm/WebstormProjects/remix_spa_mui_repro/node_modules/@remix-run/dev/dist/vite/plugin.js:1181:15)
    at async Object.handler (/Users/nicopm/WebstormProjects/remix_spa_mui_repro/node_modules/@remix-run/dev/dist/vite/plugin.js:893:11)
    at async Promise.all (index 0)
    at async PluginDriver.hookParallel (file:///Users/nicopm/WebstormProjects/remix_spa_mui_repro/node_modules/rollup/dist/es/shared/node-entry.js:19702:9)
    at async file:///Users/nicopm/WebstormProjects/remix_spa_mui_repro/node_modules/rollup/dist/es/shared/node-entry.js:20699:13
    at async catchUnfinishedHookActions (file:///Users/nicopm/WebstormProjects/remix_spa_mui_repro/node_modules/rollup/dist/es/shared/node-entry.js:20119:16) {
  code: 'PLUGIN_ERROR',
  plugin: 'remix',
  hook: 'writeBundle'
```

Notice that the recommended solution in the error message does not work because `@mui/material/locale/index.j` does
not provide a default export.

I inspected `build/server/index.js` and noticed that the file contains client code. In particular, it contains
the `Foo` component that ends up importing Material UI.
I noticed also that material is imported at the top level:

```javascript
...

const theme = createTheme(esES);
function Foo() {
  console.log(theme);
  return /* @__PURE__ */ jsx("div", { children: "Nothing to see here..." });
}
const meta = () => {
  return [
    { title: "New Remix SPA" },
    { name: "description", content: "Welcome to Remix (SPA Mode)!" }
  ];
};

...
```

AFAIK the server is used only to render the `HydrateCallback` component provided in `root.tsx`, so component
and other routes should not be used to generate the `index.html` file.
