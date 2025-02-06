import PaginationComp from "./Pagination";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../themes";
import { DashboardContextProvider } from "../../context";
import { PAGINATION_SIZE } from "../../constants";
import { IsLoadingType, TotalType } from "../../types";

const navigate = jest.fn();
const location = { search: "" };

jest.mock("react-router-dom", () => ({
  useNavigate: () => navigate,
  useLocation: () => location,
}));

jest.mock("../../constants", () => ({
  PAGINATION_SIZE: "14",
  FAST_API_ORIGIN: "http://127.0.0.1:8000/",
}));

const renderComp = (value: IsLoadingType & TotalType) => (
  <ThemeProvider theme={theme}>
    <DashboardContextProvider value={value}>
      <PaginationComp />
    </DashboardContextProvider>
  </ThemeProvider>
);
const getPath = (page: number) =>
  `?skip=${(page - 1) * PAGINATION_SIZE}&limit=${PAGINATION_SIZE}`;

describe("Test <Pagination /> component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const Comp = renderComp({
    isLoading: false,
    total: 50,
    setIsLoading: () => {},
    setTotal: () => {},
  });

  it("tests <Pagination /> at initial page load", async () => {
    render(Comp);
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith(getPath(1));
    });
  });

  it("tests <Pagination /> on changing pagination 2", async () => {
    render(Comp);
    fireEvent.click(screen.getByText(/2/i));
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledTimes(2);
      expect(navigate.mock.calls.at(1)).toEqual([getPath(2)]);
    });
  });

  it("tests <Pagination/> if route changes outside then set Pagination", async () => {
    location.search = getPath(4); //if path ?skip=42&limit=14 on browser search
    render(Comp);
    await waitFor(() => {
      expect(screen.queryByText(/4/i)).toHaveClass("Mui-selected");
    });
  });
});
