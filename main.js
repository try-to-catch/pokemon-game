import Pokemon from "./pokemon.js";
import random from "./utils.js";

const player1 = new Pokemon({
  name: "Pikachu",
  type: "electric",
  hp: 500,
  selectors: "character",
});

const player2 = new Pokemon({
  name: "Charmander",
  type: "fire",
  hp: 450,
  selectors: "enemy",
});

const $btn = document.getElementById("btn-kick");
const $btn1 = document.getElementById("btn-kick1");
const $logs = document.querySelector("#logs");

const clickCount1 = 6;
const clickCount2 = 6;

const init = () => {
  $btn.innerText = `Thunder Jolt (${clickCount1})`;
  $btn1.innerText = `Thunder Jolt (${clickCount2})`;

  $btn.addEventListener("click", function () {
    if (clickCount1 > 0) {
      player1.changeHP(random(60, 20), function (count) {
        console.log("Some change after change HP", count);
        console.log(generateLog(player1, player2, count));

        const $p = document.createElement("p");
        $p.innerText = generateLog(player1, player2, count);
        $logs.appendChild($p);
      });

      player2.changeHP(random(60, 20), function (count) {
        console.log("Some change after change HP", count);
        console.log(generateLog(player2, player1, count));

        const $p = document.createElement("p");
        $p.innerText = generateLog(player2, player1, count);
        $logs.appendChild($p);
      });

      $btn.innerText = `Thunder Jolt (${clickCounter1()})`;
    }
  });

  $btn1.addEventListener("click", function () {
    if (clickCount2 > 0) {
      player2.changeHP(random(60, 20), function (count) {
        console.log("Some change after change HP", count);
        console.log(generateLog(player2, player1, count));

        const $p = document.createElement("p");
        $p.innerText = generateLog(player2, player1, count);
        $logs.appendChild($p);
      });
      $btn1.innerText = `Thunder Jolt (${clickCounter2()})`;
    }
  });

  console.log("Start Game!");
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

const clickCounter1 = clickCounterFunc(clickCount1);
const clickCounter2 = clickCounterFunc(clickCount2);

init();
