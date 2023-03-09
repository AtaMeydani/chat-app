import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const Welcome = () => {
  return (
    <Stack justifyContent="center" alignItems="center" flexGrow={1}>
      <Typography variant="h2">Welcome to teams</Typography>
    </Stack>
  );
};

export default Welcome;
