// ✅ Add these imports at the top of app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

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

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ✅ DOM elements
const useForm = document.getElementById("userForm");
const userNameElement = document.getElementById("txt_userName");
const userAgeElement = document.getElementById("txt_userAge");
const userMotherName = document.getElementById("txt_userMotherName");
const userFatherName = document.getElementById("txt_userFatherName");
const userTableBody = document.getElementById("userTableBody");
const TableSection = document.getElementById("tablesection");

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
      Mother_Name: uMotherName,
      Father_Name: uFattherName,
    })
      .then(() => {
        // alert("User data saved!");
        TableSection.hidden = false;
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
const originalFormSubmit = useForm.onsubmit;

// ✅ Move this OUTSIDE the submit function
const dbRef = ref(db, "users");
onValue(dbRef, (snapshot) => {
  if (!snapshot.exists()) {
    userTableBody.innerHTML = `<tr><td colspan="6">No users found.</td></tr>`;
    TableSection.hidden = true;
    return;
  }

  TableSection.hidden = snapshot.exists() ? false : true;
  let i = 1;
  userTableBody.innerHTML = "";
  snapshot.forEach((childSnapshot) => {
    const childKey = childSnapshot.key;
    const childData = childSnapshot.val();

    userTableBody.innerHTML += `<tr>
      <td>${i}</td>
      <td>${childData.Name}</td>
      <td>${childData.Age}</td>
      <td>${childData.Mother_Name}</td>
      <td>${childData.Father_Name}</td>
      <td>
        <button onclick="editData('${childKey}')" >Edit</button>
        <button onclick="removeData('${childKey}')">Delete</button>
      </td>
    </tr>`;
    i++;
  });

  // Edit user (placeholder)
  window.editData = function (id) {
    const userRef = ref(db, `users/${id}`);
    onValue(
      userRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          userNameElement.value = data.Name;
          userAgeElement.value = data.Age;
          userMotherName.value = data.Mother_Name;
          userFatherName.value = data.Father_Name;

          // Change button text to "Update"
          const submitBtn = useForm.querySelector("button[type='submit']");
          submitBtn.textContent = "Update";
        
          // Replace form submission temporarily
          useForm.onsubmit = function (e) {
            e.preventDefault();

            const updatedData = {
              Name: userNameElement.value.trim(),
              Age: userAgeElement.value.trim(),
              Mother_Name: userMotherName.value.trim(),
              Father_Name: userFatherName.value.trim(),
            };

            set(userRef, updatedData)
              .then(() => {
                alert("User updated!");
                submitBtn.textContent = "Save";
                useForm.onsubmit = originalFormSubmit; // restore original
                userNameElement.value = "";
                userAgeElement.value = "";
                userMotherName.value = "";
                userFatherName.value = "";
              })
              .catch((err) => {
                alert("Update failed: " + err.message);
              });
          };
        }
      },
      {
        onlyOnce: true,
      }
    );
  };

  // Delete user

  window.removeData = function (id) {
    const userRef = ref(db, `users/${id}`);
    remove(userRef)
      .then(() => {
        alert("User deleted Successfully!");
      })
      .catch((error) => {
        alert("Failed to delete user: " + error.message);
      });
  };
});
