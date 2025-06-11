// ✅ Add these imports at the top of app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// ✅ Firebase config (same as in index.html)
const firebaseConfig = {
  apiKey: "AIzaSyAX4FdZAVJ-_SmLRHydz-pw-ivjx03x5j4",
  authDomain: "pro-x-f880f.firebaseapp.com",
  projectId: "pro-x-f880f",
  storageBucket: "pro-x-f880f.appspot.com",
  messagingSenderId: "904964066708",
  appId: "1:904964066708:web:07ef791c906ef979999381",
  measurementId: "G-WM3DQRNN56",
  databaseURL: "https://pro-x-f880f-default-rtdb.firebaseio.com"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ✅ DOM elements
const useForm = document.getElementById("userForm");
const userNameElement = document.getElementById("txt_userName");
const userAgeElement = document.getElementById("txt_userAge");
const userMotherName = document.getElementById("txt_userMotherName");
const userFatherName = document.getElementById("txt_userFatherName");







// ✅ Save data
useForm.onsubmit = (e) => {
  e.preventDefault(); // prevent form reload

  const uName = userNameElement.value.trim();
  const uAge = userAgeElement.value.trim();
  const uMotherName = userMotherName.value.trim();
  const uFattherName = userFatherName.value.trim();


  if (uName && uAge && uMotherName && uFattherName) {
    const userRef = push(ref(db, "users"));
    set(userRef, {
      Name: uName,
      Age: uAge,
      Mother_Name :uMotherName,
      Father_Name : uFattherName

      
    })
      .then(() => {
        alert("User data saved!");
        userNameElement.value = "";
        userAgeElement.value = "";
        userMotherName.value = "";
        userFatherName.value = "";
      })
      .catch((err) => {
        alert("Error saving data: " + err.message);
      });
  } else {
    alert("Please fill the all fields.");
  }
};
