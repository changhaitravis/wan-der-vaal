# wan-der-vaal
An Information Systems and Resources launcher desktop app powered by Electron and React.

## Stack

React 19 + Vite 6 + Electron (modern port of the original 2016 AngularJS/bower/grunt
scaffold — the legacy `app/`, `Gruntfile.js`, `bower.json`, and `test/` files are kept
for reference but are no longer used by the build).

## Build & development

```bash
npm install        # install dependencies
npm run dev        # start Vite dev server + Electron with live reload
npm run build      # production build into dist/
npx electron .     # run the production build (equivalent to the old `cd dist && electron .`)
```

On a headless machine (or when running as root), Electron needs a virtual display
and `--no-sandbox`:

```bash
xvfb-run -a npx electron --no-sandbox .
```

## Testing

```bash
npm test           # vitest unit tests (icon mapping + data.json integrity)
```

The old karma/jasmine/PhantomJS suite cannot run on modern Node and is retired.

## Layout

- `electron/main.js` — Electron main process (window, external-link handling)
- `electron/preload.js` — secure preload bridge (`window.electronAPI.openExternal`)
- `src/` — React renderer (`App.jsx`, `icons.js`, `styles.css`, `data.json`)
- `public/images/` — bundled system icons
- `dist/` — production build output (git-ignored)

The launcher data lives in `src/data.json` (verbatim copy of the original
`app/data.json`); edit it and rebuild to update the launcher.
