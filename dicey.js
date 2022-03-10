$(document).ready(() => {
    const diceOnScreen = [];
    let diceCreated = 0;
    let diceTotal = 0;
    const getRandomValue = (maximum, minimum) => {
        return Math.floor(Math.random() * (maximum - minimum) + minimum);
    };
    const addDice = () => {
        let newRandomValue = getRandomValue(7, 1);
        let newDieDiv = new Die(newRandomValue);
        diceOnScreen.push(newDieDiv);
        diceCreated += 1;
    };

    const rollDice = () => {
        for (let i = 0; i < diceOnScreen.length; i += 1) {
            diceOnScreen[i].roll();
        }
    };

    const addRolls = () => {
        for (let i = 0; i < diceOnScreen.length; i += 1) {
            diceTotal += diceOnScreen[i].value;
        }
        alert(`Total sum of Dice is: ${diceTotal}!`);
        resetDiceTotal();
    };

    const resetDiceTotal = () => {
        diceTotal = 0;
    };
    const resetDiceOnScreen = () => {
        location.reload();
    };

    $(`#generateDiceButton`).click(addDice);
    $(`#rollDiceButton`).click(rollDice);
    $(`#getSumButton`).click(addRolls);
    $(`#startOverButton`).click(resetDiceOnScreen);

    class Die {
        constructor(value) {
            this.value = value;
            this.id = diceCreated;
            this.div = $(`<div></div>`);
            this.div.attr(`id`, this.id);
            this.div.attr(`class`, `die`);
            this.img = this.dieFace()
            this.div.append(this.img);
            $(`#diceContainerDiv`).append(this.div);

            this.div.on("click", () => {
                this.roll();
            });

            this.div.on("dblclick", function(){
                console.log(this.div)
                $(`#${this.id}`).remove();
                let index = diceOnScreen.findIndex((item) => item.id === this.id);
                diceOnScreen.splice(index, 1);
            });
        }

        roll() {
            this.newValue = getRandomValue(7, 1);
            this.value = this.newValue;
            this.div.empty().append(this.dieFace());
        }

        // dice images
        dieFace() {
            let img;

            if (this.value === 1) {
                img = $(
                    `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Dice-1.svg/557px-Dice-1.svg.png" />`
                );
            } else if (this.value === 2) {
                img = $(
                    `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Dice-2.svg/2048px-Dice-2.svg.png" />`
                );
            } else if (this.value === 3) {
                img = $(
                    `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Dice-3.svg/1200px-Dice-3.svg.png" />`
                );
            } else if (this.value === 4) {
                img = $(
                    `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Dice-4.svg/557px-Dice-4.svg.png" />`
                );
            } else if (this.value === 5) {
                img = $(
                    `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Dice-5.svg/1200px-Dice-5.svg.png" />`
                );
            } else if (this.value === 6) {
                img = $(
                    `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Dice-6.svg/1200px-Dice-6.svg.png" />`
                );
            }


            return img
        }
    }
});
