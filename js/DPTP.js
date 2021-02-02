"use strict";
/* DPTP_Dj */
/*
    writes the typed word and it's typing pattern into database
*/

if (navigator.onLine) {
  updateOnlineStatus()
}

async function updateOnlineStatus() {
  if (navigator.onLine) {
    let stored = JSON.parse(localStorage.getItem('DPTP_offline_storage'));

    if (stored && stored.length) {
      while (stored.length !== 0) {
        const shifted = stored.shift()
        const res = await sendJSON(JSON.stringify(shifted))

        if (res === false) {
          stored.unshift(res)
        }
      }
      localStorage.setItem('DPTP_offline_storage', JSON.stringify(stored));
    }

    let userTry = JSON.parse(localStorage.getItem('userTry'))
    if (userTry && userTry.length) {
      for (var k = 0; k < userTry.length; k++) {
        $.post('/keyboard-hero', { score: userTry[k]['score'], level: userTry[k]['level'], learning_id2: document.learning_id2 }, function (hof) {
          game.hof = hof;
          // $('#ttt-root').trigger('gameClear');
        });
        localStorage.removeItem('userTry');
      }
    }

  }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

function DPTP(language, word, pattern) {
  const patternJson = JSON.stringify([language, word, pattern, document.learning_id2])
  navigator.onLine ? sendJSON(patternJson) : storeJSON(patternJson)
}
function storeJSON(str) {
  let stored = JSON.parse(localStorage.getItem('DPTP_offline_storage'))
  if (!stored) stored = []
  stored.push(JSON.parse(str))
  localStorage.setItem('DPTP_offline_storage', JSON.stringify(stored));
}

function sendJSON(str) {
  return new Promise((resolve, reject) => {
    var xmlhttp;
    if (str == "")
      return;
    else {
      let xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")

      xmlhttp.open("POST", "https://djamchid.sites.3wa.io/TypePark/TypingHero/DPTP.php", true);
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
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