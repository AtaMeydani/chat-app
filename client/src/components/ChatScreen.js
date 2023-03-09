import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, AppBar, Toolbar, Avatar, Typography, TextField } from "@mui/material";
import MessageCard from "./MessageCard";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { GET_MESSAGES } from "../graphql/queries";
import SendIcon from "@mui/icons-material/Send";
import { Stack } from "@mui/system";
import { SEND_MESSAGE } from "../graphql/mutations";
import { MSG_SUB } from "../graphql/subscriptions";

const ChatScreen = () => {
  const { id, name } = useParams();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const { data, loading, refetch } = useQuery(GET_MESSAGES, {
    variables: { receiverId: Number(id) },
    onCompleted(data) {
      setMessages(data.messagesByUser);
    },
  });

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    // onCompleted(data) {
    //   setMessages((previousMessages) => [...previousMessages, data.createMessage]);
    // },
  });

  const { data: subData } = useSubscription(MSG_SUB, {
    onSubscriptionData({ subscriptionData: { data } }) {
      setMessages((previousMessages) => [...previousMessages, data.messageAdded]);
    }
  });

  if (subData) console.log(subData)
  return (
    <Box flexGrow={1}>
      <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: 0 }}>
        <Toolbar>
          <Avatar src={`https://api.dicebear.com/5.x/initials/svg?seed=${name}`} sx={{ width: "32px", height: "32px", mr: 2 }} />
          <Typography variant="h6" color="black">
            {name}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box backgroundColor="#f5f5f5" height="75vh" padding="10px" overflow="auto">
        {loading ? (
          <Typography variant="h6">Loading Chats</Typography>
        ) : (
          // data.messagesByUser.map
          messages.map((msg) => {
            return (
              <MessageCard
                key={msg.createdAt}
                text={msg.text}
                date={msg.createdAt}
                direction={msg.receiverId === Number(id) ? "end" : "start"}
              />
            );
          })
        )}
      </Box>

      <Stack direction="row">
        <TextField
          placeholder="Write message here"
          variant="outlined"
          fullWidth
          multiline
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <SendIcon
          fontSize="large"
          onClick={() => {
            sendMessage({
              variables: {
                receiverId: Number(id),
                text: text,
              },
            });
            setText("");
          }}
        />
      </Stack>
    </Box>
  );
};

export default ChatScreen;
