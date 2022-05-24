import { gql, useQuery } from "@apollo/client";
import moment from "moment";
import Collapse from '@mui/material/Collapse';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardHeader, Grid } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import ChatIcon from '@mui/icons-material/Chat';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import {AuthContext} from "../context/auth";
import { useContext } from 'react';

import { useState } from "react";
import LikeButton from "../comps/Posts/Post/LikeButton";


export async function getServerSideProps (context) {
   console.log(context.query)
    return {
        props: { 
           id: context.query
        }
    }
}
const Details = (props) => {
  const {user} = useContext(AuthContext)
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const postId=JSON.stringify(props.id.id);
  console.log(postId);
  const FETCH_POST_QUERY = gql`
 {
    getPost(postId: ${postId}) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

   
 const fetchPost = useQuery(FETCH_POST_QUERY);
 const [post,setPost]=useState(fetchPost.data);
 console.log(post);
 function handleComments(){
  console.log("Comments Button Got Clicked");
}

function handleDelete(){
console.log("Deleting Post");
}    

    
    return (
      <div>Details</div> 
//        <Grid sx={{"justifyContent":"center"}}>
//  <Card sx={{ minWidth: 275 }}>
//          <CardHeader avatar={<AccountBoxIcon/>} title={post.username} subheader={moment(post.createdAt).fromNow()}/>   
//         <CardContent>
       
//           <Typography  gutterBottom>
//                 {post.body}
//           </Typography>
       
//         </CardContent>
      
//       <CardActions >
//           <LikeButton post={post} user={user}/>
         
//            <Button onClick={handleExpandClick} variant="outlined" color="success"  startIcon={<ChatIcon />} >
//          {post.commentCount}
//         </Button>
       
        
       

//          {user && user.username === post.username &&(
//         <Button onClick={handleDelete}  variant="outlined" color="error" startIcon={<DeleteIcon/>}/>
//          )}
//         </CardActions>
//         <Collapse in={expanded} timeout="auto" unmountOnExit>
         
//         <CardContent>
//           <Typography paragraph>Method:</Typography>
//           <Typography paragraph>
//             Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
//             aside for 10 minutes.
//           </Typography>
//           <Typography paragraph>
//             Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
//             medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
//             occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
//             large plate and set aside, leaving chicken and chorizo in the pan. Add
//             pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
//             stirring often until thickened and fragrant, about 10 minutes. Add
//             saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
//           </Typography>
//           <Typography paragraph>
//             Add rice and stir very gently to distribute. Top with artichokes and
//             peppers, and cook without stirring, until most of the liquid is absorbed,
//             15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
//             mussels, tucking them down into the rice, and cook again without
//             stirring, until mussels have opened and rice is just tender, 5 to 7
//             minutes more. (Discard any mussels that don’t open.)
//           </Typography>
//           <Typography>
//             Set aside off of the heat to let rest for 10 minutes, and then serve.
//           </Typography>
//         </CardContent>
        
//       </Collapse>
//       </Card>
//        </Grid>
     );
}
 
export default Details;