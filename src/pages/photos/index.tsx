import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@/components/header/Header";
import Results from "@/components/results/Results";
import { GetServerSideProps } from "next";
import type { ResponseData } from "@/types/types";
import styles from "@/styles/Home.module.css";

function PhotosPage({ data }: { data: ResponseData }) {
  const [keyWord, setKeyWord] = useState("");
  const [perPage, setPerPage] = useState("4");
  const [currentPage, setCurrentPage] = useState("1");
  const router = useRouter();

  useEffect(() => {
    const searchValue = localStorage.getItem("keyWord") || "";
    setKeyWord(searchValue);
    const perPageValue = localStorage.getItem("perPage") || "4";
    setPerPage(perPageValue);
    const currentPageValue = localStorage.getItem("currentPage") || "1";
    setCurrentPage(currentPageValue);
  }, []);

  useEffect(() => {
    if (keyWord) {
      router.push(
        `/photos/?query=${keyWord}&page=${currentPage}&per_page=${perPage}`,
        undefined,
        { shallow: false },
      );
    }
  }, [keyWord, currentPage, perPage]);

  function handleSubmit(value: string) {
    if (value === keyWord) return;
    if (value === "") {
      router.push("/random");
    }
    localStorage.setItem("keyWord", value);
    setKeyWord(value);
    setCurrentPage("1");
    localStorage.setItem("currentPage", "1");
  }

  function handlePerPageChange(value: string) {
    if (value === perPage) return;
    localStorage.setItem("perPage", value);
    setPerPage(value);
    setCurrentPage("1");
    localStorage.setItem("currentPage", "1");
  }

  // FUNCTION FOR PAGINATION (TEMPORARILY COMMENTED)
  // function handlePageNumberChange(value: string) {
  //   if (value === currentPage) return;
  //   setCurrentPage("1");
  //   localStorage.setItem("currentPage", "1");
  // }

  const results = data.results;

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
        <Results pageType="photos" totalNumber={1} data={results} />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data: ResponseData;
}> = async (context) => {
  console.log(context.query);
  const CLIENT_ID = "cfdYGk4NiOtEue__iSqawbVIwnqHm03dnyVqT6cLXLg";
  const basicUrl = "https://api.unsplash.com/";
  const { query, page, per_page } = context.query;
  const res = await fetch(
    `${basicUrl}search/photos?query=${query}&page=${page}&per_page=${per_page}&client_id=${CLIENT_ID}`,
  );
  const data = await res.json();
  // if (!data) {
  //   return { props: { [] } };
  // }
  return { props: { data } };
};

export default PhotosPage;
