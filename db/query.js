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

const deleteMessageSQL = `
DELETE FROM messages
WHERE messageid = $1;
`

const verifyMessageAuthorSQL = `
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
where m.messageid = $1
AND u.userid = $2;
`

const grantMembershipSQL = `
UPDATE users 
SET ismember = true
WHERE userid = $1;
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

async function deleteMessage(messageid){
   await pool.query(deleteMessageSQL,[messageid]);
}

async function verifyMessageAuthor(messageid, userid){
   const data = await pool.query(verifyMessageAuthorSQL, [messageid,userid]);
   return data.rows.length > 0;
}

//grantMembershipSQL
async function grantMembership(userid){
   await pool.query(grantMembershipSQL, [userid]);
}

module.exports= {
    insertUser,
    insertMessage,
    getAllMessageDetails,
    deleteMessage,
    verifyMessageAuthor,
    grantMembership
}