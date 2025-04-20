// Import required Firebase modules
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjXCTZ6TI6HRz4zqCLPPpdU62l9p2JOMw",
  authDomain: "chat-app-gs-7078c.firebaseapp.com",
  projectId: "chat-app-gs-7078c",
  storageBucket: "chat-app-gs-7078c.appspot.com",
  messagingSenderId: "138202720887",
  appId: "1:138202720887:web:b1d55afb879b5cebc17472",
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to validate email format
const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

// Function to handle errors properly
const getErrorMessage = (error) => {
  if (!error.code) return "An unexpected error occurred";

  const errorMapping = {
    "auth/email-already-in-use": "Email is already in use. Please log in.",
    "auth/user-not-found": "No account found for this email. Please sign up.",
    "auth/wrong-password": "Incorrect password. Try again.",
    "auth/invalid-email": "Invalid email format.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/network-request-failed":
      "Network error. Check your internet connection.",
  };

  return (
    errorMapping[error.code] || error.code.split("/")[1]?.split("-")?.join(" ")
  );
};

// ✅ **Signup Function**
export const signup = async (username, email, password) => {
  try {
    // Validate input fields
    if (!email || !password || !username) {
      toast.error("All fields are required");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    // Create user with Firebase Authentication
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Save user details to Firestore
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey there! I am using Chat App",
      lastSeen: Date.now(),
    });

    await setDoc(doc(db, "chats", user.uid), {
      chatData: [],
    });

    toast.success("Signup successful! You can now log in.");
  } catch (error) {
    console.error(error);
    toast.error(getErrorMessage(error));
  }
};

// ✅ **Login Function**
export const login = async (email, password) => {
  try {
    // Validate input fields
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    // Sign in user with Firebase Authentication
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successful!");
  } catch (error) {
    console.error(error);
    toast.error(getErrorMessage(error));
  }
};

// ✅ **Logout Function**
export const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Logged out successfully");
  } catch (error) {
    console.error(error);
    toast.error(getErrorMessage(error));
  }
};

// Export Firebase instances
export { auth, db,app};
