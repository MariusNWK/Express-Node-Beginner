const express = require('express');
const logger = require('morgan');
// const MongoClient = require('mongodb').MongoClient;
const app = express();
const path = require('path');
// var jade = require('jade');
// var template = jade.compile('string of jade', options);
// var result = template(locals);
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

const wiki = require('./wiki.js');
const view = require('./view.js');

// Définir le répertoire contenant les modèles ('views')
app.set('views', path.join(__dirname, 'views'));

// Définir le moteur d'affichage à utiliser, dans ce cas 'jade'.
app.set('view engine', 'jade');

app.use('/wiki', wiki);
app.use('/view', view);
app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.static('routes'));
app.use('/media', express.static('helloworld'));

// Doit être le derneir app.use() à être appelé
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Quelque chose s'est cassé !");
});

// Un exemple de fonction middleware
let a_middleware_function = function (req, res, next) {
  console.log("Inside a_middleware_function");
  next(); // Appelez next() pour qu'Express appelle la fonction middleware suivante dans la chaîne.
}

// Fonction ajoutée avec use() pour toutes les routes et verbes
// app.use(a_middleware_function);

// Fonction ajoutée avec use() pour une route spécifique
// app.use('/middleware', a_middleware_function);

// Une fonction middleware ajoutée pour un verbe (en l'occurrence get) et une route HTTP spécifiques
app.get('/middleware', a_middleware_function);

app.listen(port, () => {
  console.log(`Application exemple à l'écoute sur le port ${port}!`)
});

// MongoClient.connect('mongodb://localhost:27017/animals', function (err, client) {
//   if (err) throw err;

//   let db = client.db('animals');
//   db.collection('mammals').find().toArray(function (err, result) {
//     if (err) throw err;
//     console.log(result);
//     client.close();
//   });
// });

var square = require('./square');
console.log("L'aire d'un carré dont la largeur est de 4 est la suivante: " + square.area(4));

// Synchrone
console.log('Premier');
console.log('Second');

// Asynchrone
setTimeout(function () {
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
