const { pool } = require('./setup/connections.js');

const insertUserSQL = `
INSERT INTO users (username, firstname, lastname, hash )
VALUES ($1,$2,$3,$4);
`;

async function insertUser(username, firstname, lastname, hash){
    await pool.query(insertUserSQL,[username, firstname, lastname, hash]);
 }

module.exports= {
    insertUser
}