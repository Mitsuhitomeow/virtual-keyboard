// HTML STRUCTURE
// header

const HEADER = document.createElement('header');
const headerTitle = document.createElement('h1');

HEADER.classList.add('header');
headerTitle.classList.add('header-title');

HEADER.appendChild(headerTitle);
document.body.appendChild(HEADER);

headerTitle.textContent = 'RSS виртуальная клавиатура';

// main

const MAIN = document.createElement('main');
const textSection = document.createElement('section');
const textArea = document.createElement('textarea');
const keyboardSection = document.createElement('section');

MAIN.classList.add('main');
textSection.classList.add('main-text');
textArea.classList.add('main-text__textarea');
keyboardSection.classList.add('main-keyboard');

document.body.appendChild(MAIN);
MAIN.appendChild(textSection);
MAIN.appendChild(keyboardSection);
textSection.appendChild(textArea);

// footer

const FOOTER = document.createElement('footer');
const footerSection = document.createElement('section');
const opSysInfoText = document.createElement('span');
const switchInfo = document.createElement('span');

FOOTER.classList.add('footer');
footerSection.classList.add('footer-info');
opSysInfoText.classList.add('footer-info__span');
switchInfo.classList.add('footer-info__span');

document.body.appendChild(FOOTER);
FOOTER.appendChild(footerSection);
footerSection.appendChild(opSysInfoText);
footerSection.appendChild(switchInfo);

opSysInfoText.textContent = 'Клавиатура создана в операционной системе Windows';
switchInfo.textContent = 'Для переключения языка комбинация: левыe Ctrl + Shift';

// Извлечение данных клавиш (from keys.json)

fetch('./keys.json')
  .then((response) => response.json())
  .then((data) => {
    const { KEYS } = data;

    KEYS.forEach((element) => {
      const KEY = document.createElement('div');
      const KEY_ENG = document.createElement('span');
      const KEY_RU = document.createElement('span');
      const KEY_ENG_TO_UPPER = document.createElement('span');
      const KEY_RU_TO_UPPER = document.createElement('span');

      KEY.classList.add('main-keyboard__key');
      KEY.classList.add(`${element.code}`);
      KEY_ENG.classList.add('key-eng');
      KEY_RU.classList.add('key-ru');
      KEY_ENG_TO_UPPER.classList.add('key-eng__toUpperCase');
      KEY_RU_TO_UPPER.classList.add('key-ru__toUpperCase');

      KEY_ENG_TO_UPPER.classList.add('hidden');
      KEY_RU_TO_UPPER.classList.add('hidden');
      KEY_RU.classList.add('hidden'); // СКРЫВАЕТ РУССКИЕ БУКВЫ

      keyboardSection.appendChild(KEY);
      KEY.appendChild(KEY_ENG);
      KEY.appendChild(KEY_RU);
      KEY.appendChild(KEY_ENG_TO_UPPER);
      KEY.appendChild(KEY_RU_TO_UPPER);

      KEY_ENG.textContent = element.labelEng;
      KEY_RU.textContent = element.labelRu;
      KEY_ENG_TO_UPPER.textContent = element.labelEng.toUpperCase();
      KEY_RU_TO_UPPER.textContent = element.labelRu.toUpperCase();

      // document.onkeypress = function (event) {
      //   console.log(event.keyCode);
      //   console.log(event.key)
      //   console.log(event.code)
      //   if(event.keycode === 96) {
      //     textArea.value += element.key
      //   }
      // }

      // document.onkeypress = function (event) {

      //   if (event.keycode === 20) {
      //     KEY.classList.add('active')
      //   }
      // }

      // добавляем событие на клавиши:
      // 1.(по клику на клавишу, должеен происходить ввод текста клавиши)
      // 2.(по клику на уникальную клавишу, должна происходить уникальная функциональность)

      KEY.addEventListener('click', () => {
        textArea.value += element.key;

        if (element.mod === 'unique') {
          KEY.classList.toggle('active');
        }

        // при нажатии на "Backspace" удаляет последний символ.
        if (element.code === 'Backspace') {
          const slicedLast = textArea.value;
          textArea.value = slicedLast.slice(0, -1);
        }

        // при нажатии на "Space" или "Tab" делает пробел.
        if (element.code === 'Space' || element.code === 'Tab') {
          textArea.value += ' ';
        }

        // При нажатии на "Enter" осуществляется перенос строки.
        if (element.code === 'Enter') {
          textArea.value += '\n';
        }
      });

      return element;
    });

    // Добавил события клавиш их функционал и класс "active" (анимацию)
    document.addEventListener('keydown', (event) => {
      // console.log(event.keyCode);
      event.preventDefault();

      // все клавиши что соответствуют данным из json, выводятся в "textarea"
      KEYS.forEach((element) => {
        if (event.key === element.key) {
          textArea.value += event.key;
        }
      });

      // при нажатии вешаю класс с подсвечиванием клавиши кроме "CapsLock"
      KEYS.forEach((element) => {
        if (event.code === element.code && event.keyCode !== 20) {
          const KEY = document.querySelector(`.${element.code}`);
          KEY.classList.add('active');
        }
      });

      // При нажатии на "CapsLock" вешается класс active (включается подсветка клавиши)
      // повторное нажатие убирает класс и выключает подсветку.
      if (event.keyCode === 20) {
        const KEY_CAPS = document.querySelector('.CapsLock');
        KEY_CAPS.classList.toggle('active');
      }

      // при нажатии на "Space" или "Tab" делает отступ.
      if (event.keyCode === 32 || event.code === 'Tab') {
        textArea.value += ' ';
      }

      // при нажатии на "Backspace" удаляет последний символ.
      if (event.keyCode === 8) {
        const lastSliced = textArea.value;
        textArea.value = lastSliced.slice(0, -1);
      }

      // При нажатии на "Enter" осуществляется перенос строки.
      if (event.code === 'Enter') {
        textArea.value += '\n';
      }
    });

    // Убираем класс "active" при отжатии клавиши (клавиша становится по умолчанию)
    document.addEventListener('keyup', (event) => {
      KEYS.forEach((element) => {
        if (event.code === element.code && event.keyCode !== 20) {
          const KEY = document.querySelector(`.${element.code}`);
          KEY.classList.remove('active');
        }
      });
    });
  })
  .catch((error) => console.error('Ошибка данных', error));
