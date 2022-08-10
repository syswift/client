import React from 'react';
import Router from 'next/router';
import { supabase } from '../api';

const privateRoute = () => {
    React.useEffect(() => {
        // checks if the user is authenticated
        const user = supabase.auth.user();
        if(!user) Router.push('/auth/loginPage');
      }, []);
};

export default privateRoute;