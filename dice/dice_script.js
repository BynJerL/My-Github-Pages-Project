const DICE_TOTAL_LIMIT = 3;

var dice_click_count = 0;
var dice_limit = 6;
var dice_number = 1;
var dice_value = 0;
var dice_values = [0, 0, 0];

function initialize_dice() {
    const dice_wrapper = document.getElementById("dice-wrapper");
    
    if (!dice_wrapper) {
        console.error("Dice wrapper not found in the DOM.");
        return;
    }
    
    dice_wrapper.innerHTML = "";

    if (dice_number === 1) {
        dice_wrapper.style.gridTemplateColumns = "repeat(1, 100px)"; // 2 columns for the first row
    } else {
        dice_wrapper.style.gridTemplateColumns = "repeat(2, 100px)"; // Default to 1 column
    }

    console.log(`Initializing ${dice_number} dice...`);
    for (let i = 0; i < dice_number; i++) {
        const dice = document.createElement("div");
        dice.classList.add("dice");
        dice.setAttribute("id", `dice-${i}`);
        dice.onclick = dice_click;
        dice_wrapper.appendChild(dice);
        console.log(`Dice ${i} created and added to the wrapper.`);
    }

    update_button();
    document.getElementById("dice-count").innerText = dice_number;
}

function increase_dice() {
    if (dice_number < 3) {
        dice_number++;
        initialize_dice(); // Reinitialize dice with the new count
    }
}

function decrease_dice() {
    if (dice_number > 1) {
        dice_number--;
        initialize_dice(); // Reinitialize dice with the new count
    }
}

function update_button() {
    var plus_button = document.getElementById("increase-dice");
    var minus_button = document.getElementById("decrease-dice");

    if (dice_number === 3) {
        plus_button.disabled = true;
    } else {
        plus_button.disabled = false;
    }

    if (dice_number === 1) {
        minus_button.disabled = true;
    } else {
        minus_button.disabled = false;
    }
}

function update_dice_block() {
    var dice_container = document.getElementById("dice");
    if (document.getElementById("dark-mode-toggle").checked) {
        dice_container.style.backgroundImage = `url('assets/img/_${dice_value}.png')`;
    } else {
        dice_container.style.backgroundImage = `url('assets/img/${dice_value}.png')`;
    }
}

function update_dice_blocks() {
    for (let i = 0; i < dice_values.length; i++) {
        const diceElement = document.getElementById(`dice-${i}`);
        const diceValue = dice_values[i];
        if (document.getElementById("dark-mode-toggle").checked) {
            diceElement.style.backgroundImage = `url('assets/img/_${diceValue}.png')`;
        } else {
            diceElement.style.backgroundImage = `url('assets/img/${diceValue}.png')`;
        }
    }
}

function dice_click() {
    dice_click_count++;

    if (dice_click_count == 25) {
        alert("Seems like you enjoy finding some easter eggs, huh?");
        dice_limit = 9;
    }
}

function roll_dice() {
    document.getElementById("roll-toggle").disabled = true;

    for (var i = 0; i <= 11; i++) {
        setTimeout(
            function () {
                for (let j = 0; j < dice_number; j++) {
                    dice_values[j] = Math.floor(Math.random() * dice_limit) + 1;
                } 
                update_dice_blocks()
            }, Math.pow(2, i) - 1
        );
    }

    setTimeout(
        function() {
            let sum = 0;

            for (let j = 0; j < dice_number; j++) {
                sum += dice_values[j];
            }

            document.getElementById("roll-toggle").disabled = false;
            document.getElementById("roll-result").innerHTML = `You rolled a total of ${sum} on ${dice_number} dice!`;
        
            setTimeout(
                function() {
                    if (dice_values.slice(0, dice_number).every( (val, i, arr) => val === arr[0] ) && dice_number > 1) {
                        document.getElementById("dice-audio").play();
                        alert("You rolled the same number on all dice! Lucky you!");
                    }
                }, 50
            )
        }, Math.pow(2, 11) + 50
    );
}

function toggle_dark_mode() {
    const isDarkMode = document.getElementById("dark-mode-toggle").checked;
    document.body.classList.toggle("dark-mode", isDarkMode);
    update_dice_blocks();
}

document.addEventListener("DOMContentLoaded", () => {
    initialize_dice();
});