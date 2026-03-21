const passport = require('passport');
const LocalStrategy = require('passport-local');
const { validPassword } = require('../lib/passwordUtils');

async function verifyCallback(username, password, done) {
  try {
    const { rows } = await db.get('SELECT * FROM users WHERE username = ?', [ username ]);
    const user = rows[0];
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' }); 
    }
    const match = await validPassword(password, user.hash);
    if(!match){
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  } catch(err) {
    return done(err);
  }
  
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
  }
  catch(err){
    done(err);
  }
});