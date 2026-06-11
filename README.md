# DashURL 🚀

A modern, production-ready URL shortening platform built with **Next.js, MongoDB, Docker, AWS, and GitHub Actions CI/CD**.

DashURL is designed not only as a URL shortener but also as a learning-focused open-source project for developers and students who want hands-on experience with:

* Full Stack Development
* Next.js
* Docker & Containerization
* GitHub Actions CI/CD
* AWS ECR & EC2
* Linux & DevOps Fundamentals
* Open Source Collaboration

---

## 🌐 Live Demo

**Website:** https://dashurl.xyz </br>
**Website:** https://urlshortnr.vercel.app


---

## 📖 About the Project

DashURL allows users to create short, shareable URLs and redirect visitors to their original destinations.

This project demonstrates a complete modern software delivery pipeline:

```text
Code → GitHub → Docker → GitHub Actions → AWS ECR → AWS EC2 → Production
```

The goal is to help developers understand how real-world applications are built, containerized, deployed, and maintained in production environments.

---

## ✨ Features

### URL Management

* 🔗 Generate short URLs
* 🚀 Fast URL redirection
* 📦 MongoDB-backed storage
* 📱 Fully responsive UI

### Developer Features

* ⚡ Next.js App Router
* 🎨 Tailwind CSS
* 🐳 Dockerized Application
* 🔄 GitHub Actions CI/CD
* ☁️ AWS ECR Integration
* 🖥️ AWS EC2 Deployment
* 🔒 Environment Variable Management

### Learning Features

Learn practical skills in:

* Next.js
* React
* MongoDB
* Docker
* Docker Compose
* GitHub Actions
* AWS ECR
* AWS EC2
* Linux Administration
* CI/CD Pipelines
* Production Deployments

---

## 🛠 Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* Next.js API Routes
* MongoDB Atlas

### Authentication & Analytics

* Firebase

### DevOps

* Docker
* Docker Compose
* GitHub Actions
* AWS ECR
* AWS EC2
* Linux (Ubuntu)

---

## 📂 Project Structure

```text
dashurl/
│
├── app/
│   ├── api/
│   └── ...
│
├── components/
├── lib/
├── public/
│
├── infra/
│   ├── scripts/
│   └── docs/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── Dockerfile
├── docker-compose.yml
├── package.json
├── README.md
└── .env.sample
```

---

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/huzefajuned/dashurl.git

cd dashurl
```

### 2. Install Dependencies

```bash
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.sample .env
```

Example:

```env
# MongoDB
NEXT_PUBLIC_DB_URL=

# Application URL
NEXT_PUBLIC_HOST_URL=http://localhost:3000

# Firebase
NEXT_PUBLIC_apiKey=
NEXT_PUBLIC_authDomain=
NEXT_PUBLIC_projectId=
NEXT_PUBLIC_storageBucket=
NEXT_PUBLIC_messagingSenderId=
NEXT_PUBLIC_appId=
NEXT_PUBLIC_measurementId=
```

> ⚠️ Never commit your real `.env` file to GitHub.

---

## 🗄 MongoDB Setup

1. Create a MongoDB Atlas account.
2. Create a cluster.
3. Create a database user.
4. Configure Network Access.
5. Copy your MongoDB connection string.
6. Update:

```env
NEXT_PUBLIC_DB_URL=
```

---

## 💻 Run Locally

Development Mode:

```bash
npm run dev
```

Application will be available at:

```text
http://localhost:3000
```

---

## 🐳 Docker Setup

### Build Image

```bash
docker build -t dashurl .
```

### Run Container

```bash
docker run -p 3000:3000 dashurl
```

### Using Docker Compose

```bash
docker compose up --build
```

---

## 🔄 CI/CD Pipeline

DashURL includes a complete CI/CD pipeline powered by GitHub Actions.

### Deployment Flow

```text
Developer Pushes Code
          │
          ▼
GitHub Actions
          │
          ▼
Docker Image Build
          │
          ▼
Push Image to AWS ECR
          │
          ▼
SSH into AWS EC2
          │
          ▼
Pull Latest Image
          │
          ▼
Deploy Container
          │
          ▼
Production
```

### Technologies Used

* GitHub Actions
* Docker
* AWS ECR
* AWS EC2
* Linux

---

## ☁️ AWS Deployment

### Services Used

* Amazon ECR
* Amazon EC2
* IAM
* Security Groups

### Deployment Process

1. Push code to GitHub.
2. GitHub Actions builds Docker image.
3. Image is pushed to AWS ECR.
4. EC2 pulls the latest image.
5. Existing container is replaced.
6. Updated version becomes available instantly.

---

## 📚 Learning Roadmap

This repository is ideal for developers learning:

### Beginner Level

* Git & GitHub
* React
* Next.js
* MongoDB

### Intermediate Level

* Docker
* Docker Compose
* Linux
* Environment Variables

### Advanced Level

* GitHub Actions
* AWS ECR
* AWS EC2
* CI/CD Pipelines
* Production Deployments
* DevOps Fundamentals

---

## 🤝 Contributing

Contributions are welcome from developers of all experience levels.

Whether you're:

* Learning Open Source
* Learning Next.js
* Learning Docker
* Learning AWS
* Learning DevOps
* Fixing Bugs
* Improving Documentation

You're welcome to contribute.

### Contribution Process

#### 1. Fork the Repository

Click the **Fork** button on GitHub.

#### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/dashurl.git

cd dashurl
```

#### 3. Create a Feature Branch

```bash
git checkout -b feature/my-feature
```

#### 4. Make Changes

Implement your improvements.

#### 5. Commit Changes

```bash
git commit -m "feat: add new feature"
```

#### 6. Push Changes

```bash
git push origin feature/my-feature
```

#### 7. Open a Pull Request

Submit a Pull Request describing:

* What was changed
* Why it was changed
* Screenshots (if applicable)

---

## 🐛 Reporting Issues

Found a bug?

Please create an issue containing:

* Steps to reproduce
* Expected behavior
* Actual behavior
* Screenshots (if applicable)

---

## 🌟 Support the Project

If you find this project useful:

* ⭐ Star the repository
* 🍴 Fork the repository
* 🐛 Report issues
* 🚀 Submit pull requests
* 📢 Share it with others

---

## 👨‍💻 Maintainer

**Huzefa Bin Juned**

GitHub: https://github.com/huzefajuned/dashurl

LinkedIn: https://linkedin.com/in/huzefabinjuned

---

## 📜 License

This project is licensed under the MIT License.

You are free to use, modify, and distribute this software for educational and commercial purposes.

---

### Built with ❤️ for Developers, Students, and Open Source Learners.
