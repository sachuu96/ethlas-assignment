import Router from "next/router";
import Link from "next/link";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Index(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Star Wars Starships</title>
        <meta name="description" content="Star wars starships list page" />
      </Head>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.card}>
            <div className={styles.description}>
              <Link href="/home/1" as={`/home/1`}>
                <a>Click here to go Home page for filtering</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
