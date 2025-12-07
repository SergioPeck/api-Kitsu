# 📚 Scan / Manga Platform – Backend

Backend API for a manga / scan reading and management platform, built with **NestJS**, **PostgreSQL** and **TypeORM**.

This project is designed to allow users to read uploaded manga chapters, while only specific authorized users (Uploader / Admin) can create, edit or delete content.

The focus of this backend is **security, roles, scalability and clean architecture**.

---

## 🎯 Project Goals

* Provide a robust REST API for a manga / scan website
* Allow everyone to **read all content (public access)**
* Allow only **authorized users** to:

  * Upload manga
  * Upload chapters
  * Manage images of each chapter
  * Edit title, description, order and metadata
* Implement a **role-based system**
* Prepare the project for future features:

  * Groups
  * Analytics
  * Comments

---

## 🔐 Roles System

The platform is based on a simple but powerful role system:

| Role         | Permissions                                 |
| ------------ | ------------------------------------------- |
| **USER**     | Can only view / read content                |
| **UPLOADER** | Can upload and manage own mangas / chapters |
| **ADMIN**    | Full control over the entire platform       |

Users **cannot register as uploaders themselves**.
Only an **ADMIN** can grant that permission.

---

## 🧰 Tech Stack

* **NestJS** – Backend framework
* **PostgreSQL** – Database
* **TypeORM** – ORM
* **Firebase Auth** – Authentication
* **JWT** – Managed by Firebase
* **(Future)** Cloud storage for images

---

## 🧱 Planned Modules

* `AuthModule`
* `UsersModule`
* `MangasModule`
* `ChaptersModule`
* `ImagesModule`

Each module follows a clean structure:

* Controller
* Service
* Entity
* DTOs

---

## 🗄️ Database Structure (planned)

### Users

* `id`
* `email`
* `displayName`
* `role`
* `createdAt`

### Mangas

* `id`
* `title`
* `description`
* `coverImage`
* `ownerId`
* `status`
* `createdAt`

### Chapters

* `id`
* `mangaId`
* `title`
* `chapterNumber`
* `order`

### Images

* `id`
* `chapterId`
* `imageUrl`
* `order`

---

## 🖊️ Editing System – Concept

This project uses an **inline editing system** instead of a separated dashboard.

If an Uploader / Admin enables **Edit Mode** in the frontend, they will see:

* ✏️ Edit buttons on title & description
* ☰ Reorder icons for chapters and images
* 🗑️ Delete / replace options

The backend’s job is to only allow these edits if the user is:

* The **owner of that manga**
* Or an **ADMIN**

---

## 🚀 Deployment Plan

* Backend: (Render / Railway / similar)
* Database: PostgreSQL cloud
* Frontend: Vercel / Netlify
* Custom domain: example.com (TBD)

This backend is designed to be used as a **real production API**.

---

## 👨‍💻 Author

**SergioPeck**
Full Stack Developer (in progress)
Focused on Web

GitHub: [https://github.com/SergioPeck]

---

## 📌 Current status

✅ Project structure defined
🧱 Creating modules and entities
🔐 Preparing Firebase + Role system
🚀 First deploy plan in progress