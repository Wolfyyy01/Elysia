import type { Client } from 'discord.js';
import type { CommandKit } from 'commandkit';
import chalk from 'chalk';
const {green,magenta} = chalk;


export default function (c: Client<true>, client: Client<true>, handler: CommandKit) {
  console.log(green(`💜 | Logged in as `)+ magenta(`${c.user.tag}`))
};