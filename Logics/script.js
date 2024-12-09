document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");

  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const target = event.currentTarget.getAttribute("data-link");
      if (target) {
        window.location.href = target; 
      }
    });
  });

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
  const database = firebase.database();
  const auth = firebase.auth();

  const registrationForm = document.getElementById('registrationForm');
  const emailInput = document.getElementById('email');
  const thankYouMessage = document.getElementById('thankYouMessage');
  const errorMessage = document.getElementById('errorMessage');
  const submitArrow = document.getElementById('submitIcon'); 

  function handleFormSubmit() {
    const email = emailInput.value.trim();
    const password = "Password@123"; // Using a dummy password for email registration

    if (email) {
      auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          return user.sendEmailVerification();
        })
        .then(() => {
          const timestamp = firebase.database.ServerValue.TIMESTAMP;
          database.ref('registrations').push({
            email: email,
            timestamp: timestamp
          });

          thankYouMessage.style.display = 'block';
          errorMessage.style.display = 'none';

          registrationForm.reset();
        })
        .catch((error) => {
          console.error('Error during registration or email verification:', error);

          errorMessage.style.display = 'block';
          thankYouMessage.style.display = 'none';
        });
    } else {
      alert('Please enter a valid email.');
    }
  }

  submitArrow.addEventListener('click', (event) => {
    event.preventDefault(); 
    handleFormSubmit(); 
  });

  registrationForm.addEventListener('submit', (event) => {
    event.preventDefault(); 
    handleFormSubmit(); 
  });
});
