import { ApolloClient, ApolloLink, concat, createHttpLink, InMemoryCache } from "@apollo/client";

const httpLink = createHttpLink({
    uri:"http://localhost:5000"
});


const authLink = new ApolloLink((operation,forward)=>{
    let token;
if (typeof window !== 'undefined') {
    token = localStorage.getItem('jwtToken');
  }

    operation.setContext({
        headers:{
            authorization:`Bearer ${token}`,
        },
    });
    return forward(operation);
});

const client = new ApolloClient({
    link: concat(authLink,httpLink),
    cache: new InMemoryCache(),

});

export default client;