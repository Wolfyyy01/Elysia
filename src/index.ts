import { CommandKit } from 'commandkit'
import {Client, IntentsBitField} from 'discord.js'
import config from './utils/config'

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
    ]
})

new CommandKit({
    client,
    commandsPath: `${__dirname}/commands`,
    eventsPath: `${__dirname}/events`,
    validationsPath: `${__dirname}/validations`,
    bulkRegister: true,
    devGuildIds: config.devGuildIds,
    devUserIds: config.devUserIds,
})


client.login(process.env.TOKEN)