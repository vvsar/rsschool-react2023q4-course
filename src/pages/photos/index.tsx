import { useState } from "react";
// import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@/components/header/Header";
import styles from "@/styles/Home.module.css";

export default function PhotosPage() {
  const [keyWord, setKeyWord] = useState("");
  const [perPage, setPerPage] = useState("4");
  // const [currentPage, setCurrentPage] = useState("1");
  // const router = useRouter();

  // useEffect(() => {
  //   setKeyWord(localStorage.getItem("keyWord") || "");
  //   setPerPage(localStorage.getItem("perPage") || "4");
  //   setCurrentPage(localStorage.getItem("currentPage") || "1");
  // }, []);

  // useEffect(() => {
  //   if (keyWord) {
  //     router.push(
  //       `/?query=${keyWord}&page=${currentPage}&per_page=${perPage}`,
  //       undefined,
  //       { shallow: true }
  //     );
  //   } else {
  //     router.push(`/?page=rundom&per_page=${perPage}`, undefined, {
  //       shallow: true,
  //     });
  //   }
  // }, []);

  function handleSubmit(value: string) {
    if (value === keyWord) return;
    localStorage.setItem("keyWord", value);
    setKeyWord(value);
    // setCurrentPage("1");
    localStorage.setItem("currentPage", "1");
  }

  function handlePerPageChange(value: string) {
    if (value === perPage) return;
    localStorage.setItem("perPage", value);
    setPerPage(value);
    // setCurrentPage("1");
    localStorage.setItem("currentPage", "1");
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
      <main className={styles.main}>
        <p>SEARCH RESULTS ARE TO BE HERE...</p>
      </main>
    </>
  );
}
