<p align="center">
  <h1 align="center">🌳 GYANGROVE</h1>
  <p align="center">A Modern Inventory Management System with Real-time Alerts</p>
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/khushi158/GyanGrove?style=flat-square&logo=opensourceinitiative&logoColor=white&color=00ff86" alt="license">
  <img src="https://img.shields.io/github/last-commit/khushi158/GyanGrove?style=flat-square&logo=git&logoColor=white&color=00ff86" alt="last-commit">
  <img src="https://img.shields.io/github/languages/top/khushi158/GyanGrove?style=flat-square&color=00ff86" alt="repo-top-language">
  <img src="https://img.shields.io/github/languages/count/khushi158/GyanGrove?style=flat-square&color=00ff86" alt="repo-language-count">
</p>

## 📑 Table of Contents
- [✨ Overview](#-overview)
- [🚀 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📸 Screenshots](#-screenshots)
- [🏃‍♂️ Getting Started](#️-getting-started)
- [📁 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Overview

GyanGrove is a modern, user-friendly inventory management system that helps businesses track their stock levels in real-time. With features like automated low-stock alerts, intuitive dashboard interfaces, and secure authentication, GyanGrove makes inventory management effortless and efficient.

## 🚀 Features

### 📦 Inventory Management
- Real-time stock tracking and monitoring
- Add, edit, and delete inventory items
- Detailed item information management
- Category-based organization
- Bulk operations support

### ⚡ Smart Alerts
- Automated email notifications for low-stock items
- Customizable alert thresholds
- Detailed email alerts with item specifics
- Fun GIF integration in alerts
- Real-time notification system

### 🔐 Security
- Secure user authentication with Supabase
- Protected inventory routes
- Role-based access control
- User-specific inventory views
- Secure data encryption

### 💻 User Interface
- Modern, responsive dashboard
- Interactive data tables
- Real-time updates
- Dark/Light mode support
- Mobile-friendly design

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite
- **Backend**: Supabase
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## 📸 Screenshots

### Dashboard Overview
![Dashboard](https://github.com/user-attachments/assets/14ec5113-eae2-427e-85be-f9d1b0b0fe3d)

### Inventory Management
![Inventory](https://github.com/user-attachments/assets/b9fd9127-218f-4910-8bfa-b1c7682cec1c)

### Email Alerts
![Alerts](https://github.com/user-attachments/assets/789ba21f-b791-4d9c-bab4-d3337d2b4aa0)

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
```bash
git clone https://github.com/khushi158/GyanGrove.git
cd GyanGrove
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```bash
cp .env.example .env
```
Fill in your Supabase credentials in the `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:5173` to view the application.

## 📁 Project Structure

```
GyanGrove/
├── src/
│   ├── Components/
│   │   ├── Authentication/
│   │   │   ├── Signin.jsx
│   │   │   └── Signup.jsx
│   │   ├── Home/
│   │   │   ├── AddItemDialog.jsx
│   │   │   ├── EditItemDialog.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── InventoryTable.jsx
│   │   │   └── LowStockAlerts.jsx
│   │   ├── NavBar.jsx
│   │   └── RootRedirect.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── supabase.js
├── public/
├── index.html
├── package.json
└── vite.config.js
```

## 🤝 Contributing

We welcome contributions to GyanGrove! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">Built with ❤️ by the GyanGrove Team</p>

<p align="center">
  <a href="https://github.com/khushi158/GyanGrove/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=khushi158/GyanGrove" alt="Contributors">
  </a>
</p>
