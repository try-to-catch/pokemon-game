import Pokemon from "./pokemon.js";
import random from "./utils.js";
import { pokemons } from "./pokemons.js";

const pikachu = pokemons.find((item) => item.name === "Pikachu");
const player1 = new Pokemon({
  ...pokemons[random(0, pokemons.length) - 1],
  selectors: "player1",
});

const Charmander = pokemons.find((item) => item.name === "Charmander");
const player2 = new Pokemon({
  ...pokemons[random(0, pokemons.length) - 1],
  selectors: "player2",
});

const $control = document.querySelector(".control");
player1.attacks.forEach((item) => assignButton(item, true));

player2.attacks.forEach((item) => assignButton(item, false));

const $logs = document.querySelector("#logs");

const init = () => {
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

function clickCounterFunc(leftClicks) {
  return function () {
    leftClicks -= 1;
    return leftClicks;
  };
}

function assignButton(item, isPlayer1 = true) {
  console.log(item.name);
  const $btn = document.createElement("button");
  $btn.classList.add("button");
  const pn = isPlayer1 ? "(P1)" : "(P2)";
  $btn.innerText = item.name + pn;
  $control.appendChild($btn);

  let character = player1;
  let enemy = player2;
  if (!isPlayer1) {
    character = player2;
    enemy = player1;
  }

  const btnCount = clickCounterFunc(item.maxCount, $btn);
  $btn.addEventListener("click", () => {
    if (btnCount() > 0) {
      if (character.hp.current === 0) {
        $btn.disabled = true;
        return;
      }

      const crHP = enemy.changeHP(
        random(item.maxDamage, item.minDamage),
        (count) => {
          const $p = document.createElement("p");
          $p.innerText = generateLog(enemy, character, count);
          $logs.appendChild($p);
        }
      );

      if (crHP === 0) {
        alert("Бедный " + enemy.name + " проиграл бой!");
      }
    }
  });
}

init();
