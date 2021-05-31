//import  gql   from "graphql-tag";
import { gql } from '@apollo/client';

const FETCH_MOVIES = gql`
{
getMovies {
      title
      date 
      yes
      no
     username
  }
}
`;
export default FETCH_MOVIES;