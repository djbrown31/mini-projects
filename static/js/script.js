// Challenge 1: your Age in Days
function ageInDays() {
    var birthYear = prompt('What year were you born... Good Friend?');
    var ageInDayss = (2020 - birthYear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + ageInDayss + ' days old!')
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
    document.getElementById('ageInDays').remove();
}

// Challenge 2: Cat Generator
function generateCat() {
    fetch('https://api.thecatapi.com/v1/images/search?size=small')
        .then(response => response.json())
        .then((data) => {
            let catsImgUrl = data[0].url

            var image = document.createElement("img");
            image.setAttribute('src', `${catsImgUrl}`);

            var div = document.getElementById('flex-cat-gen');
            div.appendChild(image);

        })
        .catch(err => console.log(err))
}

// Challenge 3: Rock, Paper, Scissors
function rpsGame(yourChoice) {
    console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;

    botChoice = numberToChoice(randToRpsInt());
    console.log('Computer choice:', botChoice);

    results = decideWinner(humanChoice, botChoice); // [0,1] human lost | bot won
    console.log(results);

    message = finalMessage(results); // {'message': 'You won!', 'color': 'green'}
    console.log(message);

    rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        'rock': { 'scissors': 1, 'rock': 0.5, 'paper': 0 },
        'paper': { 'rock': 1, 'paper': 0.5, 'scissors': 0 },
        'scissors': { 'paper': 1, 'scissors': 0.5, 'rock': 0 }
    };

    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[yourChoice][computerChoice];

    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return { 'message': 'You lost!', 'color': 'red' };
    } else if (yourScore === 0.5) {
        return { 'message': 'You tied!', 'color': 'yellow' };
    } else {
        return { 'message': 'You won!', 'color': 'green' };
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src

    }

    //let's remove all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>"
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding 30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>"

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

// Challenge 4: Change the Color of All Buttons
var all_buttons = document.getElementsByTagName('button');


var copyAllButtons = [];
for (let i = 0; i < all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]);
}

console.log(copyAllButtons);

function buttonColorChange(buttonThingy) {
    if (buttonThingy.value === 'red') {
        buttonsRed();
    } else if (buttonThingy.value === 'green') {
        buttonsGreen();
    } else if (buttonThingy.value === 'reset') {
        buttonColorReset();
    } else if (buttonThingy.value === 'random') {
        randomColors();
    }
}

function buttonsRed() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonColorReset() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors() {
    let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']

    for (let i = 0; i < all_buttons.length; i++) {
        var randomNumber = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}

// Challenge 5: Blackjack
let blackjackGame = {
    'you': { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A']
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('static/sounds/swish.m4a');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

// function blackjackHit() {
//     showCard(YOU);
//     // if (blackjackGame['isStand'] === false) {
//     //     let randomCard = hit();
//     //     updateScore('yourScore', randomCard);
//     //     console.log(blackjackGame['yourScore']);
//     //     showCard(randomCard, '#your-box');
//     //     showYourScore(blackjackGame['yourScore']);
//     // }
// }

function blackjackHit() {
    let card = randomCard;
    console.log(card);
    showCard(YOU);

    //     if (blackjackGame['isStand'] === false) {
    //         let randomCard = hit();
    //         updateScore('yourScore', randomCard);
    //         console.log(blackjackGame['yourScore']);
    //         showCard(randomCard, '#your-box');
    //         showYourScore(blackjackGame['yourScore']);
    //     }
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(activePlayer) {
    let cardImage = document.createElement('img');
    cardImage.src = 'static/images/Q.png';
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
}

function blackjackDeal() {

    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

    for (i = 0; i < yourImages.length; i++) {
        yourImages[i].remove();
    }

    for (i = 0; i < dealerImages.length; i++) {
        dealerImages[i].remove();
    }

    //     function blackjackHit() {

    //         //     if (blackjackGame['isStand'] === false) {
    //         //         let randomCard = hit();
    //         //         updateScore('yourScore', randomCard);
    //         //         console.log(blackjackGame['yourScore']);
    //         //         showCard(randomCard, '#your-box');
    //         //         showYourScore(blackjackGame['yourScore']);
    //         //     }
    //     }

    // }

    //     if (blackjackGame['turnsOver'] === true) {

    //         blackjackGame['isStand'] = false;

    //         let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    //         let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    //         for (i = 0; i < yourImages.length; i++) {
    //             yourImages[i].remove();
    //         }

    //         for (i = 0; i < dealerImages.length; i++) {
    //             dealerImages[i].remove();
    //         }

    //         blackjackGame['yourScore'] = 0;
    //         blackjackGame['dealerScore'] = 0;

    //         document.querySelector('#your-blackjack-score').textContent = 0;
    //         document.querySelector('#dealer-blackjack-score').textContent = 0;

    //         document.querySelector('#your-blackjack-score').style.color = '#ffffff';
    //         document.querySelector('#dealer-blackjack-score').style.color = '#ffffff';

    //         document.querySelector('#blackjack-result').textContent = "Let's play";
    //         document.querySelector('#blackjack-result').style.color = 'black';

    //         blackjackGame['turnsOver'] = false;
    //     }
    // }

    // if (Number(document.querySelector(playerBoxId + ' span').textContent) <= 21) {
    //     let cardImage = document.createElement('img');
    //     cardImage.src = '/Users/danielbrown/Downloads/images' + card + '.png';
    //     document.querySelector(playerBoxId).appendChild(cardImage);
    //     hitSound.play();
    // }
}

// let blackjackGame = {
//     'yourScore': 0,
//     'dealerScore': 0,
//     'isStand': false,
//     'turnsOver': false,
//     'wins': 0,
//     'losses': 0,
//     'draws': 0,
//     'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'Q': 10, 'J': 10, 'A': [1, 11] },
//     'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A']
// };

// document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

// document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

// document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

// const hitSound = new Audio('/Users/danielbrown/Downloads/sounds/swish.m4a');
// const winSound = new Audio('/Users/danielbrown/Downloads/sounds/cash.mp3');
// const lossSound = new Audio('/Users/danielbrown/Downloads/sounds/aww.mp3');

// function blackjackHit() {
//     if (blackjackGame['isStand'] === false) {
//         let randomCard = hit();
//         updateScore('yourScore', randomCard);
//         console.log(blackjackGame['yourScore']);
//         showCard(randomCard, '#your-box');
//         showYourScore(blackjackGame['yourScore']);
//     }
// }



// function showResult() {
//     let message;

//     if (blackjackGame['turnsOver'] === true) {

//         if (blackjackGame['yourScore'] <= 21) {

//             // condition: higher score than dealer's or when dealer busts but you're 21 or under.
//             if (blackjackGame['yourScore'] > blackjackGame['dealerScore'] || (blackjackGame['dealerScore'] > 21)) {
//                 blackjackGame['wins']++;
//                 document.querySelector('#wins').textContent = blackjackGame['wins'];
//                 message = 'You won!';
//                 messageColor = 'green';
//                 winSound.play();

//             } else if (blackjackGame['yourScore'] < blackjackGame['dealerScore']) {
//                 blackjackGame['losses']++;
//                 document.querySelector('#losses').textContent = blackjackGame['losses'];
//                 message = 'You lost!';
//                 messageColor = 'red';
//                 lossSound.play();

//             } else if (blackjackGame['yourScore'] === blackjackGame['dealerScore']) {
//                 blackjackGame['draws']++;
//                 document.querySelector('#draws').textContent = blackjackGame['draws'];
//                 message = 'You drew!';
//                 messageColor = 'black';
//             }

//             // condition: user busts but dealer doesn't
//         } else if (blackjackGame['yourScore'] > 21 && blackjackGame['dealerScore'] <= 21) {
//             blackjackGame['losses']++;
//             document.querySelector('#losses').textContent = blackjackGame['losses'];
//             message = 'You lost!';
//             messageColor = 'red';
//             lossSound.play();

//             // condition: when both bust.
//         } else if (blackjackGame['yourScore'] > 21 && blackjackGame['dealerScore'] > 21) {
//             blackjackGame['draws']++;
//             document.querySelector('#draws').textContent = blackjackGame['draws'];
//             message = 'You drew!';
//             messageColor = 'black';
//         }
//     }

//     document.querySelector('#blackjack-result').textContent = message;
//     document.querySelector('#blackjack-result').style.color = messageColor;
// }

// function hit() {
//     let randomIndex = Math.floor(Math.random() * 13);
//     let randomCard = blackjackGame['cards'][randomIndex];
//     console.log(randomCard);
//     return randomCard;
// }

// function showCard(card, playerBoxId) {
//     if (Number(document.querySelector(playerBoxId + ' span').textContent) <= 21) {
//         let cardImage = document.createElement('IMG');
//         cardImage.src = '/Users/danielbrown/Downloads/images' + card + '.png';
//         document.querySelector(playerBoxId).appendChild(cardImage);
//         hitSound.play();
//     }
// }

// function updateScore(playerScore, card) {
//     if (card === 'A') {
//         if (blackjackGame[playerScore] + blackjackGame['cardsMap'][card][1] <= 21) {
//             blackjackGame[playerScore] += blackjackGame['cardsMap'][card][1];
//         } else {
//             blackjackGame[playerScore] += blackjackGame['cardsMap'][card][0];
//         }
//     } else {
//         blackjackGame[playerScore] += blackjackGame['cardsMap'][card];
//     }
// }

// function showYourScore(score) {
//     if (blackjackGame['yourScore'] > 21) {
//         document.querySelector('#your-blackjack-score').textContent = "BUST!";
//         document.querySelector('#your-blackjack-score').style.color = 'red';
//     } else {
//         document.querySelector('#your-blackjack-score').textContent = score;
//     }
// }

// function showDealerScore(score) {
//     if (blackjackGame['dealerScore'] > 21) {
//         document.querySelector('#dealer-blackjack-score').textContent = "BUST!";
//         document.querySelector('#dealer-blackjack-score').style.color = 'red';
//     } else {
//         document.querySelector('#dealer-blackjack-score').textContent = score;
//     }
// }

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function dealerLogic() {
//     blackjackGame['isStand'] = true;
//     while (blackjackGame['dealerScore'] < 16 && blackjackGame['isStand'] === true) {
//         let randomDealerCard = hit();
//         updateScore('dealerScore', randomDealerCard);
//         showCard(randomDealerCard, '#dealer-box');
//         showDealerScore(blackjackGame['dealerScore']);
//         await sleep(1000);
//     }

//     blackjackGame['turnsOver'] = true;
//     showResult();
// }

// function blackjackDeal() {
//     if (blackjackGame['turnsOver'] === true) {

//         blackjackGame['isStand'] = false;

//         let yourImages = document.querySelector('#your-box').querySelectorAll('img');
//         let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
//         for (i = 0; i < yourImages.length; i++) {
//             yourImages[i].remove();
//         }

//         for (i = 0; i < dealerImages.length; i++) {
//             dealerImages[i].remove();
//         }

//         blackjackGame['yourScore'] = 0;
//         blackjackGame['dealerScore'] = 0;

//         document.querySelector('#your-blackjack-score').textContent = 0;
//         document.querySelector('#dealer-blackjack-score').textContent = 0;

//         document.querySelector('#your-blackjack-score').style.color = '#ffffff';
//         document.querySelector('#dealer-blackjack-score').style.color = '#ffffff';

//         document.querySelector('#blackjack-result').textContent = "Let's play";
//         document.querySelector('#blackjack-result').style.color = 'black';

//         blackjackGame['turnsOver'] = false;
//     }
// }

