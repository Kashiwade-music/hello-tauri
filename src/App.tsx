import React from "react";
import logo from "./logo.svg";
import tauriCircles from "./tauri.svg";
import { emit, listen } from "@tauri-apps/api/event";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import List from "@mui/material/List";
import InboxIcon from "@mui/icons-material/Inbox";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import tauriWord from "./wordmark.svg";
import "./App.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const handleClick = () => {
  console.info("You clicked the Chip.");
};

function App() {
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              File Explorer
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Folder Path"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
        </AppBar>
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
    </div>
  );
}

export default App;
