import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TextInputGroup from "../layouts/TextInputGroup";
//import BlockButton from "../layouts/TextInputGroup";
import { toast } from "react-toastify";
import axios from "axios";

export default function Edit(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/contacts/${props.match.params.id}`)
      .then((res) => {
        console.log(res.data.contact);
        setFormData({
          name: res.data.contact.name,
          email: res.data.contact.email,
          phone: res.data.contact.email,
        });
      })
      .catch((err) => console.log(err));
  }, [props.match.params.id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone } = formData;

    const contactObj = {
      name,
      email,
      phone,
    };

    axios
      .put(
        `http://localhost:4000/contacts/${props.match.params.id}`,
        contactObj
      )
      .then((res) => {
        if (res) {
          props.history.push("/");
          toast.success("Contact Updated successfully!");
        }
      })
      .catch((error) => console.log(error));

    setFormData({
      name: "",
      email: "",
      phone: "",
    });
    props.history.push("/");
  };

  const onBlockClick = () => {
    axios
      .post(`http://localhost:4000/contacts/block/${props.match.params.id}`)
      .then((res) => {
        if (res) {
          props.history.push("/");
          toast.success("Contact blocked successfully!");
        }
      })
      .catch((err) => console.log(err));
    setIsAvailable(false);
  };

  const onClickUnBlock = () => {
    setIsAvailable(true);
  };

  let but = null;

  if (isAvailable) {
    but = (
      <div>
        <input
          type="submit"
          value="Block Contact"
          className="btn btn-warning btn-black center my-3"
          onClick={onBlockClick}
        />
      </div>
    );
  } else {
    but = (
      <div>
        <input
          type="submit"
          value="Unblock Contact"
          className="btn btn-primary btn-black center my-3"
          onClick={onClickUnBlock}
        />
      </div>
    );
  }

  return (
    <div className="card mb-3">
      <div className="card-header center">Update Contact</div>
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <TextInputGroup
            label="Name"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={onChange}
          />
          <TextInputGroup
            label="Email"
            name="email"
            placeholder="Enter Email"
            type="email"
            value={formData.email}
            onChange={onChange}
          />
          <TextInputGroup
            label="Phone"
            name="phone"
            placeholder="Enter Phone"
            value={formData.phone}
            onChange={onChange}
          />
          <div className="form-group">
            <input
              type="submit"
              value="Update Contact"
              className="btn btn-primary btn-black center"
            />
            {but}
          </div>
        </form>
      </div>
      <Link to="/">Go back</Link>
    </div>
  );
}
