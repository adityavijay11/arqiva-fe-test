export type IsLoadingType = {
  isLoading: boolean;
  setIsLoading(x: boolean): void;
};

export type TotalType = {
  total: number;
  setTotal(t: number | ((x: number) => void)): void;
};

export type ContributionsContextType = IsLoadingType & TotalType;

export enum ContributionStatus {
  Scheduled = "Scheduled",
  Active = "Active",
  Complete = "Complete",
  unknown = "unknown",
}

export type DataType = {
  contributions: ContributionData[];
  total: number;
  skip: number;
  limit: number;
};

export type ContributionData = {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  owner: string;
};

export type RowData = {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  owner: string;
  status?: ContributionStatus;
};

export type ColumnData = {
  dataKey: keyof RowData;
  label: string;
  numeric?: boolean;
  width?: number;
};
