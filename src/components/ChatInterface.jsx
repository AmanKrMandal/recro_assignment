import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: "user" };
      setMessages([...messages, newMessage]);
      setInput("");

      setTimeout(() => {
        const botReply = { text: "This is a bot reply!", sender: "bot" };
        setMessages((prevMessages) => [...prevMessages, botReply]);
      }, 1000);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      p={2}
      component={Paper}
      elevation={3}
    >
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: 2,
          backgroundColor: "#f5f5f5",
          borderRadius: 1,
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              mb: 2,
              p: 1,
              maxWidth: "70%",
              borderRadius: 2,
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "blue" : "gray",
              color: "white",
            }}
          >
            <Typography variant="body1">{msg.text}</Typography>
          </Box>
        ))}
      </Box>

      <Box
        display="flex"
        sx={{ p: 2, backgroundColor: "white" }}
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button
          onClick={handleSendMessage}
          variant="contained"
          color="primary"
          sx={{ ml: 2 }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatInterface;
