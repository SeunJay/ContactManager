import React, { useState, useEffect } from "react";
import TextInputGroup from "../layouts/TextInputGroup";
import axios from "axios";

export default function CreateContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const getContacts = async () => {
    await axios
      .get("http://localhost:4000/contacts")
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getContacts();
  }, []);

  const [errors, setErrors] = useState({});

  const onChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();

    //check for errors
    if (formData.name === "") {
      setErrors({ name: "Name is required" });
    }

    if (formData.email === "") {
      setErrors({ email: "Name is required" });
    }

    if (formData.phone === "") {
      setErrors({ phone: "Name is required" });
    }

    const obj = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    };

    axios
      .post("http://localhost:4000/contacts", obj)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

    setFormData({
      name: "",
      email: "",
      phone: ""
    });
  };

  return (
    <div className="card mb-3">
      <div className="card-header center">Add Contact</div>
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <TextInputGroup
            label="Name"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={onChange}
            errors={errors.name}
          />
          <TextInputGroup
            label="Email"
            name="email"
            placeholder="Enter Email"
            type="email"
            value={formData.email}
            onChange={onChange}
            errors={errors.email}
          />
          <TextInputGroup
            label="Phone"
            name="phone"
            placeholder="Enter Phone"
            value={formData.phone}
            onChange={onChange}
            errors={errors.phone}
          />
          <div className="form-group">
            <input
              type="submit"
              value="Add Contact"
              className="btn btn-light btn-black center"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
