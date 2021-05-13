# reddit app

Reddit est un réseau social conçu pour les employés de Groupomania pour publier, supprimer et commenter des articles.
L'utilisateur est invité à s'inscrire. Puis il se connecte avec son pseudo et son mot de passe. Il a accès à tous ses articles, il peut les modifier, commenter ou supprimer, il peut voir qui a commenté son article et si besoin effacer ce commentaire. Il peut également supprimer son compte.
L'administrateur a accès a toutes les fonctions du site. Mais pour des raisons de performances, le compte administrateur ne peut se supprimer que directement dans la base données.
L'application est conçu avec les technologies suivantes entre autres:
node.js, express, sequelize, mysql2
pour les installer passer la commande suivante dans le terminal: npm install sequelize --save( par exemple ). Puis pour le front axios, bootstrap, vue.js etc...
Vous trouverez ci joint le serveur mysql(il n'y pas de mot de passe).
Lancez npm start serve dans le backend et npm run serve dans le frontend. Puis connectez vous au port écouté.
L'administrateur a le roleId = 2. Il se connecte comme suit:
pseudo: 'admin', mot de passe: 'administrator'
