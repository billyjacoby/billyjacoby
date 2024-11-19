# Pack-Man

# @billyjacoby/pack-man

A lightweight utility that automatically updates your project's `packageManager` field in `package.json` to match the package manager you're currently using.

## Why?

- Ensures consistency between your actual package manager and what's declared in `package.json`
- Helps prevent accidental usage of wrong package managers in your project
- Useful for teams to maintain consistent package manager usage
- Zero dependencies

## Usage

Run via npx in your project directory:

```bash
npx @billyjacoby/pack-man
```

The tool will:
1. Detect which package manager you're using (npm, yarn, or pnpm) based on the lock file (todo: detect what command you're running with - pnpm dlx, yarn dlx, npx, etc.)
2. Update the `packageManager` field in your `package.json` accordingly
3. Use the correct version of the detected package manager

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

