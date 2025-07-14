import chalk from 'chalk'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
const { green } = chalk

const connectionString = process.env.DATABASE_URL || ""
  const dClient = postgres(connectionString, { prepare: false })
  const db = drizzle(dClient)

  await dClient`SELECT 1`

  console.log('🗃️ ' + green(` | Connected to the database successfully.`))
export default db