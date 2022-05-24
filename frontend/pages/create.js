import { AuthContext } from '../context/auth';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Container, TextField, Typography } from '@mui/material';
import { gql, useMutation } from '@apollo/client';


const create = () => {
    const {user,logout}=useContext(AuthContext);
    const [errors,setErrors]=useState({})
    const [values,setValues]=useState({
        body:""
    });
    const onChange=(e)=>{
        setValues({...values,[e.target.name]:e.target.value});
    }
    const CREATE_POST_MUTATION = gql`
        mutation createPost($body:String!){
            createPost(body: $body){
                id
                body 
                createdAt
                username 
                likes{
                    id
                    username
                    createdAt 
                }
                likeCount
                comments{
                    id 
                    body 
                    username
                    createdAt 
                }
                commentCount
            }   
        }
    `;
    const [newPost,{error}] = useMutation(CREATE_POST_MUTATION,{
        variables:values,
        update(proxy,result){
            values.body='';
            router.push("/");
        },
        onError(err){
            console.log(err);
        }
    });
    const router=useRouter();
    const handleSubmit=(e)=>{
        e.preventDefault();
        newPost();
    }
    const createPost = user ? (
        <form noValidate>
        <Container sx={{mt:5}} direction="row" justifyContent="center">
            <Typography variant="h6" textAlign="center">Create New Post</Typography>
        </Container>
        <Container sx={{mt:6}} direction="row" justifyContent="center">
            <TextField
          id="outlined-multiline-static"
          name="body"
          value={values.body}
          onChange={onChange}
          label="Body"
          fullWidth
          multiline
          rows={4}
        />
        <Container sx={{display:"flex",justifyContent:"center",m:3}}>
        <Button onClick={handleSubmit} variant="outlined">Submit</Button>
        </Container>
        </Container>
        </form>
    ) : (<Typography> User Must be logged In... </Typography>)
        if(!user){
            setTimeout(() => {
                // alert("Redirecting to Login Page");
                router.push("/login");
            }, 3000);
        }
    return createPost
}
 
export default create;