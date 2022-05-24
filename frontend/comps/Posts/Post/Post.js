import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardHeader } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import moment from "moment";
import ChatIcon from '@mui/icons-material/Chat';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import {AuthContext} from "../../../context/auth";
import { useContext } from 'react';
import LikeButton from './LikeButton';

const Post = ({post}) => {
  const {user} = useContext(AuthContext)
    function handleComments(){
        console.log("Comments Button Got Clicked");
    }

  function handleDelete(){
    console.log("Deleting Post");
  }    

    return ( 
        
        <Card sx={{ minWidth: 275 }}>
         <CardHeader avatar={<AccountBoxIcon/>} title={post.username} subheader={moment(post.createdAt).fromNow()}/>   
        <CardContent>
        <Link  href={{
            pathname: `/${post.id}`,
            query: { post:post },
          }} as={`${post.id}`}>
          <Typography  gutterBottom>
                {post.body}
          </Typography>
          </Link>
        </CardContent>
      
      <CardActions >
          <LikeButton post={post} user={user}/>
         <Link   href={{
            pathname: `/${post.id}`,
            query: { post:post },
          }} as={`${post.id}`}>
         <Button onClick={handleComments} variant="outlined" color="success"  startIcon={<ChatIcon />} >
         {post.commentCount}
        </Button>
         </Link>

         {user && user.username === post.username &&(
        <Button onClick={handleDelete}  variant="outlined" color="error" startIcon={<DeleteIcon/>}/>
         )}
        </CardActions>
      </Card>
     );
}
 
export default Post;