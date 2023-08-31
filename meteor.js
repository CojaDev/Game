class Meteor {
  spawner = document.querySelector('.meteors');
  speed = Math.floor(Math.random() * (100 - 40 + 1)) + 40;
  spawnPosX = Math.floor(Math.random() * (680 - 20 + 1)) + 20;
  spawnDelay = Math.floor(Math.random() * (2100 - 10 + 1)) + 10;
  PosX = this.spawnPosX;
  PosY = -180;

  spawn() {
    const meteor = document.createElement('div');
    meteor.classList.add('meteor');
    meteor.style.left = this.spawnPosX + 'px';
    if (this.speed < 60) {
      meteor.style.backgroundImage = " url('img/meteor.png')";
    }
    meteor.style.top = '-180px';
    this.spawner.appendChild(meteor);
    this.meteorFall(meteor);
  }

  meteorFall(meteor) {
    let topValue = -180;

    let timerInterval = setInterval(() => {
      topValue += 10;
      meteor.style.top = topValue + 'px';
      this.PosY = parseInt(meteor.style.top);
      checkCollisions(meteor);
      if (topValue >= window.innerHeight + 400) {
        clearInterval(timerInterval);
        meteor.remove();
      }
    }, this.speed);
  }

  colisionCheck(meteor) {}
}
