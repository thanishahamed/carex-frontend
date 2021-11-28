import { CButton, CInput, CLabel } from "@coreui/react";
import { UpdateRounded } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Authenticate from "src/Authenticate";
import { loadUserData } from "src/store/actions/user";
import Swal from "sweetalert2";
import ProfilePic from "./ProfilePic";

export default function UpdateProfilePhoto(props) {
  const [img, setImg] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [updating, setUpdating] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setImg(props.image);
  }, []);

  const selectImage = (e) => {
    setSelectedImage(e.target.files[0]);
    setImg(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files);
  };

  const upload = () => {
    setUpdating(true);
    var formData = new FormData();
    formData.append("id", props.id);
    formData.append("file", selectedImage);
    axios
      .post(
        process.env.REACT_APP_SERVER + "/update-profile-image",
        formData,
        Authenticate.header()
      )
      .then((response) => {
        console.log(response.data);
        setSelectedImage(null);
        setUpdating(false);
        dispatch(loadUserData());
        Swal.fire({
          title: "Profile Photo Updated!",
          buttonsStyling: "none",
          timer: 1500,
          icon: "success",
          showConfirmButton: false,
          timerProgressBar: true,
        });
      })
      .catch((error) => {
        setUpdating(false);
        console.log(error.response.data);
      });
  };
  return (
    <div>
      <CLabel htmlFor="image-load" className="input-file">
        {img ? <img src={img} width="100%" alt="profile" /> : <ProfilePic />}
      </CLabel>
      <CInput type="file" id="image-load" hidden onChange={selectImage} />
      <br />
      {updating ? "Updating" : ""}
      {selectedImage ? (
        <CButton className="save-button" color="light" onClick={upload}>
          Update Image
        </CButton>
      ) : (
        ""
      )}
    </div>
  );
}
