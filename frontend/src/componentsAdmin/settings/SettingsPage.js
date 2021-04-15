import React, { useState, useEffect } from "react";
import Setting from "../../shared/settings/Settings";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout, update } from "../../store/slices/userSlice";
import { useForm } from "react-hook-form";
import Profile from "../../shared/users/UpdateProfile";
import axios from "../../store/axios";
import { errorAlert, successAlert } from "../../utils";
import { LoginString } from "../../store/localStorage";

function SettingsPage() {
  const { register, handleSubmit, errors } = useForm();
  const [admin, setadmin] = useState({});
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [editfullname, seteditfullname] = useState("");
  const [motto, setmotto] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [telephone, settelephone] = useState("");
  const [loading, setloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editloading, seteditloading] = useState(false);

  useEffect(() => {
    axios.get(`/school/user/${user?.id}`).then((res) => {
      let data = res?.data.user;
      setadmin(data);
      setname(data?.name);
      setmotto(data?.motto);
      setemail(data?.email);
      setaddress(data?.address);
      settelephone(data?.telephone);
      seteditfullname(data?.fullname);
    });
  }, [user]);

  const handleCancel = (e) => {
    e.preventDefault();
    setname(admin?.name);
    setmotto(admin?.motto);
    setemail(admin?.email);
    setaddress(admin?.address);
    settelephone(admin?.telephone);
  };

  const handleEdit = () => {
    setloading(true);
    axios
      .put(`/school/update/${admin?.userID}`, {
        name,
        address,
        motto,
        email,
        telephone,
      })
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        successAlert("Changes are saved");
        dispatch(
          update({
            name: name,
          })
        );
        localStorage.setItem(LoginString.NAME, name);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        errorAlert("Failed to save changes");
      });
  };

  return (
    <div>
      <h3>School Details</h3>
      <div className="content__container mb-5">
        <form action="" className="p-5">
          <div className="row mb-3">
            <label htmlFor="" className="col-sm-2">
              School Logo
            </label>
            <div className="col-sm-9">
              <Profile id={user?.id} profile={user?.photoUrl} />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-9">
              <input
                onChange={(e) => setname(e.target.value)}
                ref={register({ required: true })}
                value={name}
                type="text"
                className="form-control"
                name="name"
              />
              {errors.name && (
                <span className=" form-error text-danger mb-2">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Full Name</label>
            <div className="col-sm-9">
              <input
                onChange={(e) => seteditfullname(e.target.value)}
                ref={register({ required: true })}
                value={editfullname}
                type="text"
                className="form-control"
                name="fullname"
              />
              {errors.fullname && (
                <span className=" form-error text-danger mb-2">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Motto</label>
            <div className="col-sm-9">
              <input
                onChange={(e) => setmotto(e.target.value)}
                ref={register({ required: true })}
                value={motto}
                type="text"
                className="form-control"
                name="motto"
              />
              {errors.motto && (
                <span className=" form-error text-danger mb-2">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-9">
              <input
                onChange={(e) => setemail(e.target.value)}
                ref={register({ required: true })}
                value={email}
                type="email"
                className="form-control"
                name="email"
              />
              {errors.email && (
                <span className=" form-error text-danger mb-2">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Telephone</label>
            <div className="col-sm-9">
              <input
                onChange={(e) => settelephone(e.target.value)}
                ref={register({ required: true })}
                value={telephone}
                type="tel"
                className="form-control"
                name="telephone"
              />
              {errors.telephone && (
                <span className=" form-error text-danger mb-2">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Address</label>
            <div className="col-sm-9">
              <textarea
                rows={5}
                onChange={(e) => setaddress(e.target.value)}
                ref={register({ required: true })}
                value={address}
                className="form-control"
                name="address"
              />
              {errors.address && (
                <span className=" form-error text-danger mb-2">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="offset-3 col-sm-9">
              <button
                disabled={loading}
                onClick={handleSubmit(handleEdit)}
                className="btn blue__btn"
              >
                {loading && (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                Save Changes
              </button>
              <button onClick={handleCancel} className="btn btn-danger ml-3">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
      <Setting />
    </div>
  );
}

export default SettingsPage;
