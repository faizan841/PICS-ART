import React from "react";
import {
  Stack,
  Box,
  Typography,
  Input,
  IconButton,
  FormControl,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = forwardRef(({ handleClick, handleLogo }, ref) => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");

  useImperativeHandle(ref, () => ({
    getValue: () => {
      return inputRef.current.value;
    },
    clearValue: () => {
      return (inputRef.current.value = "");
    },
  }));

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (searchValue) {
      navigate(`/search/${searchValue}`);

      handleClick();
    }
  };

  return (
    <Stack
      direction="row"
      spacing={{ xs: 2, md: 5 }}
      alignItems="center"
      sx={{ px: { xs: "1rem", md: "2rem" }, py: "1rem" }}
    >
      <Link to={`/`}>
        <Button variant="text" onClick={handleLogo}>
          <Typography variant="h4">PICS ART</Typography>
        </Button>
      </Link>

      <IconButton onClick={handleSearchClick}>
        <Link to={`/search/${searchValue}`}>
          <SearchIcon />
        </Link>
      </IconButton>

      <Input
        size="small"
        fullWidth
        onChange={(e) => setSearchValue(e.target.value)}
        inputRef={inputRef}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSearchClick(event);
          }
        }}
      />
    </Stack>
  );
});

export default Navbar;
