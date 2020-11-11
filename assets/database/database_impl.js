const mysql = require('mysql');

/// <summary>Connection arguments</summary>

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    db: "open-movie-database"
});

/// <summary>Establishing connection</summary>

samp.on(EVENT_GAME_MODE_INIT, con.connect((err) => {
    if(err) {
        return console.error(err.message);
    };
    console.log("Yes, connection succes");
    return 1;

}))

/// <summary>Destroying connection</summary>

samp.on(EVENT_GAME_MODE_EXIT, () => {
    con.destroy();
    console.log("Connection destroyed");
    return 1;
});
