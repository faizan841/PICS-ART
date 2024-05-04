import React from "react";
import {
  Stack,
  Paper,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

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
    <Box
      sx={{
        bgcolor: "#d6c9a1",
        paddingTop: { xs: "10px", sm: "15px", md: "20px", lg: "2rem" },
      }}
    >
      <Paper
        elevation={2}
        spacing={{ xs: 2, md: 5 }}
        square={false}
        sx={{
          display: "flex",
          direction: "row",
          px: { xs: "1rem", md: "2rem", lg: "5rem" },
          py: "1rem",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#2f2626",
          width: "80%",
          margin: "auto",
          borderRadius: "2.5rem",
        }}
      >
        <Link to={`/`}>
          <Button variant="text" onClick={handleLogo}>
            <img src={logo} alt="logo" height={80} width={80} />
          </Button>
        </Link>
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: 20,
            border: "1px solid #e3e3e3",
            pl: 2,
            boxShadow: "none",
            mr: { sm: 5 },
            width: { sm: "60%", md: "50%", lg: "40%" },
          }}
        >
          <input
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setSearchValue(e.target.value)}
            ref={inputRef}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearchClick(event);
              }
            }}
            outline="none"
            border="none"
            sx={{ border: "none", outline: "none" }}
          />
          <IconButton onClick={handleSearchClick}>
            <Link to={`/search/${searchValue}`}>
              <SearchIcon />
            </Link>
          </IconButton>
        </Paper>
      </Paper>
    </Box>
  );
});

export default Navbar;
