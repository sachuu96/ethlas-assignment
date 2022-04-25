import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import styles from "./modal.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: "15px",
};

export default function ShareModal({
  open,
  handleClose,
  name,
  cost,
  featuredFilms,
  length,
  max_atmosphering_speed,
  crew,
}) {
  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
      style={{ width: "100%" }}
    >
      <Box sx={{ ...style, border: 0 }}>
        <div className={styles.contentWrapper}>
          <div className={styles.headerContainer}>Details</div>
          <div className={styles.bodyContainer}>
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
                  //let filmId = film.split("/")[film.split("/").length - 2];
                  return (
                    <li key={key}>
                      <Link href={`/${film.filmId}`}>{film.name}</Link>
                    </li>
                  );
                })}
            </ul>
            <div className={styles.nameContainer}>
              <span>Length : {length}</span>
            </div>
            <div className={styles.nameContainer}>
              <span>Max Atmospheric Speed : {max_atmosphering_speed}</span>
            </div>
            <div className={styles.nameContainer}>
              <span>Crew : {crew}</span>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

ShareModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

ShareModal.defaultProps = {
  open: false,
  handleClose: () => {},
};
