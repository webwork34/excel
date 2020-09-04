import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emiter = options.emiter;
    this.unsubscribers = [];

    this.prepare();
  }

  // Настраиваем наш ком-т до init
  prepare() {}  

  // возвращает шаблон компонента
  toHTML() {
    return '';
  }

  // Уведомляем слушателей о событии event
  $emit(event, ...args) {
    this.emiter.emit(event, ...args);
  }
 
  // Подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emiter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  // Инициализируем ком-т, добавляем DOM слушатели
  init() {
    this.initDOMListeners();
  }

  // Удаляем ком-т, чистим слушатели
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }
}
