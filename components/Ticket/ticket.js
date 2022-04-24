import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import styles from "./ticket.module.css";

import DetailsModal from "../Modal/Modal";

export default function Ticket({
  name,
  cost,
  featuredFilms,
  rating,
  length,
  max_atmosphering_speed,
  crew,
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <div className={styles.mainWrapper} onClick={handleOpen}>
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
              return <li key={key}>{film}</li>;
            })}
        </ul>
      </div>
      <DetailsModal
        open={open}
        handleClose={handleClose}
        name={name}
        cost={cost}
        featuredFilms={featuredFilms}
        rating={rating}
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
};

Ticket.defaultProps = {
  name: "CR90",
  cost: "3500000",
  featuredFilms: ["A New Hope", "Return of Jedi", "Revenge of the Sith"],
  rating: null,
  length: "150",
  max_atmosphering_speed: "950",
  crew: "30-165",
};
