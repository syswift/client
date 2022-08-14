import React, { useReducer } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Allfiles from '../components/allFiles';

const filedownload = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>文件下载</title>
        <meta name="description" content="Nextjs drag and drop file upload" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>文件下载</h1>
        {/* Pass state data and dispatch to the DropZone component */}
        <Allfiles />
      </main>

    </div>
  );
}

export default filedownload;