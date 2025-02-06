import { useState, memo } from "react";
import Box from "@mui/material/Box";
import SearchBox from "../components/SearchBox";
import VirtualizedTable from "../components/Table";
import Pagination from "../components/Pagination";
import { DashboardContextProvider } from "../context";

export function Dashboard() {
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <DashboardContextProvider
      value={{
        total,
        setTotal,
        isLoading,
        setIsLoading,
      }}
    >
      <Box>
        <SearchBox />
        <Pagination />
        <VirtualizedTable />
      </Box>
    </DashboardContextProvider>
  );
}

export default memo(Dashboard);
