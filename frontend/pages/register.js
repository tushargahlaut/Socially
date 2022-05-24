import { gql, useMutation } from '@apollo/client';
import { Box, Button, Container, InputLabel, List, ListItem, Modal, Paper, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';

import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth';

const Register = () => {
    const context=useContext(AuthContext);
    const router = useRouter();
    const [errors,setErrors]=useState({})
    const [values,setValues]=useState({
        username:"",email:"",password:"",confirmPassword:""
    });
    const onChange=(e)=>{
        setValues({...values,[e.target.name]:e.target.value});
    }
    const REGISTER_USER = gql`
    mutation register(
        $username:String!
        $email:String!
        $password:String!
        $confirmPassword:String!
    ){
        register(
            registerInput:{
                username:$username
                email:$email
                password:$password
                confirmPassword:$confirmPassword
            }
        ){
            id email username createdAt token
        }
    }
    `
    const [addUser,{loading}] = useMutation(REGISTER_USER,{
        update(proxy,{data:{register:userata}}){
            context.login(userData);
            alert("Registered Successfully");
            router.push("/login");
        },
        onError(err){
           
            setErrors(err.graphQLErrors[0].extensions.errors);
            
           
        },
        variables:values
    })

    const onSubmit=(e)=>{
        e.preventDefault();
        addUser();
    }
  

    return ( 
        <>
        <form onSubmit={onSubmit} noValidate>
            <Paper>
                <Typography  variant="h6" sx={{m:3,textAlign:"center"}} >Register Page</Typography>
                <Container sx={{p:2,justifyContent:"center"}} >
                <TextField name="username" value={values.username} onChange={onChange} fullWidth id="outlined-required" margin="normal" sx={{display:"block"}}  label="Username" required variant="outlined" />
                <TextField name="email" value={values.email} onChange={onChange} fullWidth id="outlined-required" margin="normal" sx={{display:"block"}}  label="Email" required variant="outlined" />
                <TextField
                onChange={onChange}
                fullWidth
                sx={{display:"block"}}
                margin="normal"
                name="password"
                value={values.password}
                id="outlined-password-input"
                required
                label="Password"
                type="password"
                />
                <TextField
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={onChange}
                fullWidth
                sx={{display:"block"}}
                margin="normal"
                id="outlined-password-input"
                required
                label="Confirm Password"
                type="password"
                />
              
                <Button type="submit" sx={{display:"flex",marginLeft:"auto",marginRight:"auto"}} size="large" variant="outlined">Register</Button>
                </Container>
            </Paper>
        </form>
         {Object.keys(errors).length>0 && (
             <Box>
                 <List>
                     {Object.values(errors).map((value)=>(
                        <ListItem key={value}>{value}</ListItem>
                     ))}
                 </List>
             </Box>
         )}
       </>
     );
}
 
export default Register;