import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { addAuthorMutation, getAuthorsQuery } from '../queries/queries';

class AddAuthor extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: ''
        };
    }

    submitForm(e){
        e.preventDefault();
        this.props.addAuthorMutation({
            variables: {
                name: this.state.name
            },
            refetchQueries: [{ query: getAuthorsQuery }]
        }).then(() => {
            this.setState({ name: '' });
            this.props.onAuthorAdded(); // Notify parent component that an author was added
        });
    }

    render(){
        return(
            <form id="add-author" onSubmit={ this.submitForm.bind(this) }>
                <div className="field">
                    <label>Author name:</label>
                    <input type="text" onChange={ (e) => this.setState({ name: e.target.value }) } value={this.state.name} />
                </div>
                <button type="submit">A</button>
            </form>
        );
    }
}

export default graphql(addAuthorMutation, { name: "addAuthorMutation" })(AddAuthor);
