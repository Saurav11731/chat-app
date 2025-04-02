import { getStorage, ref } from "firebase/storage";

const Upload = async (file) => {
  const storage = getStorage();

  const mountainsRef = ref(storage, `images/${Date.now() + file.name}`);

  const mountainImagesRef = ref(storage, "images/mountains.jpg");

  mountainsRef.name === mountainImagesRef.name; // true
  mountainsRef.fullPath === mountainImagesRef.fullPath; // false
};
export default Upload;
