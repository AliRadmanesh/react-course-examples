import React from "react";
import ContactItem from "../contact-item";
import ContactAddForm from "../contact-add-form";
import ContactFilterForm from "../contact-filter";

import styles from "./style.module.scss";

let mockApiData = [
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
      filterText: '',
    };

    this.onSubmitAddForm = this.onSubmitAddForm.bind(this);
    this.onFilterList = this.onFilterList.bind(this);
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

  onSubmitAddForm = (formData) => {
    const { contactsList } = this.state;

    const lastContactId = contactsList[contactsList.length - 1].ID;
    formData['ID'] = lastContactId + 1;

    this.setState(state => {
      return {
        contactsList: [...state.contactsList, formData]
      };
    });
    mockApiData = [...mockApiData, formData];
  }

  onFilterList = (event) => {
    const { value } = event.target;

    this.setState(state => {
      let newContactsList;
      if (value === '') {
        newContactsList = mockApiData;
      } else {
        newContactsList = mockApiData.filter(item => {
          const { name, familyName, phoneNumber } = item;
          const [ newName, newFamilyName ] = [ name.toLowerCase(), familyName.toLowerCase() ];
          const [ newValue ] = [ value.toLowerCase() ];
          
          return newName.includes(newValue) || newFamilyName.includes(newValue) || phoneNumber.includes(newValue);
        });
      }

      return {
        filterText: value,
        contactsList: newContactsList
      }
    });
  }

  render() {
    const { contactsList, filterText } = this.state;

    return (
      <div className={styles.listWrapper}>
        <ContactAddForm onSubmitForm={this.onSubmitAddForm} />
        <ContactFilterForm text={filterText} handleFilter={this.onFilterList} />
        {contactsList.map(contactList => this.renderContactItem(contactList))}
      </div>
    );
  }
}

export default ContactList;
