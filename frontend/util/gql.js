import { gql } from "@apollo/client";


export const FETCH_POSTS_QUERY = gql`
 { getPosts{
    id
    body
    username
    likeCount
    createdAt
    likes{
      username
    }
    commentCount
    comments{
      id
      username
      createdAt
      body
    }
  }
 }
`;