import {
  Stack,
  Box,
  Typography,
  ImageList,
  ImageListItem,
  Button,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import { useState } from "react";
import ProfileIcon from "./ProfileIcon";
import fileDownload from "js-file-download";
import axios from "axios";
import { saveAs } from "file-saver";

const ImageResults = ({ data, cols }) => {
  const [hovered, setHovered] = useState(null);

  function handleDownload(downloadUrl, photoId) {
    axios
      .get(`https://api.unsplash.com/photos/${photoId}/download`, {
        params: {
          client_id: "6l8lgN3LOGgnS_vj-RoAgizckQAiTzi2fQZ9OfC7WJU",
        },
      })
      .then((response) => {
        // If the request is successful, initiate the download
        console.log(response);
        saveAs(response.data.url, "pic.jpg");
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error downloading photo:", error);
      });
  }

  return (
    <Box
      sx={{
        px: { sm: "2rem", lg: "5rem", xl: "10rem" },
        py: "5rem",
        bgcolor: "#d6c9a1",
      }}
    >
      <ImageList gap={30} cols={cols} variant="masonry">
        {data?.pages.map((page, pageIndex) =>
          (page.results || page).map((item, index) => (
            <ImageListItem
              sx={{
                objectFit: "cover",
                maxWidth: "100%",
                position: "relative",
                cursor: "pointer",
                borderRadius: "2rem",
              }}
              key={item.id}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <img
                className="result-image"
                src={item?.urls?.small}
                alt={item?.alt_description}
                loading="lazy"
              />
              {hovered === item.id && (
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(128, 128, 128, 0.2)",
                    transition: "opacity 0.1s",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      gap: "10px",
                      paddingRight: "5px",
                      paddingTop: "10px",
                    }}
                  >
                    <IconButton
                      sx={{ backgroundColor: "white", color: "grey" }}
                      onClick={() =>
                        handleDownload(item?.links?.download_location, item.id)
                      }
                    >
                      <DownloadIcon />
                    </IconButton>
                    <IconButton
                      sx={{ backgroundColor: "white", color: "grey" }}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </Box>
                  <Box sx={{ position: "absolute", bottom: 10, left: 8 }}>
                    <ProfileIcon data={item.user} />
                  </Box>
                </Box>
              )}
            </ImageListItem>
          ))
        )}
      </ImageList>
    </Box>
  );
};

export default ImageResults;
