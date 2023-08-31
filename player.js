class Player {
  constructor() {
    this.playerOBJ = document.querySelector('#player');
    this.hp = 3;
    this.speed = 16;
    this.posX = 0;
    this.posY = 640;
    this.spawn();
  }

  spawn() {
    this.stats = {
      playerOBJ: this.playerOBJ,
      hp: this.hp,
      speed: this.speed,
      posX: this.posX,
      posY: this.posY,
    };
  }

  moveX(move) {
    let gameWindow = document.querySelector('.game-container');

    this.posX =
      parseInt(this.playerOBJ.style.left) || gameWindow.offsetWidth / 2;
    const newPosition = this.posX + move;

    if (newPosition < 30) {
      this.posX = 30; // Set the position to the left boundary
    } else if (newPosition > gameWindow.offsetWidth - 40) {
      this.posX = gameWindow.offsetWidth - 40; // Set the position to the left boundary
    } else {
      this.posX = newPosition; // No collision, update the position
    }

    // Update the style
    this.playerOBJ.style.left = this.posX + 'px';
  }
}
