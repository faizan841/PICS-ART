import React from "react";
import { ThemeProvider } from "@emotion/react";
import { QueryClientProvider, QueryClient } from "react-query";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchResults from "./pages/SearchResults";
import { useState, useRef } from "react";
import InitialResults from "./pages/InitialResults";
import { useTheme } from "@mui/material/styles";
import TopicResult from "./pages/TopicResult";
import TopicsCarousel from "./Components/TopicsCarousel";

const App = () => {
  const theme = useTheme();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  const childRef = useRef(null);
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [carouselValue, setCarouselValue] = useState("");

  const handleClick = () => {
    const inputValue = childRef.current?.getValue();
    if (inputValue !== "") {
      setSearchQuery(inputValue);
      setSearch(true);
    }
  };

  const handleLogo = () => {
    childRef.current?.clearValue();
    setSearch(false);
  };

  const handleCarousel = (value) => {
    setCarouselValue(value);
    console.log(value);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar
            ref={childRef}
            handleClick={handleClick}
            handleLogo={handleLogo}
          />
          <TopicsCarousel handleCarousel={handleCarousel} />
          <Routes>
            <Route
              path="/"
              exact
              element={<InitialResults handleLogo={handleLogo} />}
            />

            <Route
              path="/search/:query"
              element={<SearchResults query={searchQuery} />}
            />

            <Route
              path="/topics/:id/photos"
              element={<TopicResult carouselValue={carouselValue} />}
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
