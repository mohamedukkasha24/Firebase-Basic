// ✅ Add these imports at the top of app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ✅ Firebase config (same as in index.html)
const firebaseConfig = {
  apiKey: "AIzaSyAX4FdZAVJ-_SmLRHydz-pw-ivjx03x5j4",
  authDomain: "pro-x-f880f.firebaseapp.com",
  projectId: "pro-x-f880f",
  storageBucket: "pro-x-f880f.appspot.com",
  messagingSenderId: "904964066708",
  appId: "1:904964066708:web:07ef791c906ef979999381",
  measurementId: "G-WM3DQRNN56",
  databaseURL: "https://pro-x-f880f-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
console.log(app);

const db = getFirestore(app);
console.log(db);
const nameListElement = document.getElementById('nameList')
       

     //Create the Data
// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     first: "muhunthan",
//     last: "muthu",
//     born: 2002
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }
        // Read the Data
const querySnapshot = await getDocs(collection(db, "users"));
nameListElement.innerHTML="";
let i = 1;
querySnapshot.forEach((doc) => {
  nameListElement.innerHTML+=`<div style = "border :1px solid black"> <li>S.No : ${i}</li><li>Id : ${doc.id} </li> <li>FirstName : ${doc.data().first} </li> <li> LastName : ${doc.data().last} </li> <li> Date Of Birth : ${doc.data().born} </li> </div><br>`
  // console.log(`${doc.id} => ${doc.data().born}`);
  i++;
});
     
      // Update the Data
const washingtonRef = doc(db, "users/mzmNdFFfc4HS9YAHGGJK");
await updateDoc(washingtonRef, {
      born : 2001,
      first : "Yasik",
      last : "Peer Mohamed" 
});

const querySnapshot2 = await getDocs(collection(db, "users"));
querySnapshot2.forEach((doc) => {
  if(doc.data().first == "muhunthan"){
    console.log(doc.data());
    
  }
})

        // Delete the Data
await deleteDoc(doc(db, "users/xD6BC6vHHChm3NKPtgMa"));