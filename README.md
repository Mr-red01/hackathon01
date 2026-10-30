# Smartie - AI Learning Companion Dashboard

A modern, responsive AI Learning Companion dashboard. Built with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Lucide Icons**.

## 🚀 Features

### 1. Left Navigation Sidebar
- **Home**: Access the primary Smartie AI Learning Companion hub.
- **Analytics**: Deep-dive analytics, study time distributions, and milestone badges.
- **Calendar (To-Do List)**: Interactive learning task manager with priorities, checkboxes, and add-task form.
- **AI Quiz (Syllabus Quiz Maker)**: Interactive multiple-choice knowledge evaluation module where you can add custom modules, paste lecture notes or syllabus, and generate quizzes automatically with detailed explanations.
- **Classrooms**: Dedicated classroom portals for *Applied Physics 101*, *Startup Strategy*, and *Structural Engineering*.
- **Student Profile**: Bottom switcher pill for Smartie (`smartie@smartie.ai`).

### 2. Center Dashboard
- **Good Morning, Smartie**: Personalized greeting.
- **AI Assistant Card**:
  - Prompt box with pastel glowing focus ring and image attachment & microphone controls.
  - Quick-action buttons: *Explain this concept*, *Summarize this*, *Test my knowledge*, and *Explain like I'm 5*.
  - Simulated AI response engine with expandable insights, takeaways, and copy feature.
- **Continue Learning Carousel**:
  - *Electricity & Magnetism (Physics 12A)*: Due Tomorrow 9:00, 86% complete with 3D Horseshoe Magnet illustration.
  - *Forces & Motion Essentials (Physics 12A)*: Due 12 June, 57% complete with 3D Set Square illustration.
  - *Forces & Motion Essentials (Smartie Physics)*: 42% complete with 3D DNA illustration.
  - Interactive modal to launch 15-minute study sprints and update module completion.
- **Tutors Section**:
  - *Coding Tutor (CS500)*: Interactive chat modal with live simulated programming mentor responses.
  - *Physics Mentor (Physics 101)*: Interactive chat modal with physics problem-solving assistance.
- **Learning Progress & Visual Tracker**:
  - Leaderboard with live weekly study rankings and Smartie's position (2nd place, 14.5 hrs).
  - Learning Streak card with 14-day streak, weekly daily tracker circles (M, T, W, T, F, S, S), and progress bar toward 15-hour weekly goal.

### 3. Right Sidebar
- **Student Profile Card**: Smartie's avatar, name, and "PROBLEM SOLVER" badge.
- **Game Plan**: "I'm aiming to do well academically by mastering the basics." with inline editable goal state.
- **How I Like to Learn**: Visual preference progress bars (*Seeing & Drawing 75%*, *Reading & Writing 38%*, *Speaking & Listening 22%*).
- **Personal Learning Values**: Tag pills (*Growth 🌱*, *Creativity 🎨*, *Courage 🦁*, *Learning 📚*, *Excellence ⭐*).
- **Learning Sessions Heatmap**: 16-week study density calendar (Jan – Apr) with interactive tooltips showing dates and session hours.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v3
- **Icons**: Lucide React
- **Deployment**: Vercel & GitHub compatible (`vercel.json` included)

---

## 💻 Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the local development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

---

## 🌐 Deployment to Vercel

1. Push this repository to your GitHub account:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
2. Import the project into [Vercel](https://vercel.com) — framework will automatically be detected as **Vite**.
3. Deploy!
