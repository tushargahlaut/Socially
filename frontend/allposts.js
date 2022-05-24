import { FETCH_POSTS_QUERY } from './util/gql';
import {useQuery} from '@apollo/client';
const allposts = () => {
    const { data, loading, error } = useQuery(FETCH_POSTS_QUERY);
  if(data) {
    const { getPosts: posts } = data;
  }
  if(error) {
    console.log(error);
    return "error"; 
  }
    return posts;
}
 
export default allposts;

