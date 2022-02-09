import React from "react";
import { emit, listen } from "@tauri-apps/api/event";
import { appWindow, WebviewWindow } from "@tauri-apps/api/window";
import { invoke } from "@tauri-apps/api/tauri";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import InboxIcon from "@mui/icons-material/Inbox";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import "./App.css";
import MyAppBar from "./components/AppBar";

const handleClick = () => {
  console.info("You clicked the Chip.");
};

function App() {
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <MyAppBar />
        <Box sx={{ p: 1, pb: 0 }}>
          <Stack direction="row" spacing={1}>
            <Chip label="Clickable" onClick={handleClick} />
            <Chip label="Clickable" variant="outlined" onClick={handleClick} />
          </Stack>
        </Box>
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Trash" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Spam" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
      <Button
        variant="contained"
        onClick={() => {
          console.log("クリックされた");
          invoke("get_next_dir_and_return_new_dir_data", {
            newPath: "../",
          });
        }}
      >
        Contained
      </Button>
    </div>
  );
}

export default App;
