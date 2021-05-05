onmessage = function (e) {

    JSON.parse(e.data).forEach(element => {
        console.log(swapcase(element["name"]))
        console.log(swapcase(element["surname"]))
        console.log(swapcase(element["adres"]))
        console.log(swapcase(element["email"]))
    });
    // console.log(JSON.parse(e.data));
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