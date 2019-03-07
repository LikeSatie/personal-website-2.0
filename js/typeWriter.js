const typeWriter = function(txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

typeWriter.prototype.type = function() {
  // Текущий индекс слова в массиве
  const current = this.wordIndex % this.words.length;
  // Получение полного текста текущего слова
  const fullTxt = this.words[current];
  // Проверка на удаление
  if (this.isDeleting) {
    // Удаление буквы
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    // Добавление буквы
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // Вставка текста в элемент
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  // Изначальная скорость печати
  let typeSpeed = 300;

  if (this.isDeleting) {
    typeSpeed /= 3;
  }

  // Проверка на завершение печати
  if (!this.isDeleting && this.txt === fullTxt) {
    // Добавление паузы по окончанию печати
    typeSpeed = this.wait;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    // Переключение на следующее слово в массиве
    this.wordIndex++;
    // Пауза перед печатью
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};

// Инициализация по окончанию формирования документа
document.addEventListener('DOMContentLoaded', init);

// Запуск программы
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Запуск эффекта пищущей машинки
  new typeWriter(txtElement, words, wait);
}
