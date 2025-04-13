import { initializeApp, getApps } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

// Firebase config object (replace with your Firebase project details)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
};

// Initialize Firebase safely
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const storage = getStorage(app);

/**
 * Uploads an image file to Firebase Storage and returns the download URL.
 *
 * @param {File} file - The file object to upload (e.g., from input[type="file"]).
 * @returns {Promise<string|null>} - The public download URL or null if failed.
 */
const Upload = async (file) => {
  if (!file) {
    console.error("No file provided for upload.");
    return null;
  }

  const isValidImage = file && file.type.startsWith("image/");
  if (!isValidImage) {
    console.error("❌ The file is not a valid image.");
    return null;
  }

  try {
    const filename = `images/${uuidv4()}_${file.name}`;
    const fileRef = ref(storage, filename);

    const snapshot = await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log("✅ Image uploaded successfully:", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("❌ Upload failed:", error.message);
    return null;
  }
};

export default Upload;
