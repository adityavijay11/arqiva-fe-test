import { createContext, JSX } from "react";
import { ContributionsContextType, TotalType, IsLoadingType } from "../types";

export const ContributtionsContext = createContext<ContributionsContextType>({
  total: 0,
  setTotal: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

export function DashboardContextProvider({
  children,
  value,
}: {
  children: JSX.Element;
  value: IsLoadingType & TotalType;
}) {
  const newValue: ContributionsContextType = {
    ...value,
  };
  return (
    <ContributtionsContext.Provider value={newValue}>
      {children}
    </ContributtionsContext.Provider>
  );
}

export default ContributtionsContext;
