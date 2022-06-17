import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import StateContext from "../../context/StateContext";
import DispatchContext from "../../context/DispatchContext";
import { WebcamCapture } from "../WebCam";

export default function Profile() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [updateprofileView, setUpdateProfileView] = useState(false);

  const [newName, setNewName] = useState(appState.user.username);
  const [newEmail, setNewEmail] = useState(appState.user.email);
  const [phone, setPhone] = useState(appState.user.phone);
  // const deafultImg = () => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL();
  //   reader.onloadend = function () {
  //     console.log(reader.result);
  //   };
  // };
  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });
  const [friends, setFriends] = useState(0);
  const [disp, setDisp] = useState(false);

  const handleInputFile = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    // console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      console.log(reader.result);
      setuserInfo({
        ...userInfo,
        file,
        filepreview: reader.result,
      });
    };
  };

  const updateFriend = (num) => {
    setFriends(num);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", newEmail);
    data.append("name", newName);
    data.append("phone", phone);
    data.append("photo", userInfo.file);
    // console.log(data.entries());
    console.log(data);
    try {
      const res = await axios.patch("/api/user/updateMe", data, {
        headers: {
          Authorization: `Bearer ${appState.token}`,
        },
      });
      console.log(res.data);
      if (res.data && res.data.photo !== "") {
        appDispatch({
          type: "flashMessage",
          value: "You profile was updated successfully!",
          status: true,
        });
        appDispatch({ type: "updateProfile", data: res.data });
      } else {
        appDispatch({
          type: "flashMessage",
          value: "There was an error!",
          status: false,
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    axios
      .get("/api/user/getFriends", {
        headers: {
          Authorization: `Bearer ${appState.token}`,
        },
      })
      .then((res) => {
        // console.log("heyy");
        updateFriend(res.data.friends);
      })
      .catch((e) => {
        console.log("Error");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState.token]);

  return (
    <>
      <main className="main">
        <div className="user-view">
          <div className="user-view__content">
            {!updateprofileView && (
              <>
                <div className="userdetails text-center mb-5">
                  <img
                    className="form__user-photo mb-3"
                    src={
                      appState.user.photo
                        ? appState.user.photo
                        : "/images/misc/default.png"
                    }
                    alt="User"
                  />
                  <h2 className="heading-secondary">
                    {appState.user.username}
                  </h2>
                </div>
                <div className="usersFriends text-center">
                  <div className="row">
                    <div className="col-6">
                      <h2 className="heading-secondary">{friends}</h2>
                      <h5 className="heading-secondary">Friends</h5>
                    </div>
                    <div className="col-6">
                      <h2 className="heading-secondary">Email</h2>
                      <h5 className="heading-secondary">
                        {appState.user.email}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="mt-5 text-center updateProfile">
                  <span onClick={() => setUpdateProfileView(true)}>
                    Wanna Update Profile?
                  </span>
                </div>
              </>
            )}

            {updateprofileView && (
              <div className="user-view__form-container">
                <h2 className="heading-secondary ma-bt-md">
                  Your account settings
                </h2>
                <form
                  className="form form-user-data"
                  onSubmit={handleProfileSubmit}
                >
                  <div className="form__group">
                    <label className="form__label" htmlFor="name">
                      Name
                    </label>
                    <input
                      onChange={(e) => setNewName(e.target.value)}
                      className="form__input"
                      id="name"
                      type="text"
                      value={newName}
                      required="required"
                    />
                  </div>
                  <div className="form__group ma-bt-md">
                    <label className="form__label" htmlFor="email">
                      Email address
                    </label>
                    <input
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="form__input"
                      id="email"
                      type="email"
                      value={newEmail}
                      required="required"
                    />
                  </div>
                  <div className="form__group ma-bt-md">
                    <label className="form__label" htmlFor="phone">
                      Phone no.
                    </label>
                    <input
                      onChange={(e) => setPhone(e.target.value)}
                      className="form__input"
                      id="phone"
                      type="text"
                      value={phone}
                      placeholder="+91-"
                      required="required"
                    />
                  </div>
                  {!disp && (
                    <>
                      <div className="form__group form__photo-upload">
                        <img
                          className="form__user-photo"
                          src={
                            userInfo.filepreview
                              ? userInfo.filepreview
                              : "/images/misc/default.png"
                          }
                          alt="User"
                        />
                        <input
                          onChange={(e) => handleInputFile(e)}
                          // value = {}
                          className="form__upload"
                          type="file"
                          accept="image/*"
                          id="photo"
                          name="photo"
                        />
                        <label className="form__label" htmlFor="photo">
                          Choose new photo
                        </label>
                        <label
                          className="form__label"
                          onClick={() => setDisp(!disp)}
                        >
                          Take new photo
                        </label>
                      </div>
                    </>
                  )}
                  {disp && (
                    <>
                      <WebcamCapture />
                      <label
                        className="form__label"
                        htmlFor="photo"
                        onClick={() => setDisp(!disp)}
                      >
                        Browse
                      </label>
                    </>
                  )}
                  <div className="form__group right">
                    <button className="btn btn--small btn--green">
                      Update
                    </button>
                  </div>
                </form>
                <div className="mt-5 text-center updateProfile">
                  <span onClick={() => setUpdateProfileView(false)}>
                    Go back to Profile?
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
