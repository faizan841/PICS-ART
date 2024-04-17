import { Box, Typography } from "@mui/material";

const ProfileIcon = ({ data }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        color: "white",
      }}
    >
      <img
        src={data?.profile_image?.small}
        alt="profile_image"
        style={{ borderRadius: "50%" }}
      />
      <Typography>{data?.first_name}</Typography>
    </Box>
  );
};

export default ProfileIcon;
