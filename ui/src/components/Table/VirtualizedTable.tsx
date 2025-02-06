import {
  forwardRef,
  useEffect,
  useState,
  useContext,
  useRef,
  memo,
} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import { useLocation } from "react-router-dom";
import { getData } from "../../apis";
import { DataType, RowData, ColumnData } from "../../types";
import { getDateTime, getContributionStatus } from "../../utils";
import ContributionsContext from "../../context";

const columns: ColumnData[] = [
  {
    width: 100,
    label: "Title",
    dataKey: "title",
  },
  {
    width: 100,
    label: "Description",
    dataKey: "description",
  },
  {
    width: 100,
    label: "start time",
    dataKey: "startTime",
  },
  {
    width: 100,
    label: "End time",
    dataKey: "endTime",
  },
  {
    width: 100,
    label: "Owner",
    dataKey: "owner",
  },
  {
    width: 100,
    label: "Status",
    dataKey: "status",
  },
];

export function VirtualizedTable() {
  const { setTotal, isLoading, setIsLoading } =
    useContext(ContributionsContext);
  const location = useLocation();
  const prevController = useRef<AbortController | null>();
  const [data, setData] = useState<DataType>({
    contributions: [],
    total: 0,
    skip: 0,
    limit: 0,
  });

  useEffect(() => {
    if (prevController.current) {
      prevController.current.abort();
      prevController.current = null;
    }
    const controller: AbortController = new AbortController();
    prevController.current = controller;
    (async () => {
      setIsLoading(true);
      const data = await getData<DataType>(location.search, controller);

      if (Object.keys(data).length > 0) {
        setData(data);
        setTotal(data.total);
        setIsLoading(false);
      }
    })();
  }, [location.search]);

  useEffect(
    () => () => {
      if (prevController.current) {
        prevController.current.abort();
      }
    },
    [],
  );

  if (isLoading) {
    return (
      <Skeleton
        variant="rectangular"
        animation="wave"
        width={"100%"}
        height={500}
      />
    );
  }
  const rows: RowData[] = data.contributions;

  const VirtuosoTableComponents: TableComponents<RowData> = {
    Scroller: forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props: {}) => (
      <Table
        {...props}
        sx={{
          borderCollapse: "separate",
          tableLayout: "fixed",
        }}
      />
    ),
    TableHead: forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableHead {...props} ref={ref} />
    )),
    TableRow,
    TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  const fixedHeaderContent = () => {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric ? "right" : "left"}
            style={{ width: column.width }}
            sx={{
              backgroundColor: "background.paper",
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  };

  const rowContent = (_index: number, row: RowData) => {
    const startTime = getDateTime(row.startTime);
    const endTime = getDateTime(row.endTime);
    const status = getContributionStatus(row.startTime, row.endTime);
    const newRow = {
      ...row,
      startTime,
      endTime,
      status,
    };
    return (
      <>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric ? "right" : "left"}
          >
            {newRow[column.dataKey]}
          </TableCell>
        ))}
      </>
    );
  };

  return (
    <Paper style={{ height: 500, width: "100%" }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}

export default memo(VirtualizedTable);
