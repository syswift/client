import React, { useState } from 'react';
import { OutlinedInput, TextField, InputLabel, FormControl, 
         InputAdornment, IconButton, Button, FormHelperText } from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import Router from 'next/router';
import { supabase } from '../../api';

const signin = () => {

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
        email: '',
        errors: [],
        email_err_text: [],
        is_email_err: false,
        pass_err_text: [],
        is_pass_err: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#757CE8',
            },
            secondary: {
                main: '#FFFFFF',
            },
        },
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        
        const email = values.email;
        const password = values.password;

        setValues({...values,
            is_email_err: false,
            is_pass_err: false,
            email_err_text: [],
            pass_err_text: [],
        });

        //const [loading, setloading] = useState(false);

        try {
            //setloading(true);
            const { user, error } = await supabase.auth.signIn({
                email: email,
                password: password,
            });

            //success sign up
            if(!error) 
            {
                console.log(user); 
                alert('登录成功');
                Router.push('/');
            }
            else throw error;
            
        } catch (error) {
            alert('登录信息错误');
        } finally {
            //setloading(false);
        }                   
            
    }
    
    return (
        <form id="signupForm" autoComplete="on" onSubmit={onSubmit}>
            <h1 className='head1'>Log In</h1>
            <div className="comp">
            <TextField 
                helperText = { values.email_err_text.length > 0 && (
                    <ul className="err_ul">
                        {values.email_err_text.map((error)=>
                            <li key={error}>{error}</li>
                        )}
                    </ul>
                )}
                error = {values.is_email_err}
                fullWidth
                id="email" 
                variant="outlined"  
                type="email"
                label="Email"
                placeholder="Input a valid email address"
                onChange={handleChange('email')}/>
            </div>

            <div className="comp">
            <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="password" error = {values.is_pass_err}>{'Password'}</InputLabel>
            <OutlinedInput
                id="password" 
                error = {values.is_pass_err}
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                placeholder="Password must be between 8 and 20 characters"
                onChange={handleChange('password')}
                labelWidth={70}
                aria-describedby = "pass-err"
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            <FormHelperText id="pass-err" error = {values.is_pass_err}>
                { values.pass_err_text.length > 0 && (
                    <ul className="err_ul">
                        {values.pass_err_text.map((error)=>
                            <li key={error}>{error}</li>
                        )}
                    </ul>
                )}
            </FormHelperText>
            </FormControl>
            </div>

            <div className="comp">
            <ThemeProvider theme={theme}>
                <Button fullWidth type="submit" variant="contained" color="primary">
                     Log In
                </Button>
            </ThemeProvider>
            </div>
        </form>
    );
};

export default signin;