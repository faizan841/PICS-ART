import { useMediaQuery } from "@mui/material";
import { useInfiniteQuery } from "react-query";
import { fetchApi } from "../index";

import { useEffect } from "react";
import { useTheme } from "@emotion/react";
import { LastPage } from "@mui/icons-material";
import { useInView } from "react-intersection-observer";
import ImageResults from "../Components/ImageResults";

const InitialResults = ({ handleLogo }) => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { ref, inView, entry } = useInView();

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isSuccess } =
    useInfiniteQuery({
      queryKey: "photos",

      queryFn: async ({ pageParam = 1 }) => {
        const response = await fetchApi(`photos`, pageParam);
        return response;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return allPages.length + 1;
      },
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

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
        <ImageResults data={data} cols={cols} />
        <div ref={ref}></div>
      </>
    )
  );
};
export default InitialResults;
