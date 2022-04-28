export default class Gallery {
  constructor(container) {
    this.container = container;
    this.form = this.container.querySelector('#form');
    this.collection = this.container.querySelector('#view');
    this.errorMessage = this.form.querySelector('.form__error');

    this.registerEvents();
  }

  /**
   * Регистрирует обработчики событий
   */
  registerEvents() {
    const urlInput = this.form.querySelector('#url');
    this.form.addEventListener('submit', this.onSubmit.bind(this));
    this.collection.addEventListener('click', Gallery.remove);
    urlInput.addEventListener('focus', this.removeError.bind(this));
  }

  /**
   * Обработчик события
   * @param {*} event - Event
   */
  onSubmit(event) {
    event.preventDefault();
    const data = Array.from(this.form.elements)
      .filter((item) => item.name !== '')
      .map((element) => {
        const { name, value } = element;
        return { name, value };
      });
    this.renderElement(data);
  }

  /**
   * Создает элемент и добавляет при загрузке изображения
   * @param {*} data - массив объектов данных формы
   */
  renderElement(data) {
    const { value: description } = data.find((item) => item.name === 'name');
    const { value: url } = data.find((item) => item.name === 'url');

    const viewItem = document.createElement('div');
    viewItem.classList.add('view__item');

    const viewItemImages = document.createElement('div');
    viewItemImages.classList.add('view__item-images');

    const img = document.createElement('img');
    img.src = url;
    img.alt = description;

    const viewItemInfo = document.createElement('p');
    viewItemInfo.classList.add('view__item-info');
    viewItemInfo.textContent = description;

    const viewItemRemove = document.createElement('button');
    viewItemRemove.classList.add('view__item-remove');

    viewItemImages.append(img);
    viewItem.append(viewItemImages);
    viewItem.append(viewItemInfo);
    viewItem.append(viewItemRemove);

    img.onload = () => {
      this.collection.append(viewItem);
      this.form.reset();
    };
    img.onerror = this.showError.bind(this);
  }

  /**
   * Удаляет элемент
   * @param {*} event  - Event
   */
  static remove(event) {
    const element = event.target;
    if (element.classList.contains('view__item-remove')) {
      element.closest('.view__item').remove();
    }
  }

  /**
   * ПОказывает сообщение об ошибке
   */
  showError() {
    this.errorMessage.classList.add('form__error-active');
  }

  /**
   * Удаляет сообщение об ошибке
   */
  removeError() {
    if (this.errorMessage.classList.contains('form__error-active')) {
      this.errorMessage.classList.remove('form__error-active');
    }
  }
}
