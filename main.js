let player = new Player();
let gameEnded = false;
window.addEventListener('keydown', (event) => {
  let code = event.keyCode;

  playerPositionX = 0;
  switch (code) {
    case 37:
      if (gameEnded === false) {
        player.playerOBJ.style.transform =
          'translate(-50%, -50%) rotate(-5deg)';
        player.playerOBJ.addEventListener('transitionend', removeRotation);
        playerPositionX -= player.speed;
        player.moveX(playerPositionX);
      }
      break;
    case 39:
      if (gameEnded === false) {
        player.playerOBJ.style.transform = 'translate(-50%, -50%) rotate(5deg)';
        player.playerOBJ.addEventListener('transitionend', removeRotation);
        playerPositionX += player.speed;
        player.moveX(playerPositionX);
      }
      break;
    default:
      player.playerOBJ.style.transform = 'translate(-50%, -50%) rotate(0deg)';
  }
});

function removeRotation() {
  player.playerOBJ.style.transform = 'translate(-50%, -50%) rotate(0deg)';
}

let minut = 0;
let sekunda = 0;
let TimerText = document.querySelector('.timer p');

function startTimer() {
  let timerInterval = setInterval(() => {
    if (minut < 10) {
      TimerText.innerText = `0${minut}:${sekunda < 10 ? '0' : ''}${sekunda}`;
    } else {
      TimerText.innerText = `${minut}:${sekunda < 10 ? '0' : ''}${sekunda}`;
    }

    sekunda++;
    if (sekunda === 60) {
      sekunda = 0;
      minut++;
    }
    if (gameEnded === true) {
      clearInterval(timerInterval);
    }
  }, 1000);
}
startTimer();
let health = 3;
async function healthCheck(health) {
  let healths = document.querySelector('.health');
  let audio = document.querySelector(`audio[data-key="1"]`);

  if (health === 3) {
    healths.classList.add('health-3');
  } else if (health === 2) {
    healths.classList.add('health-2');
    player.playerOBJ.style.backgroundImage = "url('img/playerdmg2.png')";
    audio.currentTime = 0;
    audio.play();
  } else if (health === 1) {
    player.playerOBJ.style.backgroundImage = "url('img/playerdmg0.png')";
    audio.currentTime = 0;
    audio.play();
    healths.classList.add('health-1');
  } else if (health === 0) {
    player.playerOBJ.style.backgroundImage = "url('img/playerdmg.png')";
    audio.currentTime = 0;
    audio.play();
    GameOver();
    healths.classList.add('health-0');
  }
  if (health < 0) {
    health = 0;
  }
}
healthCheck(player.hp);

function Spawner() {
  meteor = new Meteor();
  setInterval(() => {
    meteor = new Meteor();
    meteor.spawn();
  }, meteor.spawnDelay);
}
Spawner();

const meteorCollisionMap = new Map();

function checkCollisions(meteor) {
  if (meteorCollisionMap.has(meteor)) {
    return; // Collision already detected for this meteor, exit early
  }

  let gameWindow = document.querySelector('.game-container');
  let playerObj = document.querySelector('.player');

  const meteorRect = meteor.getBoundingClientRect();
  const meteorPosX = meteorRect.left + window.scrollX;
  const meteorPosY = meteorRect.top + window.scrollY;

  const playerRect = playerObj.getBoundingClientRect();
  const playerPosX = playerRect.left + window.scrollX;
  const playerPosY = playerRect.top + window.scrollY;

  if (
    meteorPosY + meteorRect.height - 10 >= playerPosY &&
    meteorPosY <= playerPosY + playerRect.height &&
    meteorPosX + meteorRect.width >= playerPosX &&
    meteorPosX <= playerPosX + playerRect.width
  ) {
    player.hp--;
    healthCheck(player.hp);
    meteorCollisionMap.set(meteor, true);
  }
}

let BestMinut = getCookie('bestMinut');
let bestSecond = getCookie('bestSecond');

// Check if the cookies don't exist or are not numeric
if (BestMinut === null || isNaN(BestMinut)) {
  // Set a default value for BestMinut (e.g., 0)
  BestMinut = 0;
  // Set the cookie with the default value
  setCookie('bestMinut', BestMinut);
}

if (bestSecond === null || isNaN(bestSecond)) {
  // Set a default value for bestSecond (e.g., 0)
  bestSecond = 0;
  // Set the cookie with the default value
  setCookie('bestSecond', bestSecond);
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(name, value) {
  const date = new Date();
  date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = name + '= ' + value + ';' + expires;
}

function GameOver() {
  if (minut > BestMinut) {
    BestMinut = minut;
    setCookie('bestMinut', BestMinut);
    if (sekunda > bestSecond) {
      bestSecond = sekunda;
      setCookie('bestSecond', bestSecond);
    }
  }
  if (sekunda > bestSecond) {
    bestSecond = sekunda;
    setCookie('bestSecond', bestSecond);
  }

  gameEnded = true;
  let overlay = document.querySelector('.gameover');
  overlay.style.display = 'block';

  let restart = overlay.querySelector('button');
  restart.addEventListener('click', () => {
    location.reload();
  });
  player.speed = 0;

  let time = overlay.querySelector('.time');
  if (minut < 10) {
    time.innerText = `You lasted: 0${minut}:${
      sekunda < 10 ? '0' : ''
    }${sekunda}`;
  } else {
    time.innerText = `You lasted: ${minut}:${
      sekunda < 10 ? '0' : ''
    }${sekunda}`;
  }

  let bestTime = document.querySelector('.bestTime');
  if (BestMinut < 10) {
    bestTime.innerText = `Your Best Time: 0${BestMinut}:${
      bestSecond < 10 ? '0' : ''
    }${bestSecond}`;
  } else {
    bestTime.innerText = `Your Best Time: ${BestMinut}:${
      bestSecond < 10 ? '0' : ''
    }${bestSecond}`;
  }
}
