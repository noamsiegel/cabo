import { Game, Space, Piece, createGame, Player, Do } from "@boardzilla/core";
import { aC } from "vitest/dist/reporters-1evA5lom.js";

export class Cabo extends Game<Cabo, CaboPlayer> {
  /**
   * Any overall properties of your game go here
   */
  gameEnd = false;
  caboCalled = false;
  caboCalledBy?: CaboPlayer;
}

export class CaboPlayer extends Player<Cabo, CaboPlayer> {
  /**
   * Any properties of your players that are specific to your game go here
   */
  score: number = 0;
}

type Suit = "club" | "heart" | "spade" | "diamond";
/**
 * Define your game's custom pieces and spaces.
 */
export class Card extends Piece<Cabo> {
  suit: [Suit];
  value: string;
  ability: string;
}

export default createGame(CaboPlayer, Cabo, (game) => {
  const { action } = game;
  const { playerActions, whileLoop, loop, eachPlayer, everyPlayer, forEach } =
    game.flowCommands;

  /* Register all custom pieces and spaces */
  game.registerClasses(Card);

  /* Create your game board's layout and all included pieces. */
  const board = game.create(Space, "board");
  const deck = board.create(Space, "deck");
  // $.deck.onEnter(Card, (e) => e.hideFromAll());

  const discardPile = board.create(Space, "discardPile");
  $.discardPile.onEnter(Card, (e) => e.showToAll());

  // creating the cards
  ["club", "spade", "diamond", "heart"].forEach((suit: Suit) => {
    ["2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k"].forEach(
      (value) => {
        $.deck.create(Card, `${value}-${suit}`, {
          suit: [suit],
          value,
        });
      }
    );
  });

  for (const player of game.players) {
    const cards = board.create(Space, "cards", { player });
    const hand = board.create(Space, "hand", { player });
    // $.hand.onEnter(Card, (e) => e.showOnlyTo(player));
    hand.onEnter(Card, (t) => {
      t.hideFromAll();
    });
    // waiting.onEnter(Card, (e) => e.hideFromAll());
  }

  /** Define all possible game actions. */
  game.defineActions({
    lookAtOwnCards: (player) =>
      action({
        prompt: "Look at two of your own cards",
      })
        .chooseOnBoard("cards", () => player.my("cards")!.all(Card), {
          number: 2,
        })
        .do(({ cards }) => {
          cards.forEach((c) => {
            c.showTo(player);
          });
        }),
    drawFromDeck: (player) =>
      action({
        prompt: "Draw a card and swap it with one of your own",
        description: "Drawing and swapping",
      })
        .chooseOnBoard("drawn-card", [$.deck.first(Card)!], { skipIf: "never" })
        // .move("drawn-card")
        .chooseOnBoard("chosen-card", player.allMy(Card), {
          prompt: "Choose a card to swap with the drawn card",
          number: 1,
        })
        .swap("chosen-card", "drawn-card"),
    drawFromDiscard: (player) =>
      action({
        prompt: "Take the top card from the discard pile",
      }),
  });

  /** Define the game flow, starting with board setup and progressing through all phases and turns. */
  game.defineFlow(
    () => $.deck.shuffle(),

    // deal 4 cards for each player
    forEach({
      name: "player",
      collection: () => game.players,
      do: ({ player }) => {
        console.log(`Dealing cards to player ${player}`);
        for (let i = 0; i < 4; i++) {
          $.deck.first(Card)!.putInto(player.my("cards")!);
        }
      },
    }),

    // get every player to look at two of their cards
    everyPlayer({ do: playerActions({ actions: ["lookAtOwnCards"] }) }),

    // get the first player

    // loop until someone calls cabo and then end game when back to person that called cabo
    loop(
      eachPlayer({
        name: "play",
        do: playerActions({ actions: ["drawFromDeck"] }),
      })
    )
  );
});
