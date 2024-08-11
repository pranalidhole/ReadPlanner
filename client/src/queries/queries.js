import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`;

const addBookMutation = gql`
    mutation AddBook($name: String!, $genre: String!, $authorId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`;
const getBookQuery = gql`
    query($id: String){
    book(id: $id){
        id
        name
        genre
        author{
            id
            name
            age
            books{
                name
                id
                }
            }
        }
    }
`;

const addAuthorMutation = gql`
    mutation($name: String!) {
        addAuthor(name: $name) {
            name
            id
        }
    }
`;
export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery, addAuthorMutation };