import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firestore';
import 'firebase/storage';



const firebaseConfig = {
    apiKey: "AIzaSyC5nWGSTCzksg8Jqw2kHgoJz3FrvXf_ACI",
    authDomain: "sys-chamados.firebaseapp.com",
    projectId: "sys-chamados",
    storageBucket: "sys-chamados.appspot.com",
    messagingSenderId: "358423236623",
    appId: "1:358423236623:web:9e703b9457be5c1020537a",
    measurementId: "G-MEC8QNG8BE"
  
  };
  
  
  if(!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
  }


  export default firebase;
  
  