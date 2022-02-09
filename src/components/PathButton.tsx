import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import "../@types/dirData.d.ts";

function PathButton(props: DirData.RootObject) {
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
          return <Chip label={value} variant="outlined" onClick={() => {}} />;
        })}
      </Stack>
    </Box>
  );
}

export default PathButton;
