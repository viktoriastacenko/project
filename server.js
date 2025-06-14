const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Указываем Express обслуживать статические файлы из папки проекта
app.use(express.static(path.join(__dirname)));

// Маршруты для всех HTML-страниц
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/traditions', (req, res) => {
  res.sendFile(path.join(__dirname, 'traditions.html'));
});

app.get('/holidays', (req, res) => {
  res.sendFile(path.join(__dirname, 'holidays.html'));
});

app.get('/costumes', (req, res) => {
  res.sendFile(path.join(__dirname, 'costumes.html'));
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});