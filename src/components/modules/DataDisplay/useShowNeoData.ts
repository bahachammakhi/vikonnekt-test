import { useCallback, useMemo, useState } from "react";
import { neoApi } from "../../../api";
import { NearEarthObject } from "../../../api/neo/types";
import useQuery from "../../../hooks/useQuery";
import {
  transformEstimatedDiameters,
  transformToTableEstimatedDiameters,
} from "./transformers";

export enum TO_SHOW {
  TABLE = "table",
  CHARTS = "charts",
}

function useShowNeoData() {
  const [filters, setFilters] = useState({
    orbiting_body: "none",
    toShow: TO_SHOW.TABLE,
  });
  const { transformedData, error, isLoading } = useQuery({
    queryFn: neoApi.getBrowseNeoApi,
    queryKey: `getBrowseNeoApi`,
    transformFn: transformToTableEstimatedDiameters(filters),
  });
  const handleChangeFilters = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters((filters) => {
        if (e.target.type === "checkbox") {
          return {
            ...filters,
            [e.target.name]: e.target.checked,
          };
        }
        return {
          ...filters,
          [e.target.name]: e.target.value,
        };
      });
    },
    []
  );

  const chartsData = useMemo(
    () => transformEstimatedDiameters(transformedData as NearEarthObject[]),
    [transformedData]
  );
  return useMemo(
    () => ({
      handleChangeFilters,
      filters: {
        ...filters,
        isTable: filters.toShow === TO_SHOW.TABLE,
        isCharts: filters.toShow === TO_SHOW.CHARTS,
      },
      data: { tableData: transformedData as NearEarthObject[], chartsData },
      error,
      isLoading,
    }),
    [
      chartsData,
      error,
      filters,
      handleChangeFilters,
      isLoading,
      transformedData,
    ]
  );
}

export default useShowNeoData;
