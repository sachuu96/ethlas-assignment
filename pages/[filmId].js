import Film from "../components/Film/Film";

export default function SingleFilmPage(props) {
  return (
    <Film
      title={props.data.title}
      episodeId={props.data.episode_id}
      openingCrawl={props.data.opening_crawl}
      director={props.data.director}
      producer={props.data.producer}
      releasedDate={props.data.release_date}
    />
  );
}

export async function getStaticPaths() {
  let response = await fetch("https://swapi.dev/api/films/");
  const data = await response.json();

  return {
    fallback: false,
    paths: data.results.map((film) => ({
      params: { filmId: film.episode_id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  console.log("context.params", context.params);
  const filmId = context.params.filmId;
  let response = await fetch(`https://swapi.dev/api/films/${filmId}`);
  const data = await response.json();

  return {
    props: {
      data: data,
    },
    revalidate: 10,
  };
}
