document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  menuToggle.setAttribute('aria-expanded', 'false');

  menuToggle.addEventListener('click', () => {
    const isActive = menu.classList.contains('active');
    if (isActive) {
      menu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    } else {
      menu.classList.add('active');
      menuToggle.setAttribute('aria-expanded', 'true');
    }
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Cerrar menú si clic fuera del menú y botón
  document.addEventListener('click', (e) => {
    if (menu.classList.contains('active') &&
        !menu.contains(e.target) &&
        e.target !== menuToggle) {
      menu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Calendario funcional
  const calendarEl = document.getElementById('calendar');
  if (calendarEl) {
    const year = 2025;
    const month = 8; // Septiembre (0-based: 0=Enero)
    const eventDays = [7]; // días con evento

    function createCalendar(year, month, eventDays) {
      const date = new Date(year, month, 1);
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const startDay = date.getDay(); // 0=Domingo ... 6=Sábado

      const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

      let html = '<table><thead><tr>';
      dayNames.forEach(day => {
        html += `<th>${day}</th>`;
      });
      html += '</tr></thead><tbody><tr>';

      // Espacios vacíos antes del primer día
      let dayOfWeek = startDay === 0 ? 7 : startDay; // Domingo al final
      for (let i = 1; i < dayOfWeek; i++) {
        html += '<td></td>';
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const isEvent = eventDays.includes(day);
        html += `<td class="${isEvent ? 'evento' : ''}">${day}</td>`;
        if ((day + dayOfWeek - 1) % 7 === 0 && day !== daysInMonth) {
          html += '</tr><tr>';
        }
      }

      // Espacios vacíos al final
      const totalCells = daysInMonth + dayOfWeek - 1;
      const emptyCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
      for (let i = 0; i < emptyCells; i++) {
        html += '<td></td>';
      }

      html += '</tr></tbody></table>';
      return html;
    }

    calendarEl.innerHTML = createCalendar(year, month, eventDays);
  }
});
