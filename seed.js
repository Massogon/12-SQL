const fs = require('fs')
const { Pool } = require('pg')

require("dotenv").config()
const databaseUrl = process.env.DATABASE_URL || 'postgresql://localhost:5432/employees_db';
const pool = new Pool({
    connectionString: databaseUrl,
})

if (process.env.NODE_ENV !== 'production') {
    const seedQuery = fs.readFileSync('seeds.sql', { encoding: 'utf8' })
    pool.query(seedQuery, (err, res) => {
        console.log(err, res)
        console.log('Seeding Completed!')
        pool.end()
    })
}