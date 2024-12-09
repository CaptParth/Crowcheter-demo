const firebaseConfig = {
  apiKey: "AIzaSyDGSey_MzjdQCq7itOyYT-_TirO9HuJboE",
  authDomain: "crow-demo.firebaseapp.com",
  projectId: "crow-demo",
  storageBucket: "crow-demo.appspot.com",
  messagingSenderId: "406568021706",
  appId: "1:406568021706:web:53ad96f60b63c556808e33",
  measurementId: "G-Z0EK00LTDY"
};

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

let usersData = [];
let currentPage = 1;
const rowsPerPage = 5; 

function fetchAndDisplayUserData() {
  const userRef = ref(database, 'registrations');
  get(userRef).then((snapshot) => {
    const users = snapshot.val();
    if (!users) return;


    document.getElementById('userCount').textContent = usersData.length;

    displayPage(currentPage);
  }).catch((error) => {
    console.error("Error fetching user data:", error);
  });
}

function displayPage(page) {
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const usersToDisplay = usersData.slice(start, end);

  const tableBody = document.getElementById('userTableBody');
  tableBody.innerHTML = '';

  usersToDisplay.forEach(user => {
    const row = tableBody.insertRow();
    const emailCell = row.insertCell(0);
    emailCell.textContent = user.email;
  });

  document.getElementById('prevPage').disabled = page === 1;
  document.getElementById('nextPage').disabled = page * rowsPerPage >= usersData.length;
}

document.getElementById('prevPage').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    displayPage(currentPage);
  }
});

document.getElementById('nextPage').addEventListener('click', () => {
  if (currentPage * rowsPerPage < usersData.length) {
    currentPage++;
    displayPage(currentPage);
  }
});

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = 'login.html';
  } else {
    fetchAndDisplayUserData();
  }
});