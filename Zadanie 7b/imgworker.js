onmessage = function (e) {
    var temp = JSON.parse(e.data)
    suma_wszystkich_liter = 0
    suma_wszystkich_liter = countletters(temp["name"])
    suma_wszystkich_liter = countletters(temp["surname"])
    suma_wszystkich_liter = countletters(temp["age"])
    suma_wszystkich_liter = countletters(temp["kodpocztowy"])
    suma_wszystkich_liter = countletters(temp["dowod"])
    suma_wszystkich_liter = countletters(temp["phone"])
    suma_wszystkich_liter = countletters(temp["email"])
    suma_wszystkich_liter = countletters(temp["adres"])
    suma_wszystkich_liter = countletters(temp["imgurl"])

    let R = suma_wszystkich_liter % 255
    let G = 255 - (suma_wszystkich_liter % 255)
    let B = (0.5 * R > 125) ? 99 : 199
    console.log(R)
    console.log(G)
    console.log(B)
    self.postMessage(JSON.stringify(temp))
};


function countletters(str) {
    var result = 0;
    for (i = 0; i < str.length; i++) {
        if (isLetter(str[i])) {
            if (str[i] == str[i].toLowerCase()) {
                result += str.charCodeAt(i) - 96;
            } else {
                var test = str[i].toLowerCase()
                result +=  test.charCodeAt(0) - 66;
            }
        }
    }
    return result;
}

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}