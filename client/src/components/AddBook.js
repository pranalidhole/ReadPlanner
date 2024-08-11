import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';
import {flowRight as compose} from 'lodash';
import AddAuthor from './AddAuthor';

class AddBook extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            genre: '',
            authorId: ''
        };
    }

    displayAuthors(){
        var data = this.props.getAuthorsQuery;
        if(data.loading){
            return( <option disabled> Loading Authors</option> );
        }else{
            return data.authors.map(author => {

                return( <option key={ author.id } value={author.id}>{ author.name }</option> );
            });
        }
    }
    submitForm(e){
        e.preventDefault()
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{query: getBooksQuery}]
        });
    }
    handleAuthorAdded() {
        this.setState({ showAddAuthorForm: false });
        this.props.getAuthorsQuery.refetch(); // Refetch authors to update the list
    }

    render(){
        return(
            <div>
            <form id="add-book" onSubmit={ this.submitForm.bind(this) }>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={ (e) => this.setState({ name: e.target.value }) }  />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={ (e) => this.setState({ genre: e.target.value }) } />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={ (e) => this.setState({ authorId: e.target.value }) }>
                        <option>Select author</option>
                        { this.displayAuthors() }
                    </select>
                </div>
                <button>+</button>
                <button type="button" className="add-author-btn" onClick={() => this.setState({ showAddAuthorForm: true })}>A</button>

            </form>
            { this.state.showAddAuthorForm && (
                    <AddAuthor onAuthorAdded={this.handleAuthorAdded.bind(this)} />
            )}
            </div>

        );
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);