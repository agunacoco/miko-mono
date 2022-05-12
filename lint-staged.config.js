module.exports = {
  'packages/**/*.{js,jsx,ts,tsx}': ['prettier  --loglevel warn --write', 'eslint  --cache --fix  --quiet --ignore-path ./.gitignore'],
  'packages/miko-streamer/**/*.{ts,tsx}': [() => 'tsc -p ./packages/miko-streamer/tsconfig.json --noEmit'],
  'packages/miko-viewer/**/*.{ts,tsx}': [() => 'tsc -p ./packages/miko-viewer/tsconfig.json --noEmit'],
};
