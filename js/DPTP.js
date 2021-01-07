/* DPTP_Dj */
/*
    writes the typed word and it's typing pattern into database
*/
function DPTP(language, word, pattern)
{
    var patternJson = JSON.stringify([language, word, pattern, document.learning_id2]);
    var str = patternJson;
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
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
        xmlhttp.withCredentials = true;
        xmlhttp.send(`q=${str}`);
    }
}
