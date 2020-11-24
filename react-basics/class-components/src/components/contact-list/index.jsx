import React from "react";
import ContactItem from "../contact-item";
import ContactAddForm from "../contact-add-form";

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

    this.renderContactAddForm = this.renderContactAddForm.bind(this);
    this.onSubmitAddForm = this.onSubmitAddForm.bind(this);
  }

  componentDidMount() {
    fetchFromMockApiEndPoint().then(contactsList => {
      this.setState({ contactsList });
    }).catch(error => {
      console.log(error);
    });
  }

  renderContactItem = (contactList) => {
    return (
      <ContactItem contactData={contactList} key={contactList.ID} />
    );
  }

  renderContactAddForm = (contactsList) => {
    if (contactsList.length) {
        return <ContactAddForm onSubmitForm={this.onSubmitAddForm} />;
    }
  }

  onSubmitAddForm = (formData) => {
    const { contactsList } = this.state;

    const lastContactId = contactsList[contactsList.length - 1].ID;
    formData['ID'] = lastContactId + 1;
    console.log(formData);

    this.setState(state => {
      return {
        contactsList: [...state.contactsList, formData]
      };
    });
  }
  
  render() {
    const { contactsList } = this.state;

    return (
      <div className={styles.listWrapper}>
        { this.renderContactAddForm(contactsList) }
        {contactsList.map(contactList => this.renderContactItem(contactList))}
      </div>
    );
  }
}

export default ContactList;
