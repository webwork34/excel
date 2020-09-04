export class Emiter {
  constructor() {
    this.listeners = {};
  }

  // dispatch, fire, trigger
  // уведомляем слушателей, если они есть
  // в переменную args - заберем все остальные пар-ры, которые передаем
  // table.emit('table:select', {a: 1})
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach(listener => {
      listener(...args);
    });
    return true;
  }

  // on, listen
  // подписываемся на уведомление либо добавляем нового слушателя
  // formula.subscribe('table:select', () => {})
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listener => listener !== fn);
    };
  }
}

// const emiter = new Emiter();
// emiter.subscribe('anyEvent', data => console.log('Sub', data));
// emiter.emit('anyEvent', 42);
