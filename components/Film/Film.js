import styles from "./film.module.css";
import PropTypes from "prop-types";

export default function Film({
  title,
  episodeId,
  openingCrawl,
  director,
  producer,
  releasedDate,
}) {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.nameContainer}>
        <span>Title : {title}</span>
      </div>
      <div className={styles.nameContainer}>
        <span>Episode ID : {episodeId}</span>
      </div>
      <div className={styles.nameContainer}>
        <span>Opening Crawl : {openingCrawl}</span>
      </div>
      <div className={styles.nameContainer}>
        <span>Director : {director}</span>
      </div>
      <div className={styles.nameContainer}>
        <span>Producer : {producer}</span>
      </div>
      <div className={styles.nameContainer}>
        <span>Release Date as dd/mm/yyyy : {releasedDate}</span>
      </div>
    </div>
  );
}

Film.propTypes = {
  title: PropTypes.string,
  episodeId: PropTypes.number,
  openingCrawl: PropTypes.string,
  director: PropTypes.string,
  producer: PropTypes.string,
  releasedDate: PropTypes.string,
};

Film.defaultProps = {
  title: "title",
  episodeId: 1,
  openingCrawl: "openingCrawl",
  director: "director",
  producer: "producer",
  releasedDate: "releasedDate",
};
