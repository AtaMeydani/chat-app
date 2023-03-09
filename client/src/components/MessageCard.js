import { Box, Typography } from "@mui/material";
import React from "react";

const MessageCard = ({ text, date, direction }) => {
  return (
    <Box display="flex" justifyContent={direction}>
      <Box backgroundColor="#b6e0e0" borderRadius="10px 15px" padding="10px" marginTop="5px">
        <Typography variant="subtitle2" padding="5px">
          {text}
        </Typography>
        <Typography variant="caption">{new Date(date).toLocaleTimeString()}</Typography>
      </Box>
    </Box>
  );
};

export default MessageCard;
