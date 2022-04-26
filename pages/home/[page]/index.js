import React, { useEffect, useState, Fragment } from "react";
import ShipList from "../../../components/ShipList/ShipList";
import Pagination from "../../../components/Pagination/pagination";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "../../../styles/Home.module.css";
import Router from "next/router";

export default function Page(props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const onClickPage = (value) => {
    setPage(value);
    Router.push(`/home/${value}`);
  };

  const onChangeSearch = (event) => {
    let value = event.target.value;
    setSearch(value);
  };

  const onSearchClick = () => {
    setPage(1);
    Router.push(`/home/1/${search}`);
  };

  return (
    <Fragment>
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
      {props.data && <ShipList ships={props.data.results} />}
      <div className={styles.paginationWrapper}>
        {props.totalPageCount && props.totalPageCount > 0 && (
          <Pagination
            count={props.totalPageCount}
            onClickPage={onClickPage}
            page={page}
          />
        )}
      </div>
    </Fragment>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { page: "1" } },
      { params: { page: "2" } },
      { params: { page: "3" } },
      { params: { page: "4" } },
    ],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { page } = context.params;
  let response;
  // fetch page data
  response = await fetch(`https://swapi.dev/api/starships/?page=${page}`);
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
    props: {
      data: { ...data, results: [...formattedDataResults] },
      totalPageCount: Math.ceil(data.count / 10),
    },
  };
}
