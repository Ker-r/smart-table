import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                    // Получаем ключи из объекта
        .forEach((elementName) => {                        // Перебираем по именам
            elements[elementName].append(                    // в каждый элемент добавляем опции
                ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                        .map(name => {                        // используйте name как значение и текстовое содержимое
                            const option = document.createElement('option');// @todo: создать и вернуть тег опции
                            option.value = name;      // значение опции
                            option.textContent = name; // текст для пользователя
                            return option;
                        })
            )
        })
    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const fieldName = action.dataset.field; // например "date"
            
            // 1. Находим форму, к которой принадлежит кнопка
            //    action.form - автоматическое свойство кнопки внутри формы!
            if (action.form) {
                // 2. Находим поле внутри этой формы
                const input = action.form.querySelector(`[name="${fieldName}"]`);
                if (input) {
                    input.value = '';
                    state[fieldName] = '';
                }
            }
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}