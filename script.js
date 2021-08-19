let diceImages = ["", "dice-01.svg",
    "dice-02.svg",
    "dice-03.svg",
    "dice-04.svg",
    "dice-05.svg",
    "dice-06.svg"];

// function roll() {

// }
// roll();

document.querySelector("#die-1").setAttribute("src", diceImages[4]);
document.querySelector("#die-2").setAttribute("src", diceImages[5]);








function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function returnRandom(choices) {
    return choices[getRandomInt(0, choices.length - 1)]
}

function getDicePosition(num) {
    if (num == 2)
        return returnRandom([[1, 1]])
    if (num == 3)
        return returnRandom([[1, 2], [2, 1]])
    if (num == 6)
        return returnRandom([[1, 5], [5, 1]])
    if (num == 7)
        return returnRandom([[6, 1], [1, 6], [2, 5], [5, 2]])
    if (num == 4)
        return returnRandom([[2, 2]])
    if (num == 8)
        return returnRandom([[6, 2], [2, 6]])
    if (num == 10)
        return returnRandom([[5, 5]])
    if (num == 11)
        return returnRandom([[5, 6], [6, 5]])
    if (num == 12)
        return returnRandom([[6, 6]])
    // default
    return returnRandom([[6, 6]])
}

var app = new Vue({
    el: '#app',
    data: {
        dice1Value: 2,
        dice2Value: 6,
        arr: [2, 3, 6, 7, 4, 8, 10, 11, 12],
        generatedChoice: [],
    },
    methods: {
        rollDice: function () {

            if (this.arr.length == 0) {
                this.arr = [2, 3, 6, 7, 4, 8, 10, 11, 12];
            }
            ;
            const choice = getRandomInt(0, this.arr.length - 1)
            this.generatedChoice.push(this.arr[choice])
            const individualDiceChoice = getDicePosition(this.arr[choice])
            this.dice1Value = individualDiceChoice[0]
            this.dice2Value = individualDiceChoice[1]
            this.arr.splice(choice, 1)

            // console.log(this.dice1Value, this.dice2Value)

            // Animation logic
            let dice = document.querySelectorAll("img");
            const shakeClassess = ["shake-chunk", "shake-constant"]

            dice.forEach(function (die) {
                die.classList.add(...shakeClassess);
            });
            const d1 = this.dice1Value;
            const d2 = this.dice2Value;
            setTimeout(function () {

                // let dieOneValue = Math.floor(Math.random()*6);
                // let dieTwoValue = Math.floor(Math.random()*6);
                // console.log(dieOneValue,dieTwoValue);
                document.querySelector("#die-1").setAttribute("src", diceImages[d1]);
                document.querySelector("#die-2").setAttribute("src", diceImages[d2]);

                dice.forEach(function (die) {
                    die.classList.remove(...shakeClassess);
                });
                document.querySelector("#total").innerHTML = "Your Got " + (d1 + d2);

            },
                1500
            );
            console.log(this.generatedChoice)
        },

        resetBoard: function () {
            this.dice1Value = 2;
            this.dice2Value = 6;
            this.arr = [2, 3, 6, 7, 4, 8, 10, 11, 12];
            this.generatedChoice = []
        },
    }
})