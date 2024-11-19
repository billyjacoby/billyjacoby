#!/usr/bin/env node

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun';

interface PackageJson {
	packageManager?: string;
	[key: string]: unknown;
}
class PackageManagerUpdater {
	private readonly lockFiles: Record<string, PackageManager> = {
		'pnpm-lock.yaml': 'pnpm',
		'yarn.lock': 'yarn',
		'package-lock.json': 'npm',
		'bun.lockb': 'bun',
	};

	private detectPackageManager(): string {
		// Check for lock files
		for (const [lockFile, manager] of Object.entries(this.lockFiles)) {
			if (fs.existsSync(path.join(process.cwd(), lockFile))) {
				return this.getPackageManagerVersion(manager);
			}
		}

		// Fallback to checking binary presence
		const managers: PackageManager[] = ['pnpm', 'yarn', 'bun', 'npm'];
		for (const manager of managers) {
			try {
				return this.getPackageManagerVersion(manager);
			} catch {}
		}

		// Default to npm
		return this.getPackageManagerVersion('npm');
	}

	private getPackageManagerVersion(manager: PackageManager): string {
		try {
			const version = execSync(`${manager} --version`).toString().trim();
			return `${manager}@${version}`;
		} catch (error) {
			console.error(`Error getting ${manager} version:`, error);
			return `${manager}@unknown`;
		}
	}

	private readPackageJson(): PackageJson {
		const packageJsonPath = path.join(process.cwd(), 'package.json');

		try {
			return JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
		} catch (error) {
			console.error('Error reading package.json:', error);
			process.exit(1);
		}
	}

	private writePackageJson(packageJson: PackageJson): void {
		const packageJsonPath = path.join(process.cwd(), 'package.json');

		try {
			fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
			console.log(`Updated packageManager to: ${packageJson.packageManager}`);
		} catch (error) {
			console.error('Error writing package.json:', error);
			process.exit(1);
		}
	}

	public updatePackageManagerField(): void {
		const packageJson = this.readPackageJson();
		const detectedPackageManager = this.detectPackageManager();

		packageJson.packageManager = detectedPackageManager;

		this.writePackageJson(packageJson);
	}
}

// Run the update
const updater = new PackageManagerUpdater();
updater.updatePackageManagerField();
