const connection = require('./../database/database_impl');
const accountPassword = [];
const accountEmail = [];
const attempts = [];

const { DIALOG_STYLE } = require('samp-node-lib');
 
const DIALOG_REGISTER = 0;
const DIALOG_LOGIN = 1;
const DIALOG_EMAIL = 2;

samp.on(EVENT_PLAYER_REQUEST_CLASS, (playerid, classid) => {
    let name = samp.callNative('GetPlayerName', 'iSi', playerid, 24);
    connection.query('SELECT * FROM `accounts` WHERE account_name = ?', [name], function (err, result, fields) {
        if(err) throw err;
        if(result.length) {
            attempts[playerid] = 0;
            accountPassword[playerid] = result[0].account_password;
            samp.callNative('ShowPlayerDialog', 'iiissss', playerid, DIALOG_LOGIN, DIALOG_STYLE.PASSWORD, 'Login', 'Your password length must be above 6 characters', 'Okay', 'Exit');
        } else {
            samp.callNative('ShowPlayerDialog', 'iiissss', playerid, DIALOG_REGISTER, DIALOG_STYLE.PASSWORD, 'Registration', 'Input your password in order to continue', 'Okay', 'Exit');
        }
    })
    samp.callNative('TogglePlayerSpectating', 'ii', playerid, true);
    return 1;
    
});

//-----------------------------------
samp.on(EVENT_DIALOG_RESPONSE, (playerid, dialogid, response, listitem, inputtext = []) => {
    if(dialogid === DIALOG_REGISTER) {
        if(response) {
            if(inputtext.length < 6) {
                samp.callNative('ShowPlayerDialog', 'iiissss', playerid, DIALOG_REGISTER, DIALOG_STYLE.PASSWORD, 'Registration', 'Your password length must be above 6 characters', 'Okay', 'Exit');
            } else {
                accountPassword[playerid] = inputtext;
                samp.callNative('ShowPlayerDialog', 'iiissss', playerid, DIALOG_EMAIL, DIALOG_STYLE.INPUT, 'Email', 'Input your email please.', 'Okay', 'Exit');
            }
        } else {
            samp.callNative('SendClientMessage', 'iis', playerid, -1, 'You have been kicked from the server');
            setTimeout(function(playerid) {
                samp.callNative('Kick', 'i', playerid);
            }, 300);
        }

        return 1;
    } else if(dialogid === DIALOG_LOGIN) {
        
        if(response) {
            if(!(accountPassword[playerid] == inputtext)) {
                attempts[playerid] ++;
                console.log(attempts[playerid]);
                if(attempts[playerid] === 3) { 
                    samp.callNative('Kick', 'i', playerid);
                }
                samp.callNative('ShowPlayerDialog', 'iiissss', playerid, DIALOG_LOGIN, DIALOG_STYLE.PASSWORD, 'Login', 'Your password length must be above 6 characters', 'Okay', 'Exit');
                
                
            } else {
                samp.callNative('SendClientMessage', 'iis', -1, 'Welcome to the server, your password is: '+inputtext+"");
                samp.callNative('TogglePlayerSpectating', 'ii', playerid, false);
                samp.callNative('SetSpawnInfo', 'iiiffffiiiiii', playerid, 255, 35, 0.0, 0.0, 0.0, 0.0, 0, 0, 0, 0, 0, 0); 
                samp.callNative('SpawnPlayer', 'i', playerid);
            }
        }
        return 1;
    } else if(dialogid === DIALOG_EMAIL) {
        if(response) {
            if(!isEmailAddress(inputtext)) {
                samp.callNative('ShowPlayerDialog', 'iiissss', playerid, DIALOG_EMAIL, DIALOG_STYLE.INPUT, 'Email', 'Input your email please.', 'Okay', 'Exit');
            } else {
                accountEmail[playerid] = inputtext;
                connection.query('INSERT INTO `accounts` (`account_name`, `account_password`, `account_email`) VALUES (?, ?, ?)', [samp.callNative('GetPlayerName', 'iSi', playerid, 24), accountPassword[playerid], accountEmail[playerid]], function (err, result) {
                    if(err) throw err;
                    samp.callNative('SendClientMessage', 'iis', -1, 'Welcome to the server, your password is: '+inputtext+"");
                    samp.callNative('TogglePlayerSpectating', 'ii', playerid, false);
                    samp.callNative('SetSpawnInfo', 'iiiffffiiiiii', playerid, 255, 35, 0.0, 0.0, 0.0, 0.0, 0, 0, 0, 0, 0, 0); 
                    samp.callNative('SpawnPlayer', 'i', playerid);
                })
            } 
        }
    }
    return 0;
});

function isEmailAddress(str) {
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(str);  // returns a boolean 
 }