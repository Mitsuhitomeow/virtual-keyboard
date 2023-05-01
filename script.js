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
const opSysInfoText = document.createElement('p');
const switchInfo = document.createElement('p');

FOOTER.classList.add('footer');
footerSection.classList.add('footer-info');
opSysInfoText.classList.add('footer-info__p');
switchInfo.classList.add('footer-info__p');

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
      const KEY_ENG_TO_SHIFT = document.createElement('span');
      const KEY_RU_TO_SHIFT = document.createElement('span');

      KEY.classList.add('main-keyboard__key');
      KEY.classList.add(`${element.code}`);
      KEY_ENG.classList.add('key-eng');
      KEY_RU.classList.add('key-ru');
      KEY_ENG_TO_UPPER.classList.add('key-eng__toUpperCase');
      KEY_RU_TO_UPPER.classList.add('key-ru__toUpperCase');
      KEY_ENG_TO_SHIFT.classList.add('key-eng__Shift');
      KEY_RU_TO_SHIFT.classList.add('key-ru__Shift');

      KEY_ENG_TO_SHIFT.classList.add('hidden');
      KEY_RU_TO_SHIFT.classList.add('hidden');
      KEY_ENG_TO_UPPER.classList.add('hidden');
      KEY_RU_TO_UPPER.classList.add('hidden');
      KEY_RU.classList.add('hidden'); // СКРЫВАЕТ РУССКИЕ БУКВЫ

      keyboardSection.appendChild(KEY);
      KEY.appendChild(KEY_ENG);
      KEY.appendChild(KEY_RU);
      KEY.appendChild(KEY_ENG_TO_UPPER);
      KEY.appendChild(KEY_RU_TO_UPPER);
      KEY.appendChild(KEY_ENG_TO_SHIFT);
      KEY.appendChild(KEY_RU_TO_SHIFT);

      KEY_ENG.textContent = element.labelEng;
      KEY_RU.textContent = element.labelRu;
      KEY_ENG_TO_UPPER.textContent = element.engCaps;
      KEY_RU_TO_UPPER.textContent = element.ruCaps;
      KEY_ENG_TO_SHIFT.textContent = element.engShift;
      KEY_RU_TO_SHIFT.textContent = element.ruShift;

      // добавляем событие на клавиши:
      // 1.(по клику на клавишу, должеен происходить ввод текста клавиши)
      // 2.(по клику на уникальную клавишу, должна происходить уникальная функциональность)

      // При нажатии на "CapsLock" клавиши преходят в верхний регистр,
      /*
      *   при нажатии на клавиши с буквами, выводятся на текстовое поле
      *   если "CapsLock" активен, буквы меняют регистр.
      */
      KEY.addEventListener('click', () => {
        const KEY_CAPS = document.querySelector('.CapsLock');

        if (
          element.code !== 'Enter'
          && element.code !== 'Backspace'
          && element.code !== 'Delete'
          && element.code !== 'Tab'
          && element.code !== 'ShiftLeft'
          && element.code !== 'ShiftRight'
          && element.code !== 'ControlLeft'
          && element.code !== 'ControlRight'
          && element.code !== 'AltLeft'
          && element.code !== 'AltRight'
          && element.code !== 'ArrowUp'
          && element.code !== 'ArrowDown'
          && element.code !== 'ArrowLeft'
          && element.code !== 'ArrowRight'
          && element.code !== 'CapsLock'
          && element.code !== 'MetaLeft'
          && !KEY_CAPS.classList.contains('active')
        ) {
          textArea.value += element.labelEng;
        } else if (
          element.code !== 'Enter'
          && element.code !== 'Backspace'
          && element.code !== 'Delete'
          && element.code !== 'Tab'
          && element.code !== 'ShiftLeft'
          && element.code !== 'ShiftRight'
          && element.code !== 'ControlLeft'
          && element.code !== 'ControlRight'
          && element.code !== 'AltLeft'
          && element.code !== 'AltRight'
          && element.code !== 'ArrowUp'
          && element.code !== 'ArrowDown'
          && element.code !== 'ArrowLeft'
          && element.code !== 'ArrowRight'
          && element.code !== 'CapsLock'
          && element.code !== 'MetaLeft'
          && KEY_CAPS.classList.contains('active')
        ) {
          textArea.value += element.engCaps;
        }

        if (element.keyCode === 20) {
          KEY_CAPS.classList.toggle('active');

          if (KEY_CAPS.classList.contains('active')) {
            const KEY_ENG_CAPS_CLICK = document.querySelectorAll('.key-eng__toUpperCase');
            const KEY_ENG_CLICK = document.querySelectorAll('.key-eng');

            KEY_ENG_CAPS_CLICK.forEach((key) => key.classList.remove('hidden'));
            KEY_ENG_CLICK.forEach((key) => key.classList.add('hidden'));
          }

          if (!KEY_CAPS.classList.contains('active')) {
            const KEY_ENG_CAPS_CLICK = document.querySelectorAll('.key-eng__toUpperCase');
            const KEY_ENG_CLICK = document.querySelectorAll('.key-eng');

            KEY_ENG_CAPS_CLICK.forEach((key) => key.classList.add('hidden'));
            KEY_ENG_CLICK.forEach((key) => key.classList.remove('hidden'));
          }
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
    });

    // Добавил события клавиш их функционал и класс "active" (анимацию)
    document.addEventListener('keydown', (event) => {
      // console.log(event.key);
      event.preventDefault();

      // При нажатии на "CapsLock" клавиши преходят в верхний регистр,
      /*
      *   при нажатии на клавиши с буквами, выводятся на текстовое поле
      *   если "CapsLock" активен, буквы меняют регистр.
      */
      KEYS.forEach((element) => {
        const KEY_CAPS = document.querySelector('.CapsLock');

        if (event.key === element.labelEng
          && event.code !== 'Enter'
          && event.code !== 'Backspace'
          && event.code !== 'Delete'
          && event.code !== 'Tab'
          && event.code !== 'ShiftLeft'
          && event.code !== 'ShiftRight'
          && event.code !== 'ControlLeft'
          && event.code !== 'ControlRight'
          && event.code !== 'AltLeft'
          && event.code !== 'AltRight'
          && event.code !== 'ArrowUp'
          && event.code !== 'ArrowDown'
          && event.code !== 'ArrowLeft'
          && event.code !== 'ArrowRight'
          && event.code !== 'CapsLock'
          && event.code !== 'MetaLeft'
        ) {
          textArea.value += element.labelEng;
        } else if (event.key === element.engCaps
          && event.code !== 'Enter'
          && event.code !== 'Backspace'
          && event.code !== 'Delete'
          && event.code !== 'Tab'
          && event.code !== 'ShiftLeft'
          && event.code !== 'ShiftRight'
          && event.code !== 'ControlLeft'
          && event.code !== 'ControlRight'
          && event.code !== 'AltLeft'
          && event.code !== 'AltRight'
          && event.code !== 'ArrowUp'
          && event.code !== 'ArrowDown'
          && event.code !== 'ArrowLeft'
          && event.code !== 'ArrowRight'
          && event.code !== 'CapsLock'
          && event.code !== 'MetaLeft'
          && KEY_CAPS.classList.contains('active')
        ) {
          textArea.value += element.engCaps;
        }

        if (event.code === element.code && event.keyCode !== 20) {
          const KEY = document.querySelector(`.${element.code}`);
          KEY.classList.add('active');
        }
      });

      if (event.keyCode === 20) {
        const KEY_CAPS = document.querySelector('.CapsLock');
        KEY_CAPS.classList.toggle('active');

        if (KEY_CAPS.classList.contains('active')) {
          const KEY_ENG_CAPS = document.querySelectorAll('.key-eng__toUpperCase');
          const KEY_ENG = document.querySelectorAll('.key-eng');

          KEY_ENG_CAPS.forEach((element) => element.classList.remove('hidden'));
          KEY_ENG.forEach((element) => element.classList.add('hidden'));
        }

        if (!KEY_CAPS.classList.contains('active')) {
          const KEY_ENG_CAPS = document.querySelectorAll('.key-eng__toUpperCase');
          const KEY_ENG = document.querySelectorAll('.key-eng');

          KEY_ENG_CAPS.forEach((element) => element.classList.add('hidden'));
          KEY_ENG.forEach((element) => element.classList.remove('hidden'));
        }
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
  });
