require('dotenv').config();
const mariadb = require('mariadb/callback');
/// <summary>connection configuration</summary>

/// <summary>Connection arguments</summary>

const connection = mariadb.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});
module.exports = connection;

/// <summary>Establishing connection</summary>

samp.on(EVENT_GAME_MODE_INIT, async () => {
    connection.connect(err => {
        if (err) {
            console.error('Failed to connect database', err);
        } else {
            console.log('Success to connect database');
        }
    
    })
    return 1;
})

/// <summary>Destroying connection</summary>

samp.on(EVENT_GAME_MODE_EXIT, async () => {
    connection.end(err => {
        if (err) {
            console.error('Failed to end database', err);
        } else {
            console.log('Success to end database');
        }
    })
    return 1;
})

