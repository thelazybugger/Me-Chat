// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    databaseURL: "your-database-url",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id",
    measurementId: "your-measurement-id"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function sendMessage(message) {
    db.collection("messages").add({
        username: "User",
        text: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        console.log("Message sent");
    }).catch((error) => {
        console.error("Error sending message: ", error);
    });
}


db.collection("messages").orderBy("timestamp").onSnapshot((snapshot) => {
    snapshot.forEach((doc) => {
        console.log(doc.data().text);
        // Display the message on your page
    });
});


db.collection("messages").orderBy("timestamp").onSnapshot((snapshot) => {
    snapshot.forEach((doc) => {
        // Render each message in your chat UI
        console.log(doc.data().text);
    });
});


app.use(express.static('public'));