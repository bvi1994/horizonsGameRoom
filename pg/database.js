const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.HEROKU_POSTGRESQL_AMBER_URL,
    ssl: true,
});

client.connect();

client.query(`CREATE TABLE users(
  id integer PRIMARY KEY,
  username varchar(40),
  password varchar(40)
);`, (err, res) => {
    if (err) throw err;
    client.end();
});

// client.query('', (err, res) => {
//     if (err) throw err;
//
//     client.end();
// });
// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//     if (err) throw err;
//     for (let row of res.rows) {
//         console.log(JSON.stringify(row));
//     }
//     client.end();
// });
