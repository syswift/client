import React from 'react';
import { OutlinedInput, TextField, InputLabel, FormControl, 
         InputAdornment, IconButton, Button, FormHelperText } from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import Router from 'next/router';
import { supabase } from '../../api';

const signup = () => {

    const [values, setValues] = React.useState({
        password: '',
        confirmPassword: '',
        showPassword: false,
        email: '',
        errors: [],
        email_err_text: [],
        is_email_err: false,
        pass_err_text: [],
        is_pass_err: false,
        con_pass_err_text: [],
        is_con_pass_err: false,
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
        const con_password = values.confirmPassword;
        const userName = values.userName;

        setValues({...values,
            is_con_pass_err: false, 
            is_email_err: false,
            is_pass_err: false,
            email_err_text: [],
            pass_err_text: [],
            con_pass_err_text: []
        });

        const { user, session, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })
        if(error) alert(error);
        else {
            const profile = await supabase.from('profiles').insert([
                { id: user.id, name:userName }
              ]);
            console.log(profile);
            Router.push('/');
        }
        

    }
    
    return (
        <form id="signupForm" autoComplete="off" onSubmit={onSubmit}>
            <h1 className='head1'>Sign Up</h1>
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
            <TextField 
                fullWidth
                id="userName" 
                variant="outlined"  
                label="user name"
                placeholder="user name"
                onChange={handleChange('userName')}/>
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
            <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="con-password" error = {values.is_con_pass_err}>Confirm password</InputLabel>
            <OutlinedInput
                id="con-password" 
                error = {values.is_con_pass_err}
                placeholder="Input same password as above"
                type={values.showPassword ? 'text' : 'password'}
                value={values.confirmPassword}
                onChange={handleChange('confirmPassword')}
                labelWidth={130}
                aria-describedby = "con_pass-err"
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
            <FormHelperText id="con_pass-err" error = {values.is_con_pass_err}>
                { values.con_pass_err_text.length > 0 && (
                    <ul className="err_ul">
                        {values.con_pass_err_text.map((error) => 
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
                     sign up
                </Button>
            </ThemeProvider>
            </div>
        </form>
    );
};

export default signup;