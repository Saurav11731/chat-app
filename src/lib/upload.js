import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const upload = async (file) => {
  const storage = getStorage();
  const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`upload is ${progress.toFixed(2)}% done`);
        switch (snapshot.state) {
          case "paused":
            console.log("upload is paused");
            break;
          case "running":
            console.log("upload is running");
            break;
        }
      },
      (error) => {
        console.error("Upload failed:", error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};

export default upload;
