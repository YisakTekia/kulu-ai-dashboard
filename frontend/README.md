# 🚀 Kulu AI Dashboard (Frontend)

This is the frontend user interface for the **Kulu AI** platform. It allows users to manage Translation, Audio Recording, and Transcription tasks. The project is built using React, TypeScript, and Shadcn UI.

---

## 🛠️ Tech Stack 

- **Framework:** React + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** Shadcn UI
- **Icons:** Lucide React
- **State Management:** React Hooks
- **Package Manager:** NPM

---

## ⚙️ Prerequisites 

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [Git](https://git-scm.com/)

---

## 📥 Installation 

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [https://gitlab.com/yisak.tekia/kulu-ai-dashboard.git](https://gitlab.com/yisak.tekia/kulu-ai-dashboard.git)
   cd kulu-ai-dashboard

```

2. **Install dependencies:**
*(This downloads all necessary libraries)*
```bash
npm install

```



---

## ▶️ How to Run

To start the development server:

1. **Run the command:**
```bash
npm run dev

```


2. **Open in Browser:**
Navigate to `http://localhost:5173` to view the dashboard.

---

## 📂 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── layout/        # Sidebar, Header
│   ├── tasks/         # Tables, Stats, Dialogs for Tasks
│   ├── ui/            # Shadcn UI base components
│   └── users/         # User Profile Dialogs
├── pages/             # Main Application Pages
│   ├── DashboardHome.tsx
│   └── tasks/         # Translation, Recording, Transcription pages
├── App.tsx            # Main Entry & Routing
└── main.tsx

```

---

## 🔗 API Integration & Swagger

This frontend connects to the Kulu AI Backend. We use **Swagger UI** to understand the API endpoints.

* **Swagger Docs Link:** *(Ask Backend Team/Admin)*
* **API Base URL:** Configure inside `.env` file (e.g., `VITE_API_URL=http://localhost:8000`)

To fetch data, we use `axios` following the structure in Swagger docs.

---

## 🌲 Git Workflow

Common commands used in this project:

**1. Check Status:**

```bash
git status

```

**2. Add Changes:**

```bash
git add .

```

**3. Commit Changes:**

```bash
git commit -m "Description of changes"

```

**4. Push to GitLab:**

```bash
git push origin main

```

**5. Pull Updates:**

```bash
git pull origin main

```

```

---

