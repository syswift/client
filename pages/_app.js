import '../globalStyle.css';
import '@material-ui/core';
import Navbar from '../component/navbar';
import buildClient from '../api/build-client';
import Head from 'next/head';
import { supabase } from '../api';
import Router from 'next/router';
//import { RouteGuard } from '../api/RouteGuard';
//import privateRoute from '../api/privateRoute';

const global = ({Component, pageProps, auth_level}) =>{
    
    return (
    <div>     
        <Head>
            <title>零非管理系统</title>
            <link rel="shortcut icon" href='/logo.png'/>
        </Head>
        <Navbar auth_level={ auth_level}/>
        <Component {...pageProps} />
    </div>
    );
}

global.getInitialProps = async (appContext) => {
    //const { data } = await buildClient(appContext.ctx) 

    let pageProps;
    let auth_level;
    if(appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }

    try {
        const{data, error} = await supabase.from('profiles').select().eq('id',supabase.auth.user().id).single();

        if(error) throw error;

        //console.log(data.auth_level);

        auth_level = data.auth_level;
      } catch (error) {
        console.log(error);
      }

    return {pageProps, auth_level};
};

export default global;