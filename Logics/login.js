
const firebaseConfig = {
    apiKey: "AIzaSyDGSey_MzjdQCq7itOyYT-_TirO9HuJboE",
    authDomain: "crow-demo.firebaseapp.com",
    projectId: "crow-demo",
    storageBucket: "crow-demo.appspot.com",
    messagingSenderId: "406568021706",
    appId: "1:406568021706:web:53ad96f60b63c556808e33",
    measurementId: "G-Z0EK00LTDY"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  const loginForm = document.getElementById('loginForm');
  const passwordInput = document.getElementById('password');
  const loginMessage = document.getElementById('loginMessage');
  
  const validPassword = "pass";
  
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const password = passwordInput.value.trim();
  
    if (password === validPassword) {
      window.location.href = "dashboard.html";
    } else {
      loginMessage.style.display = "block";
      loginMessage.textContent = "Invalid Password. Please try again.";
    }
  });
  