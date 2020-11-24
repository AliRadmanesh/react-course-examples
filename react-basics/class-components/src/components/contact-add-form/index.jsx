import React, { Component } from 'react';

import styles from './styles.module.scss'

const INITIAL_STATES = {
    name: '',
    familyName: '',
    phoneNumber: ''
};

class ContactAddForm extends Component {
    constructor(props) {
        super(props);

        this.state = INITIAL_STATES;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;

        switch (name) {
            case 'name':
                this.setState({ name: value });
                break;
            case 'familyName':
                this.setState({ familyName: value });
                break;
            case 'phoneNumber':
                this.setState({ phoneNumber: value });
                break;
            default:
                break;
        }
    }

    handleSubmit(event) {
        const { onSubmitForm } = this.props;
        const {name, familyName, phoneNumber } = this.state;
        const formData = { name, familyName, phoneNumber };

        event.preventDefault();
        onSubmitForm(formData);
        this.resetForm();
    }

    resetForm() {
        this.setState(INITIAL_STATES);
    }

    render() {
        const { name, familyName, phoneNumber } = this.state;

        return (
            <form className={styles.form_container} onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={name} onChange={this.handleChange} />
                </label>
                <label>
                    Family Name:
                    <input type="text" name="familyName" value={familyName} onChange={this.handleChange} />
                </label>
                <label>
                    Phone Number:
                    <input type="number" name="phoneNumber" value={phoneNumber} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Add" />
                </form>
        );
    }
}

export default ContactAddForm;