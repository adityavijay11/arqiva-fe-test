import { useState, useEffect, useContext, memo, useCallback } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, useLocation } from "react-router-dom";
import ContributionsContext from "../../context";
import { PAGINATION_SIZE } from "../../constants";

export function SearchBox() {
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [isSearch, doSearch] = useState(false);
  const { isLoading } = useContext(ContributionsContext);
  const location = useLocation();
  const navigate = useNavigate();
  const biggerScreen = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const handleSearch = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      const url = new URLSearchParams(location.search);
      url.set("skip", "0");
      url.set("limit", PAGINATION_SIZE);
      if (title) {
        url.set("title", title);
      }
      if (owner) {
        url.set("owner", owner);
      }

      if (url.has("title") && !title) {
        url.delete("title");
      }

      if (url.has("owner") && !owner) {
        url.delete("owner");
      }
      navigate(`?${url.toString()}`);
    },
    [location.search, navigate, title, owner],
  );

  useEffect(() => {
    const url = new URLSearchParams(location.search);
    if (url.has("title")) {
      const titleParam = url.get("title") || "";
      setTitle(titleParam);
    }
    if (url.has("owner")) {
      const ownerParam = url.get("owner") || "";
      setOwner(ownerParam);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      doSearch(false);
    }
  }, [isLoading]);

  return (
    <Box sx={{ mb: 5, mt: 5 }}>
      {" "}
      <form
        onSubmit={handleSearch}
        style={{
          width: !biggerScreen ? "100%" : "auto",
        }}
      >
        <Stack spacing={2}>
          <Stack spacing={2} direction={biggerScreen ? "row" : "column"}>
            <TextField
              id="filled-search"
              label="Search Title"
              type="search"
              variant="filled"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <TextField
              id="filled-search"
              label="Search Owner"
              type="search"
              variant="filled"
              onChange={(e) => setOwner(e.target.value)}
              value={owner}
            />
          </Stack>
          <Box display="flex" justifyContent={biggerScreen ? "left" : "center"}>
            <Button
              variant="contained"
              sx={{ width: 200 }}
              type="submit"
              loading={isLoading && isSearch}
              loadingPosition="end"
              onClick={() => doSearch(true)}
            >
              Search
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}

export default memo(SearchBox);
