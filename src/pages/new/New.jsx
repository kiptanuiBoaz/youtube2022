import React, { useEffect, useState } from "react";
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { setDoc, serverTimestamp, doc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable } from "firebase/storage";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    const uploadFile = () => {

      const name = new Date().getTime() + file.name;
      console.log(name);
      // const storageRef = ref(storage, file.name);
    }
    file && uploadFile();
  }, [file])

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        timeStamp: serverTimestamp()
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }

  }

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value })
  }



  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map(({ placeholder, label, id, type }) => (
                <div className="formInput" key={id}>
                  <label>{label}</label>
                  <input id={id} onChange={handleInput} type={type} placeholder={placeholder} />
                </div>
              ))}
              <button onClick={handleAdd}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
