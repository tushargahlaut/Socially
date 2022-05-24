import { Grid } from "@mui/material";
import Post from "./Post/Post";

const Posts = ({posts}) => {
   
   
    return ( 
        <Grid sx={{marginTop:"1vh"}} container justifyContent="center" spacing={4}>
            {posts.map((post)=>(
                <Grid item key={post.id} xs={12} sm={6} md={4} lg={3} >
                    <Post post={post}></Post>
                </Grid>
            ))}
        </Grid>
     );
}
 
export default Posts;