import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TextInputGroup from "../layouts/TextInputGroup";
//import BlockButton from "../layouts/TextInputGroup";
import axios from "axios";

export default function Edit(props) {
  console.log(props.match.params.id);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  //const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/contacts/${props.match.params.id}`)
      .then(res => {
        console.log(res.data.contact);
        setFormData({
          name: res.data.contact.name,
          email: res.data.contact.email,
          phone: res.data.contact.email
        });
      });
  }, [props.match.params.id]);

  const onChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();

    const { name, email, phone } = formData;

    const contactObj = {
      name,
      email,
      phone
    };

    axios
      .put(
        `http://localhost:4000/contacts/${props.match.params.id}`,
        contactObj
      )
      .then(res => console.log(res.data))
      .catch(error => console.log(error));

    setFormData({
      name: "",
      email: "",
      phone: ""
    });
  };

  // const onClick = () => {
  //   setIsAvailable(false)
  // };

  // const onClickBlock = () => {
  //   setIsAvailable(true);
  // };

  // let but = null;

  // if (isAvailable) {
  //   but = (
  //     <div>
  //       <input
  //         type="submit"
  //         value="Block Contact"
  //         className="btn btn-light btn-black center mx-2"
  //         onClick={onClick}
  //       />
  //     </div>
  //   );
  // } else {
  //   but = (
  //     <div>
  //       <input
  //         type="submit"
  //         value="Unblock Contact"
  //         className="btn btn-light btn-black center mx-2"
  //         onClick={onClickBlock}
  //       />
  //     </div>
  //   );
  // }

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
              className="btn btn-light btn-black center"
            />
            {/* <input
              type="submit"
              value="Block Contact"
              className="btn btn-light btn-black center mx-2"
            />
            <input
              type="submit"
              value="Unblock Contact"
              className="btn btn-light btn-black center mx-1"
            /> */}
            {/* {but} */}
          </div>
        </form>
      </div>
      <Link to="/">Go back</Link>
    </div>
  );
}
