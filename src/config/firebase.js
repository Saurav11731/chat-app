// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjXCTZ6TI6HRz4zqCLPPpdU62l9p2JOMw",
  authDomain: "chat-app-gs-7078c.firebaseapp.com",
  projectId: "chat-app-gs-7078c",
  storageBucket: "chat-app-gs-7078c.firebasestorage.app",
  messagingSenderId: "138202720887",
  appId: "1:138202720887:web:b1d55afb879b5cebc17472"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const signup = async (username, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      username: username.toLowerCase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey there! I am using Chat App",
      lastSeen:  Date.now(),
    });
    await setDoc(doc(db, "chats", user.uid), {
      chatData:[]
    });

  } catch (error) {
    console.error( error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
}
export const login = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error( error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
}
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error( error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
}
export {auth,db};

