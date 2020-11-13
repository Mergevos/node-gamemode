let accountName = new Array();
const DIALOG_STYLE_PASSWORD = 3;
const DIALOG_REGISTER = 0;

/// <summary> OnPlayerRequestClass</summary>

samp.on(EVENT_PLAYER_REQUEST_CLASS, (playerid, classid) => {
    let name = samp.callNative('GetPlayerName', 'iSi', playerid, 24);
    accountName[playerid] = name;
    samp.callNative('ShowPlayerDialog', 'iiissss', playerid, DIALOG_REGISTER, DIALOG_STYLE_PASSWORD, 'Registration', 'Input your password in order to continue', 'Okay', 'Exit');
    samp.callNative('TogglePlayerSpectating', 'ii', playerid, true);
});

/// <summary> OnPlayerDialogResponse</summary>

samp.on(EVENT_DIALOG_RESPONSE, (playerid, dialogid, response, listitem, inputtext = []) => {
    if(dialogid === DIALOG_REGISTER) {
        if(response) {
            if(inputtext.length < 6) {
                samp.callNative('ShowPlayerDialog', 'iiissss', playerid, DIALOG_REGISTER, DIALOG_STYLE_PASSWORD, 'Registration', 'Your password length must be above 6 characters', 'Okay', 'Exit');
            } else {
                samp.callNative('SendClientMessage', 'iis', -1, 'Welcome to the server, your password is: '+inputtext+"");
                samp.callNative('TogglePlayerSpectating', 'ii', playerid, false);
                samp.callNative('SetSpawnInfo', 'iiiffffiiiiii', playerid, 255, 35, 0.0, 0.0, 0.0, 0.0, 0, 0, 0, 0, 0, 0); 
                samp.callNative('SpawnPlayer', 'i', playerid);
            }
        } else {
            samp.callNative('SendClientMessage', 'iis', playerid, -1, 'You have been kicked from the server');
            setTimeout(function(playerid) {
                samp.callNative('Kick', 'i', playerid);
            }, 300);
        }

        return 1;
    }
    return 0;
});