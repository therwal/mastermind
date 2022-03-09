const colorButtons = document.querySelectorAll('.color-selector > div');
const selectedColor = document.querySelectorAll('.selected-colors > div');
const guesses = document.querySelector('.guesses');
const guessButton = document.querySelector('button');

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

let selected = 0;
let guess = [];
let solution = [];

function generateSolution() {
  for (let i = 0; i < 4; i++) {
    solution[i] = colors[Math.floor(Math.random() * 6)];
  }
}

for (b of colorButtons) {
  b.addEventListener('click', (e) => {
    let color = e.target.classList[1];

    selectedColor[selected].classList.remove(
      'red',
      'orange',
      'yellow',
      'green',
      'blue',
      'purple'
    );
    selectedColor[selected].classList.add(color);

    selectedColor[selected].classList.toggle('selected');

    guess[selected] = color;

    if (selected < 3) {
      selected++;
    } else {
      selected = 0;
    }
    selectedColor[selected].classList.toggle('selected');
  });
}

for (s of selectedColor) {
  s.addEventListener('click', (e) => {
    selectedColor[selected].classList.remove('selected');
    e.target.classList.toggle('selected');
    selected = e.target.id;
  });
}

guessButton.addEventListener('click', (e) => {
  const guessContainer = document.createElement('div');
  guessContainer.classList.add('guess-container');

  const colors = document.createElement('div');
  colors.classList.add('guess-colors');

  for (n of guess) {
    let v = document.createElement('div');
    v.classList.add('circle', n);
    colors.appendChild(v);
  }

  guessContainer.appendChild(colors);

  const [pos, col] = checkSolution();
  let correct = document.createElement('p');
  correct.innerText = `Correct position: ${pos} | Correct colors: ${col}`;
  guessContainer.appendChild(correct);

  guesses.prepend(guessContainer);
});

function checkSolution() {
  let corPos = 0;
  let corCol = 0;

  let c1 = [...guess];
  let c2 = [...solution];

  for (let i = 0; i < 4; i++) {
    if (c1[i] === c2[i]) {
      corPos++;
      c1[i] = 'x';
      c2[i] = 'y';
    }
  }
  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4; y++) {
      if (c1[x] === c2[y]) {
        corCol++;
        c1[x] = 'x';
        c2[y] = 'y';
      }
    }
  }

  return [corPos, corCol];
}

generateSolution();
