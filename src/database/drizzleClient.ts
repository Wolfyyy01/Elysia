import chalk from 'chalk'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
const { green } = chalk

const connectionString = process.env.DATABASE_URL || ""
let db
try {
  const dClient = postgres(connectionString, { prepare: false })
   db = drizzle(dClient)

  await dClient`SELECT 1`

  console.log('🗃️ ' + green(` | Connected to the database successfully.`))

} catch (error) {
  console.error("❌ | Failed to connect to the database:")
  console.error(error)
  process.exit(1)
}
export default db