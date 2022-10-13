const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

const wiki = require('./wiki.js');

app.use('/wiki', wiki);

app.listen(port, () => {
  console.log(`Application exemple à l'écoute sur le port ${port}!`)
});

var square = require('./square');
console.log("L'aire d'un carré dont la largeur est de 4 est la suivante: " + square.area(4));

// Synchrone
console.log('Premier');
console.log('Second');

// Asynchrone
setTimeout(function() {
  console.log('Dixième');
}, 3000);
console.log('Onzième');

/*
  Méthode de routage spéciale, app.all(), qui sera appelée en réponse à toute méthode HTTP. Ceci est utilisé pour charger
  les fonctions middleware à un chemin particulier pour toutes les méthodes de requête. L'exemple suivant (tiré de la documentation d'Express)
  montre un gestionnaire qui sera exécuté pour les requêtes vers /secret indépendamment du verbe HTTP utilisé.
*/
app.all('/secret', (req, res, next) => {
  console.log('Accès à la section secrète ...');
  next(); // passe le contrôle au gestionnaire suivant
});
