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
switchInfo.textContent = 'Для переключения языка комбинация: левыe ctrl + alt';

// EXTRACTING KEY DATA (from keys.json)

fetch('./keys.json')
  .then((response) => response.json())
  .then((data) => {
    const { keys } = data;

    keys.map((element) => {
      const key = document.createElement('div');

      // добавили событие на клавиши (по клику на клавишу,
      // происходит ввод текста клавиши)

      key.addEventListener('click', () => {
        textArea.value += element.key

        // при нажатии на "Backspace" удаляет последний символ.
        if (element.code == 'Backspace') {
          let slicedLast = textArea.value
          textArea.value = slicedLast.slice(0, -1)
        }

        // при нажатии на "Space" делает пробел.
        if (element.code == 'Space') {
          textArea.value += ' ';
        }
      })

      key.classList.add('main-keyboard__key');
      key.classList.add(`${element.code}`);

      keyboardSection.appendChild(key);

      key.textContent = element.label;
      return element;
    });
  })
  .catch((error) => console.error('Ошибка данных', error));
