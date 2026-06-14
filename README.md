# 🦸 Marvel Heroes — Backend

> API REST Express + MongoDB servant de proxy authentifié vers l'API Marvel externe, réalisée dans le cadre d'une formation chez **Le Reacteur**.

🔗 **[Voir le projet en ligne](https://heroes.romwdv.fr)**

---

## 📖 Présentation

Ce backend expose une API REST pour l'application **Marvel Heroes**. Il joue le rôle de **proxy sécurisé** entre le frontend React et une API Marvel externe : il masque la clé API, ajoute une authentification utilisateur, et gère la persistance des favoris en base de données.

Fonctionnalités principales :

- Proxy vers l'API Marvel (personnages et comics) avec filtres et pagination
- Inscription / connexion utilisateur avec hachage du mot de passe (SHA-256 + salt)
- Gestion des favoris (ajout / suppression) protégée par token Bearer
- Nettoyage des entités HTML dans les descriptions de comics

---

## 🛠️ Technologies utilisées

| Technologie    | Usage                                         |
| -------------- | --------------------------------------------- |
| Node.js        | Runtime JavaScript côté serveur               |
| Express 5      | Framework HTTP, routage                       |
| MongoDB        | Base de données NoSQL                         |
| Mongoose       | ODM, schémas User & favoris                   |
| Axios          | Requêtes vers l'API Marvel externe            |
| crypto-js      | Hachage SHA-256 + salt pour les mots de passe |
| uid2           | Génération de tokens et salts aléatoires      |
| he             | Décodage des entités HTML dans les comics     |
| dotenv         | Gestion des variables d'environnement         |
| cors           | Autorisation des requêtes cross-origin        |

---

## 🗂️ Structure du projet

```
📁 back/
├── index.js                  # Point d'entrée — connexion MongoDB, montage des routes
├── 📁 routes/
│   ├── characters.js         # GET /characters, GET /character/:id
│   ├── comics.js             # GET /comics, GET /comics/:characterId, GET /comic/:id
│   └── user.js               # POST /signup, POST /login, POST/DELETE /favorites
├── 📁 models/
│   └── User.js               # Schéma Mongoose — email, password, salt, token, favorites[]
└── 📁 middlewares/
    └── isAuthenticated.js    # Vérification du token Bearer
```

---

## 🔌 Endpoints de l'API

### Personnages

| Méthode | Route                     | Description                              |
| ------- | ------------------------- | ---------------------------------------- |
| GET     | `/characters`             | Liste des personnages (`?name=`, `?page=`) |
| GET     | `/character/:characterId` | Détail d'un personnage                   |

### Comics

| Méthode | Route                    | Description                              |
| ------- | ------------------------ | ---------------------------------------- |
| GET     | `/comics`                | Liste des comics (`?title=`, `?page=`)   |
| GET     | `/comics/:characterId`   | Comics d'un personnage                   |
| GET     | `/comic/:comicId`        | Détail d'un comic                        |

### Utilisateurs

| Méthode | Route                       | Auth requise | Description               |
| ------- | --------------------------- | ------------ | ------------------------- |
| POST    | `/signup`                   | Non          | Création de compte        |
| POST    | `/login`                    | Non          | Connexion                 |
| POST    | `/favorites`                | Oui          | Ajouter un favori         |
| DELETE  | `/favorites/:marvelId`      | Oui          | Supprimer un favori       |

> Les routes protégées nécessitent un header `Authorization: Bearer <token>`.

---

## ⚙️ Variables d'environnement

Créer un fichier `.env` à la racine :

```env
MONGODB=mongodb+srv://...   # URI MongoDB (sans le nom de la base)
PORT=3000
API_URL=https://...         # URL de base de l'API Marvel externe
API_KEY=votre_cle_api
```

---

## 🚀 Lancer le projet en local

```bash
# Cloner le dépôt
git clone https://github.com/romwdv/marvel-back.git
cd marvel-back

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env  # puis renseigner les valeurs

# Démarrer le serveur
node index.js
# → Serveur disponible sur http://localhost:3000
```

---

## 🔗 Dépôts liés

| Repo       | Description                   |
| ---------- | ----------------------------- |
| Ce dépôt   | Backend — API REST Express    |
| [Frontend](https://github.com/romwdv/marvel-front) | Interface React        |

---

## 👤 Auteur

Exercice réalisé par **Romain** dans le cadre de la formation **[Le Reacteur](https://www.lereacteur.io/)**.
