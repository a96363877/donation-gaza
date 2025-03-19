import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBgaoqCdnsft-7OeF8hZaX1gLB_cCcDsNE",
    authDomain: "dzttsa.firebaseapp.com",
    projectId: "dzttsa",
    storageBucket: "dzttsa.firebasestorage.app",
    messagingSenderId: "700845190471",
    appId: "1:700845190471:web:bd56ec43a0108a2d69b062",
    measurementId: "G-XT6ZYZ7VPQ"
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)
const auth = getAuth(app)
const  datatabas= getDatabase(app)
export { app, db, auth,datatabas }

