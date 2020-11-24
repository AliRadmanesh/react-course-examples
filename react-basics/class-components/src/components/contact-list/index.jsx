import React from "react";
import ContactItem from "../contact-item";

import styles from "./style.module.scss";

const mockApiData = [
  {
    name: "Mahsa",
    familyName: "Pahlevani",
    phoneNumber: "+98912123456",
    ID: 0,
  },
  {
    name: "Ali",
    familyName: "Malek",
    phoneNumber: "+98912123456",
    ID: 1,
  },
  {
    name: "Sara",
    familyName: "Eyvani",
    phoneNumber: "+98912123456",
    ID: 2,
  },
];

const fetchFromMockApiEndPoint = (shouldShowError = false) =>
  new Promise((resolvePromise, rejectPromise) =>
    setTimeout(() => {
      return !shouldShowError
        ? resolvePromise(mockApiData)
        : rejectPromise(new Error("Mock API failed"));
    }, 1500)
  );

const sampleContactData = {
  name: "Ali",
  familyName: "Malek",
  phoneNumber: "+98912123456",
  ID: 12,
};

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactsList: [],
    };
  }

  componentDidMount() {
    fetchFromMockApiEndPoint().then(contactsList => {
      this.setState(state => {
        return {
          ...state.contactsList,
          contactsList
        }
      });
    }).catch(error => {
      console.log(error);
    });
  }

  renderContactItem = (contactList) => {
    return (
      <ContactItem contactData={contactList} key={contactList.ID} />
    );
  }
  
  render() {
    const {contactsList} = this.state;

    return (
      <div className={styles.listWrapper}>
        {contactsList.map(contactList => this.renderContactItem(contactList))}
      </div>
    );
  }
}

export default ContactList;
