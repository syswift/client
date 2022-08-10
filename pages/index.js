import buildClient from '../api/build-client';

const mainPage = () => {

    return <h1 className='head1'></h1>;
};

mainPage.getInitialProps = async (context) => {

    const {data} = await buildClient(context);

    return data;
};

export default mainPage;