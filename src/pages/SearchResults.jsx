import {
  Stack,
  Box,
  Typography,
  ImageList,
  ImageListItem,
  useMediaQuery,
} from "@mui/material";
import { useInfiniteQuery } from "react-query";
import { fetchApi } from "../index";
import { useEffect } from "react";
import { useTheme } from "@emotion/react";
import { useInView } from "react-intersection-observer";
import ImageResults from "../Components/ImageResults";

const SearchResults = ({ query }) => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { ref, inView, entry } = useInView();

  const { data, isError, hasNextPage, fetchNextPage, isSuccess, refetch } =
    useInfiniteQuery({
      queryKey: "search",
      queryFn: async ({ pageParam = 1 }) => {
        const response = await fetchApi(
          `/search/photos?query=${query}`,
          pageParam
        );

        return response;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        console.log(allPages.length);
        return allPages.length + 1;
      },
    });
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    refetch();
  }, [query]);

  let cols = 3;
  if (isMediumScreen && !isSmallScreen) {
    cols = 2;
  } else if (isSmallScreen) {
    cols = 1;
  }
  console.log(data);
  return (
    isSuccess && (
      <>
        <Box sx={{ bgcolor: "#d6c9a1" }}>
          <ImageResults data={data} cols={cols} />
          <div ref={ref}></div>
        </Box>
      </>
    )
  );
};

export default SearchResults;
