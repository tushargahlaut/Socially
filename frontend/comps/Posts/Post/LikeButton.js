import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Link from 'next/link';
import { gql, useMutation } from '@apollo/client';

const LikeButton = ({post,user}) => {
    const [liked,setLiked] = useState(false);
    const LIKE_POST_MUTATION = gql`
    mutation likePost($postId:ID!){
        likePost(postId:$postId){
            id
            likes{
                id
                username
            }
            likeCount
        }
    }
    `;
    const [likePost] = useMutation(LIKE_POST_MUTATION,{
        variables : {postId: post.id}
    });
    useEffect(()=>{
        if(user && post.likes.find(like=>like.username===user.username)){
            setLiked(true) 
        }
        else
            setLiked(false)
    },[user,post.likes])
    const handleLikes=()=>{
        likePost();
        console.log("Liked");
    }
    const likeButton = user ? (
        liked ? (<Button onClick={handleLikes} variant="outlined" startIcon={<FavoriteIcon />}>
        {post.likeCount}
         </Button>) : 
         <Button onClick={handleLikes} variant="outlined" startIcon={<FavoriteBorderIcon />}>
         {post.likeCount}
          </Button>
    ) : ( 
        <Link href="/login">
            <Button onClick={handleLikes} variant="outlined" startIcon={<FavoriteBorderIcon />}>
        {post.likeCount}
         </Button>
        </Link>
    )
    return likeButton;
}
 
export default LikeButton;