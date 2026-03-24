#!/usr/bin/env node
process.removeAllListeners('warning');
import { fileURLToPath } from 'url';
import { dirname, resolve, join } from 'path';
import { config as dotenvConfig } from 'dotenv';

// Resolve .env relative to this file's location (works regardless of cwd)
const pkgRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
dotenvConfig({ path: join(pkgRoot, '.env') });

import pc from 'picocolors';
import { hasTelegramConfig } from './services/configStore.js';
import { startTelegramBot } from './telegram/telegramBot.js';

if (!hasTelegramConfig()) {
  console.log(pc.yellow('No Telegram bot configuration found.'));
  console.log(`Run ${pc.cyan('remote-opencode telegram setup')} first to configure your Telegram bot.\n`);
  process.exit(1);
}

await startTelegramBot();
