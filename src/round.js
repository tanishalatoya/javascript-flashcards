var Turn = require('../src/turn');

class Round {
  constructor(cardDeck) {
    this.currentCard = cardDeck.cardsInDeck[0];
    this.turns = 0;
    this.incorrectGuesses = [];
  }

  returnCurrentCard() {
    return this.currentCard;
  }

  takeTurns(userGuess, cardDeck) {
    let turn = new Turn(userGuess, this.currentCard);
    this.turns += 1;
    if(turn.evaluateGuess() === false) {
      this.incorrectGuesses.push(this.currentCard.id);
    };
    this.currentCard = cardDeck.cardsInDeck[this.turns];
    return turn.giveFeedback();
  }

  calculatePercentCorrect(cardDeck) {
    let numberCorrect = cardDeck.cardsInDeck.length - this.incorrectGuesses.length;
    return `${Math.floor(numberCorrect / cardDeck.cardsInDeck.length * 100)}%`
  }

  endRound(cardDeck) {
    return `**Round over!** You answered ${this.calculatePercentCorrect(cardDeck)} of the questions correctly!`
  }
}

module.exports = Round;