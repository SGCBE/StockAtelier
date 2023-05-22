// Importer la bibliothèque Firebase
import firebase from 'firebase/app';
import 'firebase/firestore';

// Configuration de votre projet Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCRxjJPOHEBAbnXQariFN6funIWPpsIe28",
  authDomain: "atelier---gestion-de-stock.firebaseapp.com",
  databaseURL: "https://atelier---gestion-de-stock-default-rtdb.firebaseio.com",
  projectId: "atelier---gestion-de-stock",
  storageBucket: "atelier---gestion-de-stock.appspot.com",
  messagingSenderId: "92935528444",
  appId: "1:92935528444:web:57786855ed9cc7ef129c79"
};

// Initialiser Firebase avec la configuration
firebase.initializeApp(firebaseConfig);

// Obtenir une référence à la base de données Firestore
const db = firebase.firestore();

// Exporter la référence à la base de données Firestore pour une utilisation dans d'autres fichiers
export default db;
