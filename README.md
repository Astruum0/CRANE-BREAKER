# CRANE BREAKER

![image](https://user-images.githubusercontent.com/20344764/119358665-21f2fe80-bca9-11eb-827d-fff6a4a6984b.png)

# Table des matières

[Présentation 2](#_Toc72755415)

[Captures d&#39;écran 3](#_Toc72755416)

[En détails 5](#_Toc72755417)

## Présentation

Membres du projet : Arthur Vella, Ranaivoson Romain

**Description du projet**

Crane Breaker reprend le classique du jeu de casse-brique avec la petite différence que la plateforme qui permet de faire rebondir, c&#39;est votre crâne. Le joueur utilisera sa caméra comme contrôleur pour jouer dans les niveaux. Arthur s&#39;est occupé de la partie jeu et algorithmie, et Romain s&#39;est occupé de l&#39;interface et de la partie CRUD.

**Fonctionnalités**

- Mode histoire avec des niveaux prédéfinis
- Partie rapide avec des niveaux générés procéduralement pour jouer directement
- Utilisation de la caméra en guide de plateforme
- Profil utilisateur pour sauvegarder la progression et les high scores
- Base de données conservant les niveaux, utilisateurs et scores
- Page de high scores avec filtres
- Page admin pour gérer les utilisateurs

**Technologies utilisées**

- Langages : HTML, CSS, Javascript
- Framework : Electron
- Librairies : P5(graphique), face-api.js(caméra)
- Base de données : MySQL

## Captures d&#39;écran

![image](https://user-images.githubusercontent.com/20344764/119358793-42bb5400-bca9-11eb-80ae-f305083101a7.png)

Menu principal

![image](https://user-images.githubusercontent.com/20344764/119358819-4949cb80-bca9-11eb-84fc-db816f6a87b3.png)

Jeu

![image](https://user-images.githubusercontent.com/20344764/119358836-4c44bc00-bca9-11eb-8261-49abdd7d0531.png)

Profil utilisateur

![image](https://user-images.githubusercontent.com/20344764/119358858-4e0e7f80-bca9-11eb-85f1-61c1204f88db.png)

Scores

##


## En détails

Le jeu et basé sur l&#39;utilisation du framework Electron. C&#39;est un framework très pratique utilisant Chromium et NodeJS qui permet de déployer facilement et rapidement une application sur Windows, Mac et Linux extrêmement rapidement. L&#39;interface est mise en place en HTML CSS et la partie programmation est effectuée vie Javascript.

Pour notre projet, nous aurions besoin, en plus des modules natif Electron, d&#39;un framework graphique p5, et d&#39;un framework pour utiliser la caméra de l&#39;utilisateur, face-api.js. Une base de données a été mise en place sur un serveur avec MySQL.

Lors du lancement du jeu, l&#39;utilisateur a accès à plusieurs options : Jouer, Profil, Scores, Quitter et enfin Accès Administrateur.

**Jouer** amène l&#39;utilisateur directement sur la page game.html, affichant le jeu. Les détails techniques du jeu seront indiqués un peu plus loin.

**Profil** amène l&#39;utilisateur sur toutes ses infos. Si l&#39;utilisateur n&#39;est pas connecté, il sera redirigé vers la page de login, où il pourra se connecter ou créer un compte.

L&#39;utilisateur pourra voir sur cette page son pseudo, son adresse e-mai, son score total et ses 5 dernières parties. Il peut changer son pseudo, son adresse e-mail et son mot de passe à tout moment.

**Scores** amène l&#39;utilisateur sur la page avec tous les scores de tous les utilisateurs. Les scores sont récupérés dans la table &#39;scores&#39; de la base de données et affichés sur la page avec : le score total d&#39;un utilisateur depuis qu&#39;il a commencé à jouer, et les 5 dernières parties.

**Quitter** ferme tout simplement l&#39;application de manière propre.

**Accès administrateur** amène l&#39;utilisateur au portail de connexion admin. Il n&#39;est pas possible de se créer un compte ici, le compte est directement ajouté manuellement dans la base de données. Dans ce panel, l&#39;administrateur peut changer toutes les informations de tous les joueurs.

Les récupérations d&#39;infos et changement dans la base de données sont effectuées via des querys SQL (SELECT, UPDATE et INSERT). Les affichages dynamiques des différentes valeurs récupérées se font avec les DOM Javascript. Le stockage des différentes valeurs locales comme la session utilisateur se fait avec electron-store, qui permet de convertir les fonction localStorage Javascript en stockage dur dans l&#39;application.

Le jeu en lui-même fonctionne avec différentes classes pour la création de la barre du casse-brique et la balle. La caméra est affichée en arrière-plan et toute la reconnaissance faciale est effectuée et ajustée avec l&#39;API face-api.js, qui se charge à partir de modèle pré-entrainés, de récupérer la partie haute de la tête du joueur.

Les briques sont générés aléatoirement selon un pattern codé de différentes formes : en carrés, en diamants…
