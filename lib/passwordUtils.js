const bcrypt = require('bcrypt');
const saltRounds = 10;

const genPassword = async function genPassword(password){
    try{
        await bcrypt.hash(password, saltRounds, function(err,hashedPassword){
        return hashedPassword;
        })
    }
    catch (err){
        throw(err);
    }
};

const validPassword = async function(password,hashedPassword){
    try{
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    }
    catch(err){
        throw(err);
    }
};

module.exports = {
    genPassword,
    validPassword
};