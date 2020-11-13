require('dotenv').config();
var mysql = require('mysql');
/// <summary>Connection arguments</summary>

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    db: process.env.DB_DATABASE
});

/// <summary>Establishing connection</summary>

samp.on(EVENT_GAME_MODE_INIT, con.connect((err) => {
    if(err) {
        console.error(err.message);
        samp.callNative('SendRconCommand', 's', 'exit');
        return 1;
    }
    console.log('Yes, connection succes ');
    return 1;

}))

/// <summary>Destroying connection</summary>

samp.on(EVENT_GAME_MODE_EXIT, (() => {
    con.destroy();
    console.info('Connection destroyed');
    return 1;
}));
