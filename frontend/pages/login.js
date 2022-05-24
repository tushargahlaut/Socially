import { Box, Button, Container, ListItem, List, Paper, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/auth';


const Login = () => {
    const context=useContext(AuthContext);
    const router = useRouter();
    const [errors,setErrors]=useState({})
    const [values,setValues]=useState({
        username:"",password:""
    });
    const LOGIN_USER=gql`
    mutation login(
        $username:String!
        $password:String!
    ){
        login(
       username:$username 
       password:$password
        ){
            id
            email
            username
            createdAt
            token
        }
    }
    `
    const [loginUser,{loading}] = useMutation(LOGIN_USER,{
        update(proxy,{data:{login:userData}}){
            context.login(userData);
            router.push("/");
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables:values
    })

    const onChange=(e)=>{
        setValues({...values,[e.target.name]:e.target.value});
    }
    const onSubmit=(e)=>{
        e.preventDefault();
        loginUser();
    }
  
    return ( 
        <> 
        <form onSubmit={onSubmit}  noValidate>
            <Paper>
                <Typography variant="h6" sx={{m:3,textAlign:"center"}} >Login Page</Typography>
                <Container sx={{p:2,justifyContent:"center"}} >
                <TextField name="username" value={values.username} onChange={onChange} fullWidth id="outlined-required" margin="normal" sx={{display:"block"}}  label="Username" required variant="outlined" />
                <TextField
                name="password"
                value={values.password}
                onChange={onChange}
                fullWidth
                sx={{display:"block"}}
                margin="normal"
                id="outlined-password-input"
                required
                label="Password"
                type="password"
                autoComplete="current-password"
                />
                <Button type="submit" sx={{display:"flex",marginLeft:"auto",marginRight:"auto"}} size="large" variant="outlined">Login</Button>
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
 
export default Login;