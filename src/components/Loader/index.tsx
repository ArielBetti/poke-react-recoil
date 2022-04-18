import { Stack, useTheme } from "@mui/material";
import { ReactElement } from "react";
import { InfinitySpin } from "react-loader-spinner";


const Loader = (): ReactElement => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <InfinitySpin color={`${theme.palette.primary.main}`} width="150px" />
    </Stack>
  );
};

export default Loader;
