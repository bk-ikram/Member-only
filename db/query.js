const { pool } = require('./setup/connections.js');

const insertUserSQL = `
INSERT INTO users (username, firstname, lastname, hash )
VALUES ($1,$2,$3,$4);
`;

const insertMessageSQL = `
INSERT INTO messages (userid, title, message, created )
VALUES ($1,$2, $3, CURRENT_TIMESTAMP);
`;

const getAllMessageDetailsSQL = `
SELECT u.userId
        ,username
        ,u.firstname
        ,u.lastname
        ,m.messageid
        ,m.title
        ,m.message
        ,m.created
FROM messages m
left join users u
on m.userid = u.userid
`;

async function insertUser(username, firstname, lastname, hash){
    await pool.query(insertUserSQL,[username, firstname, lastname, hash]);
 }

 async function insertMessage(userid, title, message ){
    await pool.query(insertMessageSQL,[userid, title, message]);
 }

  async function getAllMessageDetails(){
    const { rows } = await pool.query(getAllMessageDetailsSQL);
    return rows;
 }

module.exports= {
    insertUser,
    insertMessage,
    getAllMessageDetails
}