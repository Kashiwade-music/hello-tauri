import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import "../@types/dirData.d.ts";

type Props = {
  currentDir: string;
  changeDirectoryTo: (newPath: string) => void;
};

function PathButton(props: Props) {
  let currentDir = props.currentDir
    .split(/[\\|/]/)
    .filter(Boolean)
    .filter((v) => {
      return !["?"].includes(v);
    });

  return (
    <Box sx={{ p: 1, pb: 0 }}>
      <Stack direction="row" spacing={1}>
        {currentDir.map((value, index) => {
          if (index == currentDir.length - 1) {
            return <Chip label={value} />;
          }
          const pathStr = currentDir.slice(0, index + 1).join("/") + "/";
          return (
            <Chip
              label={value}
              variant="outlined"
              onClick={() => {
                props.changeDirectoryTo(pathStr);
              }}
            />
          );
        })}
      </Stack>
    </Box>
  );
}

export default PathButton;
