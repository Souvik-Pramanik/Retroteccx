import Knex from "knex";

const db = Knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
    // connection: {
    //     host: '127.0.0.1',
    //     user: 'postgres',
    //     password: "3496",
    //     database: 'dbs'
    // }
});

export default db;