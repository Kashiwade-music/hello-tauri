import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./App.css";
import MyAppBar from "./components/AppBar";
import FileList from "./components/FileList";
import PathButton from "./components/PathButton";
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
    });
  };

  if (dirData.currentDir == "") {
    chengeDirectoryTo("../");
  }
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <MyAppBar />
        <PathButton
          currentDir={dirData.currentDir}
          changeDirectoryTo={chengeDirectoryTo}
        />
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <FileList
            currentDir={dirData.currentDir}
            dataList={dirData.dataList}
            changeDirectoryTo={chengeDirectoryTo}
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
