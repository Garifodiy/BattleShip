/**
 * Created by Anton on 19.07.2017.
 */
console.log("batleShip.js says 'Hello!'")

//объект представление
var view ={
    displayMessage: function (msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    
    displayHit: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },

    displayMiss: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
}

////////////////////////////////////////////////////////
//тесты объектов
//view.displayMiss("00");
//view.displayHit("34");
//view.displayMiss("55");
//view.displayHit("12");
view.displayMessage("test_displayMessage_OK")
////////////////////////////////////////////////////////

//объект модель
var model = {
    boardSize : 7,  // рразмер поля
    numShips: 3,
    shipLength: 3,  // длина корабля
    shipsLenngth: [1,2,3,4], //длины разных кораблей(1-палубник, 2х палубник,...4х палубник)
    shipsSunk: 0,   // текущее число потопленных кораблей

    /*ships: [{ locations: ["10", "20","30"], hits: ["","",""] },
        { locations: ["52", "53","54"], hits: ["","",""] },
        { locations: ["61", "62","63"], hits: ["","",""] },
    ],*/
    ships: [{ locations: [0, 0, 0], hits: ["","",""] },
            { locations: [0, 0, 0], hits: ["","",""] },
            { locations: [0, 0, 0], hits: ["","",""] },
    ],

    fire : function(guess) { //проверка на попадание по кораблю; guess - координата выстрела
        console.log("координата = ", guess);
        for(var i=0; i<this.numShips;i++){
            var ship = this.ships[i];
            locations = ship.locations; //? var ?
            //var index = location.indexOf(guess);
            var index = ship.locations.indexOf(guess);

            if(index>=0){ //если есть хоть одно попадание
                ship.hits[index]="hit";
                view.displayHit(guess); // объект view узнает о попадании и должен отобразить это на экране
                view.displayMessage("HIT!");
                if (this.isSunk(ship)){ // проверка на потоплен ли данный корабль
                    view.displayMessage("КОРАБЛЬ ПОТОПЛЕН!");
                    this.shipsSunk++;
                }
                return true; //если есть попадание, то возвращается тру и дальнейшие действия прерываются
            }
        }
        //если не было обнаруженно попадания, то view должен отобразить промах и сообщить об этом
        view.displayMiss(guess);
        view.displayMessage("Промах!")


        return false;
    },

    isSunk:function (ship) { //проверка на потоплен ли корабль
        for(var i=0;i<this.shipLength;i++){
            if(ship.hits[i]!=="hit"){return false;}
        }
        return true;
    },

    //СОЗДАНИЕ КОРАБЛЕЙ////////////////////////////////////////////////
    //функция заполняет координаты создаваемых кораблей в массив ships
    createShips: function(){
        var locations;
        for(var i=0; i<this.numShips; i++){
            do{
                locations = this.generateShip(); //
            } while (this.collision(locations));
            this.ships[i].locations = locations;
        }
        console.log("function createShips - OK")
        //return true;
    },
    //создает список координат под корабль случайным образом
    generateShip: function(){
        var direction = Math.floor(Math.random()*2); //генерит 1 или 0 для горизонтального/вертикального корабля

        var row, col;//начальная позиция
        if(direction === 1){//горизонтальный корабль
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize-this.shipLength));
        } else{ //вертикальный корабль
            row = Math.floor(Math.random() * (this.boardSize-this.shipLength));
            col = Math.floor(Math.random() * this.boardSize);
        }

        var newShipLocations = [];
        for(var i=0; i< this.shipLength; i++){
            if(direction === 1) {
                newShipLocations.push(row + '' + (col+i));
            } else {
                newShipLocations.push((row+i) + '' + col);
            }
        }
        return newShipLocations;
    },
    //проверка на то что бы новый создаваемый корабль не "заплывал" на другие уже размещенные на поле корабли
    collision: function (locations) {
        for (var i=0;i<this.numShips;i++) {
            var ship = this.ships[i];
            for(var j=0;j<locations.length; j++){
                if( ship.locations.indexOf(locations[j]) >= 0 ){
                    return true;
                }
            }
        }
        return false;
    }

}

////////////////////////////////////////////////////////
//тесты объектов
//var ship2 = model.ships[1];
//console.log("ship3 : ",ship2.locations, typeof ship2);

//guess = prompt("Стрелять по клетке: ");
//model.fire(guess);
//model.fire("06");

////////////////////////////////////////////////////////

//объект реализация
var controller = {
    guesses: 0,
    processGaess: function(guess){
        var location = parseGuess(guess); //вызов проверки на правильность введенной координаты
        if (location) {      //и если верна, то
            this.guesses++;  //счетчик выстрелов
            var hit = model.fire(location); //говорим моделе о том что есть координата для выстрела (true если есть попадаение)
            if(hit && model.shipsSunk === model.numShips) { //после очередного попадания, если число потопленных кораблей равно их общему количеству то сообщение объекту "представление" о победе
                view.displayMessage("Победа! все корабли потоплены!");
            }//
        }
    }
}

function parseGuess(guess) { //функция проверки вводимой координаты на соответсвие требованиям
    var letters = ["A","B","C","D","E","F","G"];

    if(guess === null || guess.length !==2){
        alert("Неверно задана координата выстрела")
    } else {
        firstChaar = guess.charAt(0);
        var row = letters.indexOf(firstChaar);
        var column = guess.charAt(1);

        if(isNaN(row) || isNaN(column)){ //проверка на являеются ли координаты числом
            alert("Что-то с этими координатами не так (если это вообще координаты)!")
            console.log("guess_ERROR_01: guess =", row,column);
        } else if(row <0 || row >=model.boardSize || column<0 || column>=model.boardSize) {
            alert("Эта координата выходит за пределы поля!");
            console.log("guess_ERROR_02: guess =", row,column);
        } else { return row + column; } //и если проверки введенной координаты пройдены вовзращается преобразованная в числа координата
    }
    return null; //если все неверно и полученное значение координаты не является координатой, то возвращается null
}

////////////////////////////////////////////////////////
//тесты
//guess = prompt("Стрелять по клетке: ");
//console.log(parseGuess(guess));
//controller.processGaess(guess);
////////////////////////////////////////////////////////

////////////////////////////////////////////////////////
function init(){

    model.createShips();

    for(var i = 0; i<model.ships.length; i++){
        console.log("ships:",model.ships[i].locations);
    }


    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    //по нажатию на энтер
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;
}

function handleFireButton() {
    console.log("button click - Fire!");
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
    controller.processGaess(guess);

    guessInput.value = "";
}

function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");
    if(e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}

window.onload = init;