import React, {useContext, useState} from 'react';
import { Tab, Box} from '@mui/material';
import { Button } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import { Modal } from '@mui/material';
import { Input, InputLabel, FormControl, Typography } from '@mui/material';
import AppContext from '../../AppContext';
import InputField from './Input'
import  * as Register  from './registerUser';
import PropTypes from 'prop-types';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  


const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    // backgroundImage: `url("https://image.freepik.com/free-photo/white-cinema-screen-with-audience_38187-89.jpg")` 
  };

function BasicModal(){    

    const context = useContext(AppContext);
    
    const [registerUserMessage, setRegisterUserMessage] = useState('');
    const [errors, setErrors] = useState({});    
    const [formValues, setFormValues] = useState({        
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        contact: '',
    });    

    //Form values Handler
    const formHandler = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    //Register Form Validation
    const validateForm = () => {        
        let temp = {};
        temp.firstname = formValues.firstname ? '' : "Required"
        temp.lastname = formValues.lastname ? '' : "Required"
        temp.email = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(formValues.email) ? '' : "Invalid Email"
        temp.password = (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).test(formValues.password) ? '' : "Minimum eight characters, at least one letter and one number"
        temp.contact = formValues.contact.length>9 ? '' : "Min 10 numbers required"
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x == '')
    }  

    //Tab Change Handler
    const handleTabChange = (event, newValue) => {
      context.setTabValue(newValue);
    };

    //Tab Close Handler
    const handleClose = () =>{
        context.setOpen(false);
        context.setLoginMessage('')
        setRegisterUserMessage('');
        resetForm();
    }

    //Login form Handler
    const loginHandler = (e) => {        
        let users = Register.getAllUsers();
        let userCredentials=users.filter(user =>{            
           if(user.email === (formValues.email) && user.password === (formValues.password))
           {
               return user;
           }       
        })        
        if(userCredentials && userCredentials.length>0){
            context.setLoginValue(true);
            context.setLoginMessage('Successfully Logged In! Welcome '+userCredentials[0].firstname)
            setTimeout(()=>{
                handleClose()    
            }, 1500) 
                   
        }
        else{
            context.setLoginMessage("Invalid Username and / Password")
        }        
    }

    //Register a user handler
    const registerHandler = () => {        
        if(validateForm()){
            Register.registerUser(formValues);
            setRegisterUserMessage('Registration Successful. Please Login!');
        }
    }  
    
    //Reset the form
    const resetForm = () => {
        setFormValues({});
        setErrors({});
    }   

    return(
        <>     
            <Modal 
            open={context.openModal}
            onClose={handleClose}
            >
                <Box sx={styleModal} >
                    <TabContext value={context.tabValue}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                                <Tab label="LOGIN"  {...a11yProps(0)}/>
                                <Tab label="REGISTER"  {...a11yProps(0)} />                                
                            </TabList>
                        </Box>
                        {/* First Tab */}
                        <TabPanel value={context.tabValue} index={0}>
                            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                                <FormControl sx={{mt: 3, minWidth: 240, maxWidth: 240}}>
                                    <InputLabel required htmlFor="username">Username</InputLabel>
                                    <Input onChange={formHandler} required type='email' name='email'  id="username" aria-describedby="my-helper-text" />
                                </FormControl>
                                <FormControl sx={{mt:3, minWidth: 240, maxWidth: 240}}>
                                    <InputLabel required htmlFor="password">Password</InputLabel>
                                    <Input onChange={formHandler} required type='password' name='password' id="password" aria-describedby="my-helper-text" />
                                </FormControl>
                                <div style={{color: 'red', textAlign: 'center', marginTop: '10%'}}>{context.loginMessage}</div>
                                <Button onClick={loginHandler} sx={{mt: 3, minWidth: 120, maxWidth: 120}} variant='contained'>Login</Button>
                            </div>
                        </TabPanel>
                        {/* Second Tab */}
                        <TabPanel value={context.tabValue} index={1}>
                            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                                <FormControl sx={{mt:2, minWidth: 240, maxWidth: 240}}>                                
                                    <InputField error={errors.firstname} label='First Name' required type='text' name='firstname' onChange={formHandler} id="firstname"  aria-describedby="my-helper-text" />
                                </FormControl>
                                <FormControl sx={{mt:2, minWidth: 240, maxWidth: 240}}>                               
                                    <InputField error={errors.lastname} required type='text' label='Last Name' name='lastname' onChange={formHandler} id="lastname" aria-describedby="my-helper-text" />
                                </FormControl>
                                <FormControl sx={{mt:2, minWidth: 240, maxWidth: 240}}>                                
                                    <InputField error={errors.email} required type='email' label='Email'  name='email' onChange={formHandler} id="email" aria-describedby="my-helper-text" />
                                </FormControl>
                                <FormControl sx={{mt:2, minWidth: 240, maxWidth: 240}}>                                
                                    <InputField error={errors.password} required type='password' label='Password' name='password' onChange={formHandler} id="password2" aria-describedby="my-helper-text" />                               
                                </FormControl>
                                <FormControl sx={{mt:2, minWidth: 240, maxWidth: 240}}>                                
                                    <InputField error={errors.contact} required type='text' label='Contact No.' name='contact' onChange={formHandler} id="contact" aria-describedby="my-helper-text" />
                                </FormControl>
                                <div style={{fontSize: '15px', color: 'red', textAlign: 'center', marginTop: '10%'}}>{registerUserMessage}</div>
                                <Button onClick={registerHandler} sx={{mt: 4, minWidth: 120, maxWidth: 120}} variant='contained'>Register</Button>
                            </div>
                        </TabPanel>                        
                    </TabContext>
                </Box>
            </Modal>
        </>
    );
}
export default BasicModal;