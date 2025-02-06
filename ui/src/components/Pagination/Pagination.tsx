import { useContext, useEffect, useState, memo, useCallback } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, useLocation } from "react-router-dom";
import ContributionsContext from "../../context";
import { ContributionsContextType } from "../../types";
import { PAGINATION_SIZE } from "../../constants";
import { Box } from "@mui/material";

export function PaginationComp() {
  const { total } = useContext<ContributionsContextType>(ContributionsContext);
  const biggerScreen = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const [page, setPage] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const paginationPageCount = Math.ceil(total / PAGINATION_SIZE);
  useEffect(() => {
    if (!location.search) {
      const queryParam = `?skip=${0}&limit=${PAGINATION_SIZE}`;
      navigate(queryParam);
    }
  }, []);

  useEffect(() => {
    const url = new URLSearchParams(location.search);
    const skip = url.get("skip");
    const pageNumber = Math.ceil(Number(skip) / PAGINATION_SIZE) + 1;
    setPage(() => pageNumber);
  }, [location.search]);

  const changePage = useCallback(
    (page: number) => {
      const url = new URLSearchParams(location.search);
      const skip = (page - 1) * PAGINATION_SIZE;
      const limit = PAGINATION_SIZE;
      url.set("skip", `${skip}`);
      url.set("limit", `${limit}`);
      const queryParam = `?${url.toString()}`;
      navigate(queryParam);
    },
    [location.search, navigate],
  );

  return (
    <Box display="flex" justifyContent={biggerScreen ? "left" : "center"}>
      <Pagination
        count={paginationPageCount}
        size={biggerScreen ? "large" : "medium"}
        page={page}
        sx={{ mb: 2 }}
        showFirstButton
        showLastButton
        renderItem={(item) => <PaginationItem {...item} />}
        onChange={(_, page) => changePage(page)}
      />
    </Box>
  );
}

export default memo(PaginationComp);
