const $btn = document.getElementById("btn-kick");
const $btn1 = document.getElementById("btn-kick1");
const character = {
  name: "Pikachu",
  type: "electric",
  weakness: ["fighting", "water", "some"],
  resistance: ["steel"],
  hp: {
    current: 100,
    total: 100,
  },
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
  type: "electric",
  weakness: ["fighting", "water", "some"],
  resistance: ["steel"],
  hp: {
    current: 100,
    total: 100,
  },
  damageHP: 100,
  elHP: document.getElementById("health-enemy"),
  elProgressbar: document.getElementById("progressbar-enemy"),
  renderHP: renderHP,
  changeHP: changeHP,
  renderHPLife: renderHPLife,
  renderProgressbarHP: renderProgressbarHP,
};

const init = () => {
  let clickCount = 6;

  $btn.innerText = `Thunder Jolt (${clickCount})`;
  $btn1.innerText = `Thunder Jolt (${clickCount})`;

  const clickCounter1 = clickCounterFunc(clickCount);
  const clickCounter2 = clickCounterFunc(clickCount);

  $btn.addEventListener("click", () => {
    clicksLeft1 = clickCounter1();
    if (clicksLeft1 > 0) {
      console.log("Kick");
      character.changeHP(random(20));
      enemy.changeHP(random(20));
      $btn.innerText = `Thunder Jolt (${clicksLeft1 - 1})`;
    }
  });

  $btn1.addEventListener("click", () => {
    clicksLeft2 = clickCounter2();
    if (clicksLeft2 > 0) {
      enemy.changeHP(random(20));
      $btn1.innerText = `Thunder Jolt (${clicksLeft2 - 1})`;
    }
  });

  console.log("Start Game!");

  character.renderHP(character);
  enemy.renderHP(enemy);
};

function renderHP() {
  this.renderHPLife();
  this.renderProgressbarHP();
}

function renderHPLife() {
  this.elHP.innerText = this.hp.current + " / " + this.hp.total;
}

function renderProgressbarHP() {
  this.elProgressbar.style.width = this.hp.current + "%";
}

const $logs = document.querySelector("#logs");

function changeHP(count) {
  this.hp.current -= count;

  const log =
    this === enemy
      ? generateLog(this, character, count)
      : generateLog(this, enemy, count);

  const $p = document.createElement("p");
  $p.innerText = log;
  $logs.appendChild($p);

  if (this.hp.current <= 0) {
    this.hp.current = 0;
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

const random = (num) => {
  return Math.ceil(Math.random() * num);
};

const generateLog = (firstPerson, secondPerson, count) => {
  const logs = [
    `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага. -${count}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
    `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага. -${count}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
    `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил. -${count}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
    `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар. -${count}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
    `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника. -${count}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
    `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар. -${count}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
    `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар. -${count}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
    `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника. -${count}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
    `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника. -${count}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
    `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику. -${count}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
  ];

  return logs[random(logs.length) - 1];
};

const clickCounterFunc = (leftClicks) => {
  return function () {
    leftClicks -= 1;
    return leftClicks;
  };
};

init();
