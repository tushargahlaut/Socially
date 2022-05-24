import '../styles/globals.css'
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import Layout from '../comps/Layout'
import {AuthProvider} from "../context/auth"
import { FETCH_POSTS_QUERY } from '../util/gql';
import {useQuery} from '@apollo/client';
import AppContext from '../context/posts';
// import React, { createContext } from "react";



// const posts = () => {

//   const { data, loading, error } = useQuery(FETCH_POSTS_QUERY);
//   if(data) {
//     const { getPosts: posts } = data;
//   }
//   if(error) {
//     console.log(error);
//     return "error"; 
//   }
//     return posts;
// }
// // export const AppContext = createContext();



function MyApp({ Component, pageProps }) {
  // const { data, loading, error } = useQuery(FETCH_POSTS_QUERY);
  // if(data) {
  //   const { getPosts: posts } = data;
  // }
  // if(error) {
  //   console.log(error);
  //   return "error"; 
  // }
  //   // return posts;

  return (
   
    <ApolloProvider client={client}>
       {/* <AppContext.Provider value={data}> */}
    <AuthProvider>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </AuthProvider>
    {/* </AppContext.Provider> */}
    </ApolloProvider>
   
    
   
  )
}



export default MyApp
