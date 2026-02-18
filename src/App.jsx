import { useDispatch, useSelector } from "react-redux";
import { flipCard, checkMatch, resetGame } from "./features/gameSlice";
import { useEffect } from "react";

function App() {
  const { cards, firstCard, secondCard, score } = useSelector(
    state => state.game
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (firstCard && secondCard) {
      setTimeout(() => {
        dispatch(checkMatch());
      }, 700);
    }
  }, [secondCard]);

  const isGameFinished = cards.every(
    card => card.pairId === null || card.status === "matched"
  );

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h2>Score: {score}</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 80px)",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        {cards.map(card => (
          <div
            key={card.id}
            onClick={() => dispatch(flipCard(card.id))}
            style={{
              width: 80,
              height: 80,
              background:
                card.status === "hidden"
                  ? "#ddd"
                  : card.status === "matched"
                  ? "#8BC34A"
                  : card.status === "disabled"
                  ? "#f8d7da"
                  : "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              cursor: "pointer",
              borderRadius: 8,
            }}
          >
            {card.status === "hidden" ? "?" : card.pairId}
          </div>
        ))}
      </div>

      {isGameFinished && (
        <button
          onClick={() => dispatch(resetGame())}
          style={{ marginTop: 20 }}
        >
          Yeniden Oyna
        </button>
      )}
    </div>
  );
}

export default App;
