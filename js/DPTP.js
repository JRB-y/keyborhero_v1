"use strict";
/* DPTP_Dj */
/*
    writes the typed word and it's typing pattern into database
*/
async function updateOnlineStatus()
{
    if (navigator.onLine)
    {
        var stored = localStorage.getItem('DPTP_offline_storage');
        if (stored)
        {
            stored = JSON.parse(stored);
            while (stored.length > 0 && navigator.onLine)
            {
                let res = await sendJSON(stored.shift());
                if (res === false)
                {
                    stored.unshift(res);
                    setTimeout(() =>
                    {
                        updateOnlineStatus();
                    }, 2000);
                    break;
                }
            }
            localStorage.setItem('DPTP_offline_storage', JSON.stringify(stored));
        }
    }
}

window.addEventListener('online',  updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

function DPTP(language, word, pattern)
{
    var patternJson = JSON.stringify([language, word, pattern, document.learning_id2]);
    if (navigator.onLine)
        sendJSON(patternJson);
    else
        storeJSON(patternJson);
}
function storeJSON(str)
{
    var stored = localStorage.getItem('DPTP_offline_storage');
    if (stored)
    {
        stored = JSON.parse(stored);
        stored.push(str);
    }
    else
        stored = [str];
    localStorage.setItem('DPTP_offline_storage', JSON.stringify(stored));
}
function sendJSON(str)
{
    return new Promise((resolve, reject) =>
    {
        var xmlhttp;
        if (str == "")
            return;
        else
        {
            if (window.XMLHttpRequest)
                xmlhttp = new XMLHttpRequest();
            else
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            xmlhttp.open("POST", "https://djamchid.sites.3wa.io/TypePark/TypingHero/DPTP.php", true);
            xmlhttp.onreadystatechange = function()
            {
                if (xmlhttp.readyState === 4)
                {
                    if (xmlhttp.status === 200)
                        resolve(true);
                    else
                        resolve(false);
                }
            };
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
            xmlhttp.withCredentials = true;
            xmlhttp.send(`q=${str}`);
        }
    });
}