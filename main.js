const $btn = document.getElementById("btn-kick");
const $btn1 = document.getElementById("btn-kick1");
const character = {
  name: "Pikachu",
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById("health-character"),
  elProgressbar: document.getElementById("progressbar-character"),
  renderHP: renderHP,
  changeHP: changeHP,
  renderHPLife: renderHPLife,
  renderProgressbarHP: renderProgressbarHP,
};

const enemy = {
  name: "Charmander",
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById("health-enemy"),
  elProgressbar: document.getElementById("progressbar-enemy"),
  renderHP: renderHP,
  changeHP: changeHP,
  renderHPLife: renderHPLife,
  renderProgressbarHP: renderProgressbarHP,
};

function init() {
  $btn.addEventListener("click", function () {
    console.log("Kick");
    character.changeHP(random(20));
    enemy.changeHP(random(20));
  });

  $btn1.addEventListener("click", function () {
    enemy.changeHP(random(20));
  });

  console.log("Start Game!");

  character.renderHP(character);
  enemy.renderHP(enemy);
}

function renderHP() {
  this.renderHPLife();
  this.renderProgressbarHP();
}

function renderHPLife() {
  this.elHP.innerText = this.damageHP + " / " + this.defaultHP;
}

function renderProgressbarHP() {
  this.elProgressbar.style.width = this.damageHP + "%";
}

function changeHP(count) {
  if (this.damageHP < count) {
    this.damageHP = 0;
    this.renderHP(this);
    $btn.disabled = true;
    $btn1.disabled = true;

    setTimeout(() => {
      alert("Бедный " + this.name + " проиграл бой!");
    }, 0);
    return;
  }

  this.damageHP -= count;
  this.renderHP();
}

function random(num) {
  return Math.ceil(Math.random() * num);
}

init();
