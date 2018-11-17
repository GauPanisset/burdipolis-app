const Express = require('express');
const router = Express.Router();

const Verif = require('../verifyToken.js');

const jwt = require('jsonwebtoken');
const Bcrypt = require('bcrypt');
const DB = require('../db.js');
const Passport 	= require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

Passport.use(new BasicStrategy((username,password,done)=>{
    console.log(username + " === " + password);
    DB.query('SELECT * FROM USERS WHERE USERNAME=?',[username],(err,user)=>{
        console.log(user);
        if(err){//bad request
            console.log("Error here");
            return done(err);
        }
        if(!user){//username not found
            return done(null,false,{message: "wrong username"});
        }
        user = user[0];
        if(Bcrypt.compareSync(password, user.PASSWORD)){
            let token = jwt.sign({ id: user.USERNAME }, Verif.secret, {
                expiresIn: 86400 //expires in 24 hours
            });
            const json = {
                token: token,
                auth: true
            };
            return done(null,json);
        }
        return done(null,false,{message: "wrong password"});
    });

}));

router.get('/login', Passport.authenticate('basic',{session:false}), (req, res) => {
    const json = JSON.stringify(req.user);
    res.end(json);
});

router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});

module.exports.router = router;
