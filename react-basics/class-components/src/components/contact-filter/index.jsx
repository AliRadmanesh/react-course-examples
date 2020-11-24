import React, { Component } from 'react';

class ContactFilter extends Component {
    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        const { text, handleFilter } = this.props;

        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Filter:
                    <input type="text" name="name" value={text} onChange={handleFilter} />
                </label>
                </form>
        )
    }
}

export default ContactFilter;