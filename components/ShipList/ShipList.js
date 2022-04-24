import React from "react";
import Grid from "@mui/material/Grid";
import Ticket from "../Ticket/ticket";

export default function ShipList({ ships }) {
  return (
    <Grid
      container
      spacing={0}
      justifyContent={"space-between"}
      alignItems={"center"}
      md={12}
      item
    >
      {ships &&
        ships.length > 0 &&
        ships.map((ship, index) => {
          return (
            <Ticket
              key={index}
              name={ship.name}
              cost={ship.cost_in_credits}
              featuredFilms={ship.films}
              length={ship.length}
              max_atmosphering_speed={ship.max_atmosphering_speed}
              crew={ship.crew}
            />
          );
        })}
    </Grid>
  );
}
