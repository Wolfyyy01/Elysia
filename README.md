<div align="center">

# 🌟 Elysia Discord Bot 🌟

<img src="https://img.shields.io/badge/discord.js-v14.21.0-blue.svg?logo=discord" alt="discord.js version">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/Bun-F9F1E1?style=flat&logo=bun&logoColor=black" alt="Bun">
<img src="https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white" alt="Redis">
<img src="https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white" alt="PostgreSQL">

A powerful, modern Discord bot built with TypeScript, Discord.js, and CommandKit.

</div>

## ✨ Features

- 🚀 Built with TypeScript for type safety and better developer experience
- 🧩 Modular command structure using CommandKit
- 🗃️ PostgreSQL database integration with Drizzle ORM
- 🔄 Redis for caching and temporary data storage
- ⚡ Fast development with Bun runtime
- 🔒 Environment variable management for secure configuration

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v16.9.0 or higher)
- [Bun](https://bun.sh/) for package management and running the bot
- [Redis](https://redis.io/) server for caching
- [PostgreSQL](https://www.postgresql.org/) database

## 🚀 Getting Started

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/elysia.git
   cd elysia
   ```

2. Install dependencies
   ```bash
   bun install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   TOKEN=your_discord_bot_token
   DATABASE_URL=your_postgresql_connection_string
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=your_redis_password
   ```

### Development

Run the bot in development mode with hot reloading:
```bash
bun dev
```

### Building for Production

Build the TypeScript code to JavaScript:
```bash
bun run build
```

Start the bot in production mode:
```bash
bun start
```

## 📁 Project Structure

```
├── src/
│   ├── commands/       # Bot commands
│   ├── database/       # Database connections and models
│   ├── events/         # Discord.js event handlers
│   ├── utils/          # Utility functions
│   ├── validations/    # Command validation
│   └── index.ts        # Entry point
├── .env                # Environment variables
├── commandkit.config.js # CommandKit configuration
├── package.json        # Project dependencies
└── tsconfig.json      # TypeScript configuration
```

## 🔧 Creating Commands

Create a new command by adding a file to the `src/commands` directory:

```typescript
import type { SlashCommandProps, CommandOptions } from 'commandkit';
import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('command-name')
  .setDescription('Command description');

export const run = ({ interaction, client, handler }: SlashCommandProps) => {
  // Command logic here
  interaction.reply('Command response');
}

export const options: CommandOptions = {
  devOnly: false,
  userPermissions: [],
  botPermissions: [],
  deleted: false,
}
```

## 📚 Database Usage

### Redis

```typescript
import redis from '../database/redis';

// Set a value
await redis.set('key', 'value');

// Get a value
const value = await redis.get('key');
```

### PostgreSQL with Drizzle

```typescript
import db from '../database/drizzleClient';

// Query example
const results = await db.query.yourTable.findMany();
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Discord.js](https://discord.js.org/) - The powerful JavaScript library for interacting with the Discord API
- [CommandKit](https://commandkit.js.org/) - A powerful framework for Discord.js commands
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM for SQL databases
- [ioredis](https://github.com/luin/ioredis) - A robust, performance-focused Redis client for Node.js