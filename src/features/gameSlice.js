import { createSlice } from "@reduxjs/toolkit";

const createCards = () => {
  const pairs = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    pairId: i,
  }));

  let cards = [...pairs, ...pairs]
    .map((card, index) => ({
      id: index,
      pairId: card.pairId,
      status: "hidden",
    }));

  // 1 tane disabled kart (25 olsun)
  cards.push({
    id: 24,
    pairId: null,
    status: "disabled",
  });

  return cards.sort(() => Math.random() - 0.5);
};

const initialState = {
  cards: createCards(),
  firstCard: null,
  secondCard: null,
  lock: false,
  score: 0,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    flipCard: (state, action) => {
      const card = state.cards.find(c => c.id === action.payload);

      if (!card || card.status !== "hidden" || state.lock) return;

      card.status = "open";

      if (state.firstCard === null) {
        state.firstCard = card;
      } else {
        state.secondCard = card;
        state.lock = true;
      }
    },

    checkMatch: (state) => {
      const { firstCard, secondCard } = state;
      if (!firstCard || !secondCard) return;

      if (firstCard.pairId === secondCard.pairId) {
        firstCard.status = "matched";
        secondCard.status = "matched";
        state.score += 50;
      } else {
        firstCard.status = "hidden";
        secondCard.status = "hidden";
        state.score -= 10;
      }

      state.firstCard = null;
      state.secondCard = null;
      state.lock = false;
    },

    resetGame: (state) => {
      state.cards = createCards();
      state.score = 0;
      state.firstCard = null;
      state.secondCard = null;
      state.lock = false;
    },
  },
});

export const { flipCard, checkMatch, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
