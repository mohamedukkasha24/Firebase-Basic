 // 🔥 Firebase CDN imports
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
 import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
 // ✅ Firebase configuration
 const firebaseConfig = {
     apiKey: "AIzaSyAX4FdZAVJ-_SmLRHydz-pw-ivjx03x5j4",
     authDomain: "pro-x-f880f.firebaseapp.com",
     projectId: "pro-x-f880f",
     storageBucket: "pro-x-f880f.appspot.com",
     messagingSenderId: "904964066708",
     appId: "1:904964066708:web:07ef791c906ef979999381",
     measurementId: "G-WM3DQRNN56"
 };

 // ✅ Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);


 const signInSection = document.getElementById('SignInsection');
 const signOutSection = document.getElementById('SignOutsection');

 const btnCreate = document.getElementById('btn_create');
 const btnSignIn = document.getElementById('btn_signIn');
 const btnSignOut = document.getElementById('btn_signOut');

 const emailElement = document.getElementById('txt_userEmail');
 const passwordElement = document.getElementById('txt_userPassword');
 const messageElement = document.getElementById('message');
 const messageElement2 = document.getElementById('message2');

 btnCreate.onclick = () => {
     var email = emailElement.value;
     console.log("Email : ", email);
     var password = passwordElement.value;
     console.log("Password :", password)
     createUserWithEmailAndPassword(auth, email, password).then(() => {
         messageElement.innerHTML = "Account created succesfully";
         messageElement.hidden = false;

     }).catch((err) => {
         messageElement2.innerHTML = err.message;
         messageElement2.hidden = false;
     })

 }

 btnSignIn.onclick = () => {
     var email = emailElement.value;
     console.log("Email : ", email);
     var password = passwordElement.value;
     console.log("Password :", password)
     signInWithEmailAndPassword(auth, email, password).then(() => {

         signInSection.hidden = true;
         signOutSection.hidden = false;

     }).catch((err) => {
         messageElement2.innerHTML = err.message;
         messageElement2.hidden = false;
     })
 }
 btnSignOut.onclick = () => {
     signOut(auth).then(() => {
         signInSection.hidden = false;
         signOutSection.hidden = true;
         emailElement.value = '';
         passwordElement.value = '';
         messageElement.innerHTML = '';
         messageElement.hidden = true;
         messageElement2.innerHTML = '';
         messageElement2.hidden = true;
     }).catch((error) => {
         // An error happened.
         messageElement2.innerHTML = error.message;
     });
 }