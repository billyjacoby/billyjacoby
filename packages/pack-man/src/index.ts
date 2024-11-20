#!/usr/bin/env node
/* eslint-disable no-console */

import { execSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

type PackageManager = "bun" | "npm" | "pnpm" | "yarn";

const packageManagers: string[] = ["pnpm", "yarn", "bun", "npm"];

interface PackageJson {
  [key: string]: unknown;
  packageManager?: string;
}

const LOCK_FILES: Record<string, PackageManager> = {
  "bun.lockb": "bun",
  "package-lock.json": "npm",
  "pnpm-lock.yaml": "pnpm",
  "yarn.lock": "yarn",
};

function getPackageManagerVersion(manager: PackageManager): string {
  try {
    const version = execSync(`${manager} --version`).toString().trim();
    const buffer = Buffer.from(
      execSync(`npm show ${manager}@${version} dist.shasum`),
    )
      .toString()
      .trim();
    const hash = createHash("sha512").update(buffer).digest("hex");

    console.log("🪵 | getPackageManagerVersion | hash:", hash);
    return `${manager}@${version}+sha512.${hash}`;
  } catch (error) {
    console.error(`Error getting ${manager} version:`, error);
    return `${manager}@unknown`;
  }
}

function detectPackageManager(): string {
  // Check for lock files
  const npm_config_user_agent =
    process.env.npm_config_user_agent?.split("/")[0];

  if (
    npm_config_user_agent &&
    packageManagers.includes(npm_config_user_agent)
  ) {
    return getPackageManagerVersion(npm_config_user_agent as PackageManager);
  }

  for (const [lockFile, manager] of Object.entries(LOCK_FILES)) {
    if (fs.existsSync(path.join(process.cwd(), lockFile))) {
      return getPackageManagerVersion(manager);
    }
  }

  // Fallback to checking binary presence
  const managers: PackageManager[] = ["pnpm", "yarn", "bun", "npm"];
  for (const manager of managers) {
    return getPackageManagerVersion(manager);
  }

  // Default to npm
  return getPackageManagerVersion("npm");
}

function readPackageJson(): PackageJson {
  const packageJsonPath = path.join(process.cwd(), "package.json");

  try {
    return JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  } catch (error) {
    console.error("Error reading package.json:", error);
    process.exit(1);
  }
}

function writePackageJson(packageJson: PackageJson): void {
  const packageJsonPath = path.join(process.cwd(), "package.json");

  try {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log(`Updated packageManager to: ${packageJson.packageManager}`);
  } catch (error) {
    console.error("Error writing package.json:", error);
    process.exit(1);
  }
}

function updatePackageManagerField(): void {
  const packageJson = readPackageJson();
  const detectedPackageManager = detectPackageManager();

  packageJson.packageManager = detectedPackageManager;

  writePackageJson(packageJson);
}

// Run the update
updatePackageManagerField();
