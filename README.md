# 🛒 E-Commerce API (Node.js + TypeScript + MongoDB)

Cette API REST complète pour une plateforme e-commerce est construite avec **Node.js**, **TypeScript**, **MongoDB** et **Docker**. Elle permet de gérer les utilisateurs, les produits, les catégories, les boutiques et les avis.

---

## 📦 Fonctionnalités

- **✅ Authentification sécurisée** : Utilisation de **JWT** pour l'authentification.
- **✅ CRUD complet** :
  - **Gestion des utilisateurs** : création, connexion, mise à jour, suppression.
  - **Gestion des produits** : création, modification, suppression, consultation.
  - **Gestion des catégories et des boutiques**.
  - **Gestion des avis clients** : ajout et suppression.
- **✅ Sécurité renforcée** : Mots de passe hachés avec **bcrypt**.
- **✅ Téléchargement de fichiers** : Gestion des avatars et images produits via **multer**.
- **✅ Déploiement Dockerisé** : L'API et MongoDB peuvent être déployés facilement avec **Docker**.

---

## 🚀 Prérequis

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [MongoDB](https://www.mongodb.com/)
- [Postman](https://www.postman.com/) pour tester les API

---

## 🔧 Configuration et Installation

1. **Cloner le projet :**
   ```bash
   git clone https://github.com/Ayoub-ELHanda/challenge-ayoub-elhanda.git
   cd challenge-ayoub-elhanda
   cd backend
2. **creer un fichier .env  a la racine  :**
plaintext
Copier le code
PORT=3000
MONGO_URI=mongodb://admin:password@localhost:27017/ecommerce
JWT_KEY=secret_key
FRONTEND_URL=http://localhost:8000

3. **Installer les dépendances  :**
npm install
📦 Lancer l'application avec Docker
    
  Démarrer l'application avec Docker Compose  for mongodb :
    cd ..
    docker-compose up --build

🛠️ Démarrer backend 
\backend> npm run dev


✅ Tests 
\backend> npm run test

> backend@1.0.0 test
> jest --config jest.config.ts