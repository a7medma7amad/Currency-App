import './navbar.css'
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Navbar = () => {
  return (
    <div className="navbarBody">
        <div className='buttons'>
            <nav className="navbar">
                <Stack spacing={2} direction="row">
                    <Button variant="contained" >Outlined</Button>
                    <Button variant="contained" >Outlined</Button>
                </Stack>      
            </nav>
        </div>
        
    </div>
    
  );
}
 
export default Navbar;