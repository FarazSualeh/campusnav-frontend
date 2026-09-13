````markdown
# 🧭 CampusNav

### Indoor Campus Navigation System for Kalsekar Technical Campus

CampusNav is a web-based indoor navigation system developed specifically for **Kalsekar Technical Campus**. It is designed to help students, faculty, and visitors easily find classrooms, laboratories, offices, restrooms, and other important locations within the campus.

The system allows users to select their **starting location** and **destination**, after which CampusNav calculates the shortest route and displays it visually on the campus floor map along with proper navigation instructions.

---

## 🎯 Objectives

- Make it easier for students and visitors to navigate the campus.
- Provide an interactive digital representation of campus floors.
- Allow users to quickly search for classrooms, labs, offices, and facilities.
- Calculate efficient indoor routes between locations.
- Provide clear visual and precise navigation instructions.
- Provide administrators with tools to manage campus information.

---

## ✨ Features

### 🗺️ Interactive Indoor Map

- Interactive SVG-based floor maps.
- Displays rooms, corridors, facilities, and navigation nodes.
- Supports zoom and pan.
- Interactive location selection and tooltips.

### 🔍 Smart Location Search

- Search for classrooms, laboratories, restrooms, administrative areas, and other locations.
- Filter locations by category and floor.
- Filter-as-you-type search.

### 🧭 Route Navigation

- Select a starting point and destination.
- Calculates the shortest available route.
- Displays the route directly on the floor map.
- Provides precise navigation instructions.
- Displays route distance and summary information.

### 🏫 Campus Structure

CampusNav is being designed for the major departments of Kalsekar Technical Campus:

- Engineering
- Pharmacy
- Architecture

### 👨‍💼 Admin Management

The planned Admin Dashboard will allow authorized administrators to manage:

- Departments
- Buildings
- Floors
- Locations
- Map data
- Navigation nodes and connections

---

## ⚙️ How It Works

The basic navigation workflow is:

```text
User
  ↓
Select Start Location
  ↓
Select Destination
  ↓
Search Campus Location Data
  ↓
Navigation API
  ↓
Dijkstra's Algorithm
  ↓
Calculate Shortest Path
  ↓
Display Route on Floor Map
  ↓
Precise Instructions
```
````

For example:

```text
Main Entrance
      ↓
Staircase
      ↓
1st Floor
      ↓
Corridor
      ↓
IT Lab 3
```

---

## 🧠 Navigation Algorithm

CampusNav currently uses **Dijkstra's Algorithm** for shortest-path calculation.

The campus floor layout is represented as a graph consisting of:

- **Nodes** — important points such as entrances, corridors, rooms, and stairs.
- **Edges** — connections between those points.
- **Weights** — calculated using the distance between node coordinates.

This allows the system to calculate an efficient route between the selected starting point and destination.

---

## 🛠️ Technology Stack

### Frontend & Backend

- **Next.js**
- **React**
- **TypeScript / JavaScript**
- **Tailwind CSS**
- **Next.js API Routes**

### Database & Backend Services

- **Supabase**
- **PostgreSQL**

### Navigation

- **Dijkstra's Algorithm**
- Coordinate-based graph navigation
- SVG-based indoor maps

### DevOps

- **Git & GitHub**
- **GitHub Actions**
- **Docker**
- **Docker Hub**

---

## 📁 Project Structure

```text
CampusNav/
│
├── app/
│   ├── api/
│   │   └── route/
│   │       └── route.ts
│   │
│   ├── map/
│   │   └── page.tsx
│   │
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── FloorMap.jsx
│   └── NavigationPanel.tsx
│
├── lib/
│   ├── dijkstra.js
│   ├── floorData.js
│   └── locations.js
│
├── public/
│   │── burhanp.jpg
│   │── cnlogo.png
│   └── farazs.png
├── Dockerfile
├── .dockerignore
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd campusnav
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

### 4. Create a production build

```bash
npm run build
```

---

## 🐳 Docker

CampusNav is containerized using Docker for consistent development and deployment environments.

Build the Docker image:

```bash
docker build -t campusnav .
```

Run the container:

```bash
docker run -p 3000:3000 campusnav
```

---

## 🔄 CI / CD

GitHub Actions is configured to automatically check and build the project whenever changes are pushed to the repository.

```text
Developer
    ↓
Git Push
    ↓
GitHub
    ↓
GitHub Actions
    ↓
Build & Checks
    ↓
Docker
    ↓
Docker Hub
```

This helps ensure that new changes are automatically verified before deployment.

---

## 🔮 Future Scope

CampusNav can be extended with:

- 📍 QR-based location detection
- ♿ Accessibility-friendly routes
- 🛗 Staircase and lift preferences
- 🏢 Multi-building navigation
- 🏫 Multi-campus expansion
- 📊 Advanced Admin Dashboard
- 🗺️ Real-time campus map data

---

## 👥 Creators

CampusNav is developed as a **Final Year Project** by:

### Faraz Sualeh

**BSc IT Student**
Frontend development, interactive maps, search and navigation experience.

### Burhan Parkar

**BSc IT Student**
Backend development, system functionality and database handling.

---

## 📄 Project Information

**Project:** CampusNav
**Type:** Final Year Project
**Institution:** Kalsekar Technical Campus
**Domain:** Indoor Navigation / Web Application
**Status:** Under Development

---

> **CampusNav — Navigate. Explore. Connect.**

```

```
