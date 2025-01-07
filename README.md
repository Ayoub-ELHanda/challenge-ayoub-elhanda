# 🛒 E-Commerce API (Node.js + TypeScript + MongoDB)

Cette API REST complète pour une plateforme e-commerce est construite avec **Node.js**, **TypeScript**, **MongoDB** et **Docker**. Elle permet de gérer les utilisateurs, les produits, les catégories, les boutiques et les avis.

## 📦 Fonctionnalités

- **Authentification sécurisée** : Utilisation de **JWT** pour l'authentification.
- **CRUD complet** :
  - Gestion des utilisateurs : création, connexion, mise à jour, suppression.
  - Gestion des produits : création, modification, suppression, consultation.
  - Gestion des catégories et des boutiques.
  - Gestion des avis clients : ajout et suppression.
- **Sécurité renforcée** : Mots de passe hachés avec **bcrypt**.
- **Téléchargement de fichiers** : Gestion des avatars et images produits via **multer**.
- **Déploiement Dockerisé** : L'API et MongoDB peuvent être déployés facilement avec **Docker**.

---

## 🚀 Prérequis

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [MongoDB](https://www.mongodb.com/)
- **Postman** pour tester les API

---

## 🔧 Configuration

1. **Créer un fichier `.env` à la racine du projet :**

```plaintext
PORT=3000
MONGO_URI=mongodb://admin:password@localhost:27017/ecommerce
JWT_KEY=secret_key
FRONTEND_URL=http://localhost:8000
Installer les dépendances :
bash
Copier le code
npm install
Lancer l'application avec Docker :
bash
Copier le code
docker-compose up --build
Accédez à l'API via http://localhost:3000
🛠️ Démarrer en mode Développement
Lancer MongoDB (si non dockerisé) :
bash
Copier le code
mongod --dbpath ./data
Lancer le serveur en mode développement :
bash
Copier le code
npm run dev
📦 Compilation TypeScript
bash
Copier le code
npm run build
📡 Endpoints API
Utilisateur :
POST /user/register : Créer un nouvel utilisateur.
POST /user/login : Connexion utilisateur.
GET /user/show : Récupérer les informations d'un utilisateur.
PUT /user/update : Mettre à jour un utilisateur.
PUT /user/change-password : Modifier le mot de passe.
Produit :
POST /product/create : Créer un produit.
GET /product/show : Voir un produit.
PUT /product/update : Mettre à jour un produit.
DELETE /product/delete : Supprimer un produit.
Boutique :
POST /shop/create : Créer une boutique.
GET /shop/show : Voir une boutique.
PUT /shop/update : Mettre à jour une boutique.
DELETE /shop/delete : Supprimer une boutique.
✅ Tests avec Postman
Importer les collections Postman.
Tester les routes CRUD.
Vérifier les réponses JSON et les statuts HTTP.
🔐 Sécurité
Hashing des mots de passe avec bcrypt.
JWT pour la gestion des sessions.
CORS pour protéger les requêtes entrantes.
📦 Dépendances principales
Backend :

express
mongoose
typescript
bcrypt
jsonwebtoken
multer
dotenv
Outils de développement :

ts-node
nodemon
typescript
👨‍💻 Contribuer
Les contributions sont les bienvenues ! Voici comment contribuer :

Forkez le projet.
Créez une branche (feature/nouvelle-fonctionnalite).
Committez vos changements.
Poussez vers la branche principale.
Créez une Pull Request.
📃 Licence
Ce projet est sous licence MIT, vous êtes libre de l'utiliser et de le modifier.

📞 Support
Email : elhandaayo@gmail.com
Issues : Ouvrez un ticket sur le dépôt GitHub.
🌟 Merci d'utiliser cette API E-commerce ! Bon développement !