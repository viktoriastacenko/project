document.addEventListener('DOMContentLoaded', function() {
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonthYear = document.getElementById('current-month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const holidayInfo = document.getElementById('holiday-info');

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // Русские праздники (день-месяц)
    const holidays = {
        '1-1': {
            title: 'Новый год',
            description: 'Главный праздник года, отмечаемый в ночь с 31 декабря на 1 января. Традиционно сопровождается украшением ёлки и праздничным застольем.'
        },
        '7-1': {
            title: 'Рождество Христово',
            description: 'Православное Рождество отмечается 7 января по юлианскому календарю. В этот день принято посещать церковную службу.'
        },
        '23-2': {
            title: 'День защитника Отечества',
            description: 'Праздник всех мужчин, первоначально установленный в честь создания Красной армии.'
        },
        '8-3': {
            title: 'Международный женский день',
            description: 'Праздник весны и внимания к женщинам, официальный выходной день в России.'
        },
        '1-5': {
            title: 'Праздник Весны и Труда',
            description: 'Традиционный праздник трудящихся, уходящий корнями в рабочее движение XIX века.'
        },
        '9-5': {
            title: 'День Победы',
            description: 'Священный праздник в честь победы в Великой Отечественной войне 1941-1945 годов.'
        },
        '12-6': {
            title: 'День России',
            description: 'Государственный праздник в честь принятия Декларации о государственном суверенитете РСФСР.'
        },
        '4-11': {
            title: 'День народного единства',
            description: 'Праздник в честь освобождения Москвы от польских интервентов в 1612 году.'
        }
    };

    // Отрисовка календаря
    function renderCalendar(month, year) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay() || 7; // 1-7 вместо 0-6

        currentMonthYear.textContent = `${getMonthName(month)} ${year}`;
        
        // Очищаем календарь, кроме дней недели
        while (calendarGrid.children.length > 7) {
            calendarGrid.removeChild(calendarGrid.lastChild);
        }

        // Пустые ячейки для дней предыдущего месяца
        for (let i = 1; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('calendar-day', 'empty');
            calendarGrid.appendChild(emptyDay);
        }

        // Дни текущего месяца
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.textContent = day;

            // Проверяем праздники
            const dateKey = `${day}-${month + 1}`;
            if (holidays[dateKey]) {
                dayElement.classList.add('holiday');
                dayElement.addEventListener('click', () => showHolidayInfo(holidays[dateKey]));
            }

            // Текущий день
            if (day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
                dayElement.classList.add('current-day');
            }

            calendarGrid.appendChild(dayElement);
        }
    }

    // Показать информацию о празднике
    function showHolidayInfo(holiday) {
        holidayInfo.innerHTML = `
            <h3>${holiday.title}</h3>
            <p>${holiday.description}</p>
        `;
    }

    // Название месяца по-русски
    function getMonthName(month) {
        const months = [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ];
        return months[month];
    }

    // Переключение месяцев
    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });

    // Инициализация
    renderCalendar(currentMonth, currentYear);
});