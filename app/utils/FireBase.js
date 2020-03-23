
import firebase from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyCSbzeMN0T5ClNYwT-ObLcK2y_Xap_1B9Q",
    authDomain: "tenedores-9e8e1.firebaseapp.com",
    databaseURL: "https://tenedores-9e8e1.firebaseio.com",
    projectId: "tenedores-9e8e1",
    storageBucket: "tenedores-9e8e1.appspot.com",
    messagingSenderId: "40097652359",
    appId: "1:40097652359:web:a1afa9654dee4ec0bd2222"
  };

export const firebaseApp = firebase.initializeApp(firebaseConfig);

/*<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCSbzeMN0T5ClNYwT-ObLcK2y_Xap_1B9Q",
    authDomain: "tenedores-9e8e1.firebaseapp.com",
    databaseURL: "https://tenedores-9e8e1.firebaseio.com",
    projectId: "tenedores-9e8e1",
    storageBucket: "tenedores-9e8e1.appspot.com",
    messagingSenderId: "40097652359",
    appId: "1:40097652359:web:a1afa9654dee4ec0bd2222"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>
*/