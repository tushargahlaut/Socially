import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { Container, IconButton } from '@mui/material';
import { AuthContext } from '../context/auth';
import { useContext } from 'react';

const Navbar=()=> {
  const {user,logout}=useContext(AuthContext);
  const navbar = user ? (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <Container >
            <Link href="/">
          <Typography variant="h6" component="Button" >
            Home
          </Typography>
          </Link>
            </Container>
         {/* <Button  startIcon={<AccountCircleIcon/>} color="inherit">{user.username}</Button> */}
          <Container sx={{display:"flex",justifyContent:"flex-end"}}>
          
          
          <Link href="/create">
          <Button color="inherit">Create New Post</Button>
          </Link>
         
         
          <Button onClick={logout} color="inherit">Logout</Button>
   
          </Container>
          
        </Toolbar>
      </AppBar>
    </Box>
  ) : (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <Container >
            <Link href="/">
          <Typography variant="h6" component="Button" >
            Home
          </Typography>
          </Link>
            </Container>
         
          <Container sx={{display:"flex",justifyContent:"flex-end"}}>
          <Link href="/login">
          <Button color="inherit">Login</Button>
          </Link>
          <Link href="/register">
          <Button color="inherit">Register</Button>
          </Link>
          </Container>
          
        </Toolbar>
      </AppBar>
    </Box>
  )
  return navbar;
}

export default Navbar;