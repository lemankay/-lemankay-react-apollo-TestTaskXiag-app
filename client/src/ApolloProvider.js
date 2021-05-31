
import React from 'react';
import { ApolloProvider,InMemoryCache,ApolloClient, createHttpLink} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './App.css';
import App from './App';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

  const Provider = () => {
    return (
      <ApolloProvider client={client}>  
          <App />   
      </ApolloProvider>
    );
  }

export default Provider;
