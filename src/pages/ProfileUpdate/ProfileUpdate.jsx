import React, { useEffect, useState } from "react";
import "./ProfileUpdate.css";
import assets from "../../assets/assets";
import { auth, db } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../../lib/upload";

const ProfileUpdate = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [uid, setUid] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const navigate = useNavigate();

  const profileUpdate = async (e) => {
    e.preventDefault();
    console.log("Submitting profile update...", { name, bio, image });

    try {
      const docRef = doc(db, "users", uid);

      if (image) {
        const imgUrl = await Upload(image);
        if (!imgUrl) {
          toast.error("Image upload failed.");
          return;
        }

        await updateDoc(docRef, {
          avatar: imgUrl,
          name,
          bio,
        });

        setPrevImage(imgUrl);
        toast.success("Profile updated with new image.");
      } else {
        // Just update name and bio, no image validation
        await updateDoc(docRef, {
          name,
          bio,
        });

        toast.success("Profile updated successfully.");
      }

      navigate("/chat");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Check console for details.");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        console.log("User UID:", user.uid);

        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("User data fetched:", data);

            if (data.name) setName(data.name);
            if (data.bio) setBio(data.bio);
            if (data.avatar) setPrevImage(data.avatar);
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe(); // Clean up
  }, [navigate]);

  return (
    <div className="profile">
      <div className="profile-container">
        <form onSubmit={profileUpdate}>
          <h3>Profile Details</h3>

          <label htmlFor="avatar">
            <input
              type="file"
              id="avatar"
              accept="image/png, image/jpeg, image/jpg"
              hidden
              onChange={(e) => {
                console.log("Selected image:", e.target.files[0]);
                setImage(e.target.files[0]);
              }}
            />
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : prevImage
                  ? prevImage
                  : assets.avatar_icon
              }
              alt="Upload Preview"
            />
            Upload profile image
          </label>

          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Your name"
            required
          />

          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Write profile bio"
            required
          />

          <button type="submit">Save</button>
        </form>

        <img
          className="profile-pic"
          src={
            image
              ? URL.createObjectURL(image)
              : prevImage
              ? prevImage
              : assets.logo_icon
          }
          alt="Profile Preview"
        />
      </div>
    </div>
  );
};

export default ProfileUpdate;
