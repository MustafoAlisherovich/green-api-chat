# MAX Web Messenger Client (Интеграция с GREEN-API)

Упрощенный веб-клиент мессенджера, воссоздающий интерфейс **MAX Messenger**. Приложение разработано с использованием **React**, **Vite**, **Tailwind CSS** и **Shadcn UI**, а для отправки и получения сообщений в реальном времени используется **GREEN-API**.

## 🛠 Технологический стек

* **Frontend**: React (Vite)
* **Стилизация**: Tailwind CSS, Shadcn UI
* **Иконки**: Lucide React
* **HTTP-клиент**: Axios
* **API Провайдер**: GREEN-API (Шлюз WhatsApp/Telegram)

## 📦 Предварительные требования

Убедитесь, что на вашем компьютере установлены:

* **Node.js** (версия 18.0 или выше)
* **npm**
* Аккаунт и инстанс в **GREEN-API** (`idInstance` и `apiTokenInstance`) из [console.green-api.com](https://console.green-api.com/)

## ⚙️ Настройка GREEN-API

Перед запуском приложения настройте ваш инстанс в консоли разработчика GREEN-API:

1. Войдите в [Консоль GREEN-API](https://console.green-api.com/).
2. Выберите ваш инстанс.
3. В разделе **Настройки (Settings / Webhooks)**:
   * Включите параметр **`Уведомлять о входящих сообщениях и файлах` (`Receive webhooks on incoming messages and files`)**.
   * Сохраните изменения.

## 💻 Локальная установка и запуск

### 1. Клонирование репозитория

```bash
git clone https://github.com/MustafoAlisherovich/green-api-chat.git
cd green-api-chat
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Запуск сервера разработки

```bash
npm run dev
```

Откройте браузер и перейдите по адресу `http://localhost:5173`.

## 📖 Как пользоваться

1. **Авторизация**:
   * На стартовом экране введите ваши `idInstance` и `apiTokenInstance`.
2. **Создание чата**:
   * Нажмите кнопку **`+` (Плюс)** в верхней части списка чатов.
   * Введите номер телефона получателя в международном формате (например, `998901234567`).
3. **Отправка и получение сообщений**:
   * Введите текст сообщения и нажмите **Enter**.
   * Входящие ответы автоматически запрашиваются каждые 5 секунд и отображаются внутри соответствующего чата.

## 📁 Структура проекта

```
src/
├── api/
│   └── greenApi.ts         
├── components/
│   ├── chat/
│   │   ├── ChatArea.tsx     
│   │   ├── ChatHeader.tsx     
│   │   ├── MessageInput.tsx     
│   │   ├── MessageList.tsx     
│   │   └── SidebarNav.tsx   
│   ├── providers/
│   │   ├── theme-provider.tsx     
│   └── ui/                  
├── hooks/
│   └── useChat.ts           
├── pages/
│   ├── AuthPage.tsx         
│   └── ChatPage.tsx         
│   └── NotFoundPage.tsx         
├── types/
│   └── chat.ts              
├── App.tsx                  
└── main.tsx                 
