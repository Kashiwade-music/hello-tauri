import React, { useState } from "react";
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
import FileList from "./components/FileList";
import "./@types/dirData.d.ts";

const handleClick = () => {
  console.info("You clicked the Chip.");
};

function App() {
  const initial_dirData: DirData.RootObject = {
    currentDir: "",
    dataList: [{ isDir: false, name: "" }],
    err: false,
  };

  const [dirData, setDirData] = useState<DirData.RootObject>(initial_dirData);

  const chengeDirectoryTo = (newPath: string) => {
    invoke("get_next_dir_and_return_new_dir_data", {
      newPath: newPath,
    }).then((rustMsg) => {
      setDirData(JSON.parse(rustMsg as string));
      console.log(rustMsg);
    });
  };

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
          <FileList
            currentDir={dirData.currentDir}
            dataList={dirData.dataList}
            err={dirData.err}
          />
        </Box>
      </Box>
      <Button variant="contained" onClick={() => chengeDirectoryTo("../")}>
        Contained
      </Button>
    </div>
  );
}

export default App;
