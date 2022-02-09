import List from "@mui/material/List";
import FolderIcon from "@mui/icons-material/Folder";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import "../@types/dirData.d.ts";

type Props = {
  currentDir: string;
  dataList: DirData.DataList[];
  changeDirectoryTo: (newPath: string) => void;
};

function FileList(props: Props) {
  let currentDir = props.currentDir
    .split(/[\\|/]/)
    .filter(Boolean)
    .filter((v) => {
      return !["?"].includes(v);
    });
  return (
    <List>
      {props.dataList.map((value, index) => {
        const pathStr = currentDir.join("/") + "/" + value.name + "/";
        if (value.isDir) {
          return (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  props.changeDirectoryTo(pathStr);
                }}
              >
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary={value.name} />
              </ListItemButton>
            </ListItem>
          );
        } else {
          return (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TextSnippetIcon />
                </ListItemIcon>
                <ListItemText primary={value.name} />
              </ListItemButton>
            </ListItem>
          );
        }
      })}
    </List>
  );
}

export default FileList;
