import { defineConfig } from 'tsup';

const tsupConfig = defineConfig({
	entry: ['./src/index.ts'],
	outDir: './dist',
	format: ['cjs'],
	clean: true,
	dts: true,
	tsconfig: './tsconfig.json',
});

// eslint-disable-next-line
export default tsupConfig;