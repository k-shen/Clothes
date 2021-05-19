var key ='&APPID=1f6e1cfcec0147bb3d657685e0881a06';
var preurl="http://api.openweathermap.org/data/2.5/weather?q=";
var units = '&units=imperial';

var input = document.getElementById('city');
input.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById('myButton').click();
  }
});

var result;
var comfort = 78;
var condition;
var temp_high;
var temp_low;
var temp_feel;

class Clothes {
    constructor(name, temp, id) {
        this.name = name;
        this.temp = temp;
        this.id = id;
    }

    show() {
        var doc = document.createElement('label');
        var word = document.createTextNode('+ ' + this.name + ' ');
        doc.appendChild(word);
        document.getElementById(this.id).appendChild(doc);
        console.log(document.getElementById(this.id));
    }
}

var tops = [];
var bottoms = [];

tops.push(new Clothes('short T', 5, 'top'));
tops.push(new Clothes('long T', 8, 'top'));
tops.push(new Clothes('hoodie/sweatshirt', 18, 'top'));
tops.push(new Clothes('jacket', 25, 'top'));
tops.push(new Clothes('coat', 40, 'top'));

bottoms.push(new Clothes('shorts', 3, 'bottom'));
bottoms.push(new Clothes('light pants/light joggers', 5, 'bottom'));
bottoms.push(new Clothes('heavy pants/heavy joggers', 8, 'bottom'));

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function getWeather() {
    document.getElementById('resultWeather').style.display = 'none'
    document.getElementById('falseMessage').style.display = 'none'
    document.getElementById('gear').style.display = 'none'
    var topBlock = document.getElementById('top');
    while (topBlock.firstChild) {
        topBlock.removeChild(topBlock.firstChild)
    }

    var btmBlock = document.getElementById('bottom');
    while (btmBlock.firstChild) {
        btmBlock.removeChild(btmBlock.firstChild)
    }

    var url = preurl + document.getElementById('city').value + key + units;
    
    //fetch(url).then(res => res.json()).then(data => console.log(data))
    fetch(url) 
    .then(res => res.json())
    .catch(error => {
        if (error) {
            document.getElementById('falseMessage').style.display = 'block';
        }
        console.log('ERROR')})
    .then(data => showData(data))
    
}

function showData(data) {
    result = data;

    if (result.cod == 404) {
        document.getElementById('falseMessage').style.display = 'block';
        console.log('ERROR');
        return;
    }
    console.log(result);
    temp_high = result.main.temp_max;
    temp_low = result.main.temp_min;
    temp_feel = result.main.feels_like;

    condition = result.weather[0].main.toLowerCase();
    var wind = result.wind.speed;

    if (condition == 'clouds') {
        document.getElementById('condition').className = 'clouds';

    } else if (condition == 'rain') {
        document.getElementById('condition').className = 'rain';
        document.getElementById('gear').innerText = 'bring rain gear';
        document.getElementById('gear').className = 'rain';
        document.getElementById('gear').style.display = 'inline'

    } else if (condition == 'clear') {
        condition = 'sun'
        document.getElementById('condition').className = 'sun';

    } else if (condition == 'snow') {
        document.getElementById('condition').className = 'snow';

    } else if (condition == 'thunderstorm') {
        document.getElementById('condition').className = 'thunder';
        document.getElementById('gear').innerText = 'bring rain gear';
        document.getElementById('gear').className = 'thunder';
        document.getElementById('gear').style.display = 'inline'
    }

    document.getElementById('lowTemp').innerText = temp_low;
    document.getElementById('highTemp').innerText = temp_high;
    document.getElementById('feelTemp').innerText = temp_feel;

    document.getElementById('condition').innerText = condition;

    document.getElementById('wind').innerText = wind.toFixed(2) + 'mph';
    document.getElementById('wind').style.display = 'inline';

    if (wind > 20) {
        document.getElementById('gear').innerText = 'bring wind gear';
        document.getElementById('gear').className = 'wind';
        document.getElementById('gear').style.display = 'inline';
    } 

    document.getElementById('resultWeather').style.display = 'block';

    getClothes()
}

function switchCF () {
    var checkBox = document.getElementById('togBtn');

    if (checkBox.checked == true) {
        document.getElementById('lowTemp').innerText = conversion(temp_low);
        document.getElementById('highTemp').innerText = conversion(temp_high);
        document.getElementById('feelTemp').innerText = conversion(temp_feel);
    } else {
        document.getElementById('lowTemp').innerText = temp_low;
        document.getElementById('highTemp').innerText = temp_high;
        document.getElementById('feelTemp').innerText = temp_feel;
    }
}

function conversion (fahren) {
    return ((fahren - 32) * 5/9).toFixed(2);
}

function getClothes() {
    getTops();
    getBottoms();

}

function getTops() {
    if (max(temp_feel, temp_low) > 85 || temp_high > 95) {
        var tank = new Clothes('tanks', 3, 'top');
        tank.show();
        return;
    } else if (max(temp_feel, temp_low) > 72) {
        tops[0].show();
        return;
    }

    var diff = comfort - min(temp_feel, temp_low);
    options = getLayers(diff)

    if (options.includes(tops.length-1) && options.includes(tops.length-2)) { //jacket with coat?
        let j = options.indexOf(tops.length-2);
        options.splice(j, 1);
    }

    if (options.includes(0) && options.includes(1)) { //short T with long T?
        let j = options.indexOf(0);
        options.splice(j, 1);
    }

    if (options.length == 1 && (options[0] == tops.length-1 || options[0] == tops.length-2)) { //just jacket or just coat?
        options.unshift(1);
    }

    for (var i = 0; i < options.length; i++) {
        tops[options[i]].show();
    }

}

function getBottoms() {
    if (temp_high > 72) {
        bottoms[0].show()
        return;
    } else if (temp_low > 42) {
        bottoms[1].show()
        return;
    } else {
        bottoms[2].show()
        return;
    }
}

function getLayers(diff) {
    idx = []

    for (var i = tops.length - 1; i >= 0; i--) {
        if (diff > tops[i].temp) {
            idx.push(i);
            diff = diff - tops[i].temp;
        }
        if (diff < 5) {
            break;
        }
    }
    
    return idx;
}

function max(n1, n2) {
    if (n1 > n2) {
        return n1;
    } else {
        return n2;
    }
}

function min(n1, n2) {
    if (n1 > n2) {
        return n2;
    } else {
        return n1;
    }
}