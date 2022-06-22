import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { Avatar, createMuiTheme, FormControlLabel, ThemeProvider } from '@mui/material';
import { blueGrey, purple } from '@mui/material/colors';
import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
const axios = require('axios');
const theme = createMuiTheme({
  palette: {
    // primary:{
    // main:'#fefefe'
    // },
    secondary: {
      main: '#000000'
    }
  }
})


export default function SignUp() {
  
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')

  const navigate = useNavigate();


  const [usernameError, setUsernameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmpasswordError, setConfirmPasswordError] = useState(false)



  const [usernameErrorHelper, setUsermameErrorHelper] = useState('')
  const [emailErrorHelper, setEmailErrorHelper] = useState('')
  const [passwordErrorHelper, setPasswordErrorHelper] = useState('')
  const [confirmPasswordErrorHelper, setConfirmPasswordErrorHelper] = useState('')

  const [BackendValidationResponse, setBackendValidationResponse] = useState('Invalid input')
  const [BackendValidationError,setBackendValidationError]=useState(false)

  const [open1, setOpen1] = React.useState(false);
      const handleClick1 = () => {
        setOpen1(true);
      };
    
      const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen1(false);
      };
      const [open2, setOpen2] = React.useState(false);
    
      const handleClick2 = () => {
        setOpen2(true);
      };
    
      const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen2(false);
      };
      const Alert = React.forwardRef(function Alert(props, ref) {
    
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });


  const paperStyle = { padding: 20, height: '70vh', width: 450, margin: "150px auto", minheight: '60vh' }
  const avatarStyle = { backgroundColor: '#67c2ffe8' }

  const handleSubmit = (e) => {
    e.preventDefault()

    setUsernameError(false)
    setEmailError(false)
    setPasswordError(false)
    setConfirmPasswordError(false)


    setEmailErrorHelper('')
    setPasswordErrorHelper('')
    setConfirmPasswordErrorHelper('')

   
    if (username == '') {
      setUsernameError(true)
      setUsermameErrorHelper('Username is required')
    }
    else{
      setUsernameError(false)
      setUsermameErrorHelper('')
    }
    if (email == '') {
      setEmailError(true)
      setEmailErrorHelper('Email is required')
    }
    else{
      setEmailError(false)
      setEmailErrorHelper('')
    }
    if (password == '') {
      setPasswordError(true)
      setPasswordErrorHelper('Password is required')
    }
    else{
      setPasswordError(false)
      setPasswordErrorHelper('')
    }
    if (confirmpassword == '') {
      setConfirmPasswordError(true)
      setConfirmPasswordErrorHelper('Confirm Pass is required')
    }
    else{
      setConfirmPasswordError(false)
      setConfirmPasswordErrorHelper('')
    }
    if(password!=confirmpassword){
      setConfirmPasswordError(true)
      setConfirmPasswordErrorHelper('Passwords must match')
    }
    
    if(!usernameError && ! passwordError  && !confirmpasswordError && !emailError){
    axios.post('http://localhost:8000/api/auth/register', {email: email, password: password,username:username})
      .then((res) => {
        console.log(res.data.message)
        if(res.data.message=="Success"){
            navigate("/login");
            setBackendValidationResponse('user created successfully')
            setBackendValidationError(false)
        
        }
        else{
            setBackendValidationResponse(res.data.message)
            setBackendValidationError(true)
            handleClick2();
        }
        }).catch(err => {
            
            console.log(err);
            
        });
    }
    if(BackendValidationResponse=="error"){
      
      
    }
    
  }
  return (




    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}><PersonOutlineOutlinedIcon /></Avatar>
          <h1>Register</h1>
        </Grid>
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
          <Grid container spacing={1}>
          <Grid item xs={6}>
              <TextField
                
               onChange={(e) => setUsername(e.target.value)}
               helperText={usernameErrorHelper}
               error={usernameError}
                label="Username"
                variant="outlined"
                placeholder="Enter Username"
                required
                style={{ width: '100%', margin: "5px 0" }}
              />
            </Grid>

            
            
            
            <Grid item xs={6}>
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                
                label="Email"
                variant="outlined"
                placeholder="Enter Email"
                required S
                error={emailError}
                helperText={emailErrorHelper}
                style={{ width: '100%', margin: "2px 0" }}
                type="email"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                
                label="Password"
                variant="outlined"
                placeholder="Enter Password"
                required S
                error={passwordError}
                helperText={passwordErrorHelper}
                style={{ width: '100%', margin: "2px 0" }}
                type='password'
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                onChange={(e) => setConfirmPassword(e.target.value)}
                label="Confirm Password"
                placeholder="Enter Password"
                variant="outlined"
                required
                type='password'
                error={confirmpasswordError}
                helperText={confirmPasswordErrorHelper}
                style={{ width: '100%', margin: "2px 0" }}

              />
            </Grid>

            
            <Grid item xs={6}>
            Already a member? <Link to onClick={()=>{navigate('/login')}}>Sign In!</Link>
            </Grid>
            
            <Button
              type="submit"
              color="primary"
              variant="contained"
              endIcon={<KeyboardArrowRightOutlinedIcon />}
              style={{ width: '100%', fontSize: 20, margin: '10px 0' }}
            >Sign Up</Button>



          </Grid>
          <Stack spacing={2} sx={{ width: '100%' }}>
      
      <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
          z
        </Alert>
      </Snackbar>
      </Stack>
      <Stack spacing={2} sx={{ width: '100%' }}>
      
      <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
        <Alert onClose={handleClose2} severity="error" sx={{ width: '100%' }}>
        {BackendValidationResponse}
        </Alert>
      </Snackbar>
      </Stack>
        </form>
       
      </Paper>
    </Grid>

    



  );
}