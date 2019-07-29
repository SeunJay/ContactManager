import React, {useState} from 'react';
import TextInputGroup from "../layouts/TextInputGroup"

export default function CreateContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone:""
  })

  const [errors, setErrors] = useState({});

  const onChange = e =>{
    const {name, value}= e.target;
    setFormData({...formData, [name]: value})
  }

  return (
    <div className="card mb-3">
      <div className="card-header center">Add Contact</div>
      <div className="card-body">
        <form onSubmit>
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
