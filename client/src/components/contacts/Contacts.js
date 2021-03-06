import React, { useEffect, useState } from "react";
import axios from "axios";
import AvatarImage from "./img_avatar.png";
import { Link } from "react-router-dom";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState([]);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    // console.log(getContacts());
    async function getData() {
      await axios
        .get("http://localhost:4000/contacts")
        .then(res => {
          setContacts(res.data.contacts);
          console.log(res.data.contacts);
          console.log(res.data.contacts._id);
        })
        .catch(err => console.log(err));
    }
    getData();
  }, []);

  const getFirstWord = string => {
    if (!string) return;
    const regex = /([^\s]+)/;

    const word = string
      .match(regex)
      .splice(0, 1)
      .toString();
    return word;
  };

  const handleClick = e => {
    let clickedContact;
    contacts.forEach(contact => {
      if (contact._id === e.target.dataset.id) {
        clickedContact = contact;
      }
    });
    setContact(clickedContact);
    setStatus(true);
  };

  let contactDetails = null;

  if (status) {
    contactDetails = (
      <div className="">
        <h4 className="aside-title">Contact Details</h4>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={AvatarImage} alt="Avatar" className="avatar" />
        </div>
        <ul className="list-group">
          <li className="list-group-item">
            <i className="far fa-user" />
            Name: {contact.name}
          </li>
          <li className="list-group-item">
            <i className="far fa-envelope" />
            Email: {contact.email}
          </li>
          <li className="list-group-item">
            <i className="fas fa-phone" />
            Phone: {contact.phone}
          </li>
        </ul>
        <Link
          to={`/edit/${contact._id}`}
          contact={contact}
          className="edit btn btn-primary btn-black center my-0"
        >
          Edit
        </Link>
      </div>
    );
  }

  let list;

  if (contacts.length === 0) {
    list = (
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  } else {
    list = (
      <div className="details-cont column1">
        {contacts.map(contact => {
          if (contact.name && contact._id) {
            return (
              <p className="contact-name" key={contact._id}>
                <span className="contact-span">{contact.name[0]}</span>
                {getFirstWord(contact.name)}
                <button
                  className="view btn btn-primary btn-black center my-0"
                  onClick={e => handleClick(e)}
                  data-id={contact._id}
                >
                  View
                </button>
              </p>
            );
          }
        })}
      </div>
    );
  }

  return (
    <React.Fragment>
      <h1 className="display-6 mb-2">
        <span className="text-danger">Contact</span> List
      </h1>
      <div className="flex-container">
        {list}
        <aside className="aside">{contactDetails}</aside>
      </div>
    </React.Fragment>
  );
}
