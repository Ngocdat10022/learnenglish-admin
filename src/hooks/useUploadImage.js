import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
const useUploaImage = () => {
  const [progress, setProgress] = useState();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const handleUploadImage = (file) => {
    setLoading(true);
    const storage = getStorage();
    const storageRef = ref(storage, "image-learnenglish-app/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressBar =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressBar);
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
          default:
            console.log("");
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
          setLoading(false);
          console.log("downloadURL", downloadURL);
        });
      }
    );
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    console.log("file", file);
    if (!file) return;
    handleUploadImage(file);
  };

  return { handleChangeImage, loading, image, progress };
};

export default useUploaImage;
