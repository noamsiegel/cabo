import { Card } from "./index.js";

const Suits = ["club", "diamond", "heart", "spade"];

// clubs/spades = black
// diamonds/hearts = red

const abilities = [
  { value: "7", suit: Suits, ability: "Look at one of your own cards" },
  { value: "8", suit: Suits, ability: "Look at one of your own cards" },
  { value: "9", suit: Suits, ability: "Look at someone else's card" },
  { value: "10", suit: Suits, ability: "Look at someone else's card" },
  { value: "11", suit: Suits, ability: "Blind swap any two cards" },
  { value: "12", suit: Suits, ability: "Blind swap any two cards" },
  {
    value: "13",
    suit: ["spade", "club"],
    ability: "Look at any two cards and decide if you want to swap them",
  },
];
