import React from "react";
import { ProfileBadge, render, toggleSetting, numberSetting } from "@boardzilla/core";
import { default as setup, Card } from "../game/index.js";

import "./style.scss";

render(setup, {
  settings: {
    numPlayers: numberSetting(
      "Number of players",
      2,
      6,
      4
    ),
    numStartingCards: numberSetting(
      "Cards per player",
      2,
      6,
      4
    ),
    cardAceValue: numberSetting(
      "Value of an Ace",
      -2,
      2,
      1
    ),
    cardRedKingValue: numberSetting(
      "Value of a Red King",
      -2,
      2,
      0
    ),
    CardJokerValue: numberSetting(
      "Value of a Joker",
      -2,
      2,
      -1
    ),
  },
  layout: game => {
  }
});