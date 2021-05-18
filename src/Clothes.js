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
    }
}