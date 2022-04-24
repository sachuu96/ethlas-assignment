import * as React from "react";
import PropTypes from "prop-types";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationRounded({ count, page, onClickPage }) {
  const handleChange = (event, value) => {
    onClickPage(value);
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        page={page}
        shape="rounded"
        size="large"
        onChange={handleChange}
      />
    </Stack>
  );
}

PaginationRounded.propTypes = {
  count: PropTypes.number,
  page: PropTypes.number,
};

PaginationRounded.defaultProps = {
  count: 0,
  page: 1,
};
