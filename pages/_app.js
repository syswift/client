import '../globalStyle.css';
import '@material-ui/core';
import Navbar from '../component/navbar';
import buildClient from '../api/build-client';
import Head from 'next/head';
import { supabase } from '../api';
import Router from 'next/router';
//import { RouteGuard } from '../api/RouteGuard';
//import privateRoute from '../api/privateRoute';

const global = ({Component, pageProps}) =>{
    
    return (
    <div>     
        <Head>
            <title>零非管理系统</title>
            <link rel="shortcut icon" href='/logo.png'/>
        </Head>
        <Navbar />
        <Component {...pageProps} />
    </div>
    );
}

global.getInitialProps = async (appContext) => {
    //const { data } = await buildClient(appContext.ctx) 

    let pageProps;
    if(appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }

    return {pageProps};
};

export default global;