import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ShipList from "../components/ShipList/ShipList";
import Pagination from "../components/Pagination/pagination";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { setDetails } from "../reducers/ship";

export default function Index(props) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    console.log("This is props", props);
    dispatch(setDetails({ details: props.data }));
  }, []);

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
  let formattedDataResults = [];

  for (let i = 0; i < data.results.length; i++) {
    let formattedFilms = [];
    for (let j = 0; j < data.results[i].films.length; j++) {
      let filmId =
        data.results[i].films[j].split("/")[
          data.results[i].films[j].split("/").length - 2
        ];
      let filmResponse = await fetch(`https://swapi.dev/api/films/${filmId}`);
      let filmData = await filmResponse.json();
      formattedFilms.push({ name: filmData.title, filmId: filmId });
    }
    formattedDataResults.push({
      ...data.results[i],
      id: data.results[i].url.split("/")[
        data.results[i].url.split("/").length - 2
      ],
      rating: null,
      films: [...formattedFilms],
    });
  }

  return {
    data: { ...data, results: [...formattedDataResults] },
    totalPageCount: Math.ceil(data.count / 10),
  };
};
