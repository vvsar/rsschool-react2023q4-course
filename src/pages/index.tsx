import { useState, useEffect } from "react";
import Head from "next/head";
// import Image from 'next/image';
import Header from "@/components/header/Header";
import RootLayout from "@/layouts/RootLayout";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const [keyWord, setKeyWord] = useState("");
  const [perPage, setPerPage] = useState("4");
  // const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    setKeyWord(localStorage.getItem("keyWord") || "");
    setPerPage(localStorage.getItem("perPage") || "4");
  }, []);

  function handleSubmit(value: string) {
    localStorage.setItem("keyWord", value);
    setKeyWord(value);
  }

  function handlePerPageChange(value: string) {
    localStorage.setItem("perPage", value);
    setPerPage(value);
  }

  return (
    <>
      <Head>
        <title>Find Images on Unsplash</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p style={{ color: "red", padding: "10px 0" }}>
        <b>Module05 is not finished. Please check later!</b>
      </p>
      <Header
        keyWord={keyWord}
        perPage={perPage}
        onSubmit={handleSubmit}
        onPerPageChange={handlePerPageChange}
      />
      <main className={styles.main}></main>
    </>
  );
}

Home.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};
