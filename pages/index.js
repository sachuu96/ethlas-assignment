import React, { useState } from "react";
import Router from "next/router";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ShipList from "../components/ShipList/ShipList";
import Pagination from "../components/Pagination/pagination";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Index(props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(null);

  const onClickPage = (value) => {
    setPage(value);
    if (search) {
      Router.push(`/?search=${search}&page=${value}`);
    } else {
      Router.push(`/?page=${value}`);
    }
  };

  const onChangeSearch = (event) => {
    let value = event.target.value;
    setSearch(value);
  };

  const onSearchClick = () => {
    setPage(1);
    Router.push(`/?search=${search}&page=1`);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Star Wars Starships</title>
        <meta name="description" content="Star wars starships list page" />
      </Head>
      <div className={styles.searchContainer}>
        <div className={styles.searchTextArea}>
          <TextField
            value={search}
            onChange={onChangeSearch}
            placeholder="Search Here..."
          />
        </div>
        <div className={styles.searchTextArea}>
          <Button
            variant="contained"
            style={{
              borderRadius: "6px",
              backgroundColor: "#9F8054",
              color: "#FFFFFF",
              boxShadow: "none",
              width: "fit-content",
              height: "48px",
              border: "1px solid #A0A0A0",
            }}
            onClick={onSearchClick}
          >
            SEARCH
          </Button>
        </div>
      </div>

      <ShipList ships={props.data.results} />
      <div className={styles.paginationWrapper}>
        {props.totalPageCount > 0 && (
          <Pagination
            count={props.totalPageCount}
            onClickPage={onClickPage}
            page={page}
          />
        )}
      </div>
    </div>
  );
}

/*export async function getStaticProps() {
  let response = await fetch("https://swapi.dev/api/starships/");
  const data = await response.json();

  return {
    props: {
      data: data,
      totalPageCount: Math.ceil(data.count / 10),
    },
    revalidate: 10,
  };
}*/

/*export async function getServerSideProps(context) {
  const req = context.req;
  console.log("req-----------------", req.params);

  let response = await fetch("https://swapi.dev/api/starships/");
  const data = await response.json();

  return {
    props: {
      data: data,
      totalPageCount: Math.ceil(data.count / 10),
    },
  };
}*/

Index.getInitialProps = async ({ query: { page = 1, search } }) => {
  let response;
  if (search) {
    response = await fetch(
      `https://swapi.dev/api/starships/?search=${search}&page=${page}`
    );
  } else {
    response = await fetch(`https://swapi.dev/api/starships/?page=${page}`);
  }
  let data = await response.json();
  let filmNames = [];
  for (let i = 0; i < data.results.films?.length; i++) {
    let filmId =
      data.results.films[i].split("/")[
        data.results.films[i].split("/").length - 2
      ];
    let filmResponse = await fetch(`https://swapi.dev/api/films/${filmId}`);
    let filmData = await filmResponse.json();
    filmNames.push({ name: filmData.title, filmId: filmId });
  }
  return {
    data: data,
    totalPageCount: Math.ceil(data.count / 10),
  };
};
