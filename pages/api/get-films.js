//api/get-ships
function handler(req, res) {
  if (req.method === "GET") {
    fetch("https://swapi.dev/api/starships/")
      .then((response) => {
        return { success: true, data: response };
      })
      .catch((err) => {
        return { success: false, data: err };
      });
  }
}

export default handler;
