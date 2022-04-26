import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styles from "./ticket.module.css";
import Button from "@mui/material/Button";
import { Rating } from "react-simple-star-rating";

import DetailsModal from "../Modal/Modal";
import { updateRating, getCurrentShipRating } from "../../reducers/ship";

export default function Ticket({
  name,
  cost,
  featuredFilms,
  length,
  max_atmosphering_speed,
  crew,
  id,
  rate,
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(rate);

  useEffect(() => {
    setValue(rate);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onStartClick = (value) => {
    let shipRatings = JSON.parse(localStorage.getItem("shipRatings"));

    if (shipRatings && shipRatings.length > 0) {
      let updatedShipRatings = [];
      let currentRate = shipRatings.filter((item) => id.toString() === item.id);
      if (currentRate.length > 0) {
        let formattedRatings = shipRatings.map((item) => {
          if (item.id === id.toString()) {
            return { id: item.id, rate: value };
          } else return item;
        });
        updatedShipRatings = [...formattedRatings];
      } else {
        updatedShipRatings = [...shipRatings];
        updatedShipRatings.push({ id: id, rate: value });
      }
      console.log("updatedShipRatings", updatedShipRatings);
      localStorage.setItem("shipRatings", JSON.stringify(updatedShipRatings));
    } else {
      localStorage.setItem(
        "shipRatings",
        JSON.stringify([{ id: id, rate: value }])
      );
    }
    setValue(value);
  };

  return (
    <Fragment>
      <div className={styles.mainWrapper}>
        <div className={styles.nameContainer}>
          <span>Name : {name}</span>
        </div>
        <div className={styles.nameContainer}>
          <span>Cost : {cost}</span>
        </div>
        <div className={styles.nameContainer}>
          <span>featured Films : </span>
        </div>
        <ul>
          {featuredFilms.length > 0 &&
            featuredFilms.map((film, key) => {
              return <li key={key}>{film.name}</li>;
            })}
        </ul>
        <div className={styles.ticketFooter}>
          <Rating onClick={onStartClick} ratingValue={value} />

          <Button onClick={handleOpen}>VIEW</Button>
        </div>
      </div>
      <DetailsModal
        open={open}
        handleClose={handleClose}
        name={name}
        cost={cost}
        featuredFilms={featuredFilms}
        length={length}
        max_atmosphering_speed={max_atmosphering_speed}
        crew={crew}
      />
    </Fragment>
  );
}

Ticket.propTypes = {
  name: PropTypes.string,
  cost: PropTypes.string,
  featuredFilms: PropTypes.array,
  rating: PropTypes.string,
  length: PropTypes.string,
  max_atmosphering_speed: PropTypes.string,
  crew: PropTypes.string,
  id: PropTypes.string,
};

Ticket.defaultProps = {
  name: "CR90",
  cost: "3500000",
  featuredFilms: ["A New Hope", "Return of Jedi", "Revenge of the Sith"],
  rating: null,
  length: "150",
  max_atmosphering_speed: "950",
  crew: "30-165",
  id: null,
};
