onmessage = function (e) {
    var temp = JSON.parse(e.data)
    for (var i = 0; i < temp.length; i++) {
        temp[i]["name"]=swapcase(temp[i]["name"])
        temp[i]["surname"]=swapcase(temp[i]["surname"])
        temp[i]["email"]=swapcase(temp[i]["email"])
        temp[i]["adres"]=swapcase(temp[i]["adres"])
        temp[i]["dowod"]=swapcase(temp[i]["dowod"])
    }
    self.postMessage(JSON.stringify(temp))
};


function swapcase(str) {
    var newWord =[];
    for (i = 0; i < str.length; i++) {
        if (str[i] == str[i].toLowerCase()) {
            newWord[i] = str[i].toUpperCase();
        } else {
            newWord[i] = str[i].toLowerCase();
        }
    }
    return newWord.join("");
}

