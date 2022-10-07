import { useEffect, useState } from "react";
import Contact from "./Contact";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("/api/contacts")
      .then((res) => res.json())
      .then((contacts) => setContacts(contacts));
  }, []);

  return (
    <div>
      {contacts.map((contact) => (
        <Contact
          key={new Date()}
          name={contact.name}
          phone={contact.phone}
          email={contact.email}
          
        />
      ))}
    </div>
  );
};

export default Contacts;
