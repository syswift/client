import React, { useReducer } from "react";
import Head from "next/head";
import DropZone from "../components/DropZone";
import styles from "../styles/Home.module.css";
import Allfiles from '../components/allFiles';

const dragdrop = () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone };
      case "ADD_FILE_TO_LIST":
        return { ...state, fileList: state.fileList.concat(action.files) };
      default:
        return state;
    }
  };

  // destructuring state and dispatch, initializing fileList to empty array
  const [data, dispatch] = useReducer(reducer, {
    inDropZone: false,
    fileList: [],
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>文件上传</title>
        <meta name="description" content="Nextjs drag and drop file upload" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>文件上传</h1>
        {/* Pass state data and dispatch to the DropZone component */}
        <DropZone data={data} dispatch={dispatch} bucket='userfiles' />
      </main>

    </div>
  );
}

export default dragdrop;