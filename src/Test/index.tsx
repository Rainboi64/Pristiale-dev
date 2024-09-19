import { useState } from 'react';
import { useSprings, animated, to as interpolate } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';

import styles from './Questionaire.module.css';
import { emperorWeights, questions } from './Questions';

const cardGap = 175;
const xOffset = -325;
const yOffset = 250;

const startY = -200;

const deckX = 0;
const deckY = 200;

const to = (i: number) => ({
  x: i * cardGap + xOffset,
  y: i * -4 + yOffset,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
  opacity: 1,
});

const fade = (i: number) => ({
  x: window.innerWidth + 200,
  y: i * -4 + yOffset,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
  opacity: 0,
});

const from = (_i: number) => ({
  x: 0,
  rot: 0,
  scale: 1.5,
  y: startY,
  opacity: 0,
});

const select = (_i: number) => ({
  x: 0,
  rot: -10 + Math.random() * 20,
  scale: 1.1,
  y: startY,
  opacity: 1,
});

// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r: number, s: number) =>
  `perspective(500px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;

function Deck(props: { onSelect: (i: number) => void; cards: string[] }) {
  const [gone] = useState(() => new Set());
  const { onSelect, cards } = props;
  const [_props, api] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  })); // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(
    ({
      args: [index],
      down,
      movement: [mx, my],
      direction: [xDir, yDir],
      velocity,
    }) => {
      const trigger = velocity > 0.1; // If you flick hard enough it should trigger the card to fly out
      const xdir = xDir < 0 ? -1 : 1; // Direction should either point left or right
      const ydir = yDir < 0 ? -1 : 1;

      if (!down && trigger) {
        onSelect(index);
        gone.add(index);
      }
      api.start((i) => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? deckX * xdir : down ? mx : to(i).x; // When a card is gone it flys out left or right, otherwise goes back to zero
        const y = isGone ? deckY * ydir : down ? my : to(i).y;
        const rot = mx / 100 + xdir * 10 * velocity; // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.1 : 1; // Active cards lift up a bit
        return {
          x,
          y,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size > 0)
        setTimeout(() => {
          api.start((i) => (gone.has(i) ? select(i) : fade(i)));
          gone.clear();
        }, 600);
    },
  );
  return (
    <>
      {_props.map(({ x, y, rot, scale, opacity }, i) => (
        <animated.div className={styles.deck} key={i} style={{ x, y, opacity }}>
          <animated.div
            {...bind(i)}
            style={{
              transform: interpolate([rot, scale, opacity], trans),
            }}
            className={'flex items-center justify-center align-middle'}
          >
            <h1 className="text-center">{cards[i]}</h1>
          </animated.div>
        </animated.div>
      ))}
    </>
  );
}

function calculateBestMatch(
  answers: string[],
  weights: { [fragrance: string]: { [answer: string]: number } },
) {
  // Initialize scores for each fragrance
  const scores: { [fragrance: string]: number } = {};

  // Iterate over each fragrance option
  for (const fragrance in weights) {
    scores[fragrance] = 0; // Initialize the score

    // Iterate over each answer and accumulate the scores based on the weights
    answers.forEach((answer) => {
      if (weights[fragrance][answer]) {
        scores[fragrance] += weights[fragrance][answer];
      }
    });
  }

  // Determine the fragrance with the highest score
  let bestMatch = null;
  let highestScore = 0;

  for (const fragrance in scores) {
    if (scores[fragrance] > highestScore) {
      highestScore = scores[fragrance];
      bestMatch = fragrance;
    }
  }

  return { scores, bestMatch };
}

export default function App() {
  const [answers, setAnswers] = useState<Array<number>>([]);

  const delay = 2000;
  console.log(
    calculateBestMatch(
      answers.map((x, i) => questions[i].answers[x]),
      emperorWeights,
    ),
  );
  return (
    <>
      <div className={styles.container}>
        <h1 className="self-start p-20 text-4xl">
          {answers.length >= questions.length
            ? 'Your fragrance is: ' +
              calculateBestMatch(
                answers.map((x, i) => questions[i].answers[x]),
                emperorWeights,
              ).bestMatch
            : questions[answers.length].question}
        </h1>

        {answers.length >= questions.length
          ? null
          : questions.map((x, i) =>
              answers.length + 1 > i ? (
                <Deck
                  onSelect={(i) => {
                    setTimeout(() => setAnswers((j) => [...j, i]), delay);
                  }}
                  cards={x.answers}
                />
              ) : null,
            )}
      </div>
    </>
  );
}
