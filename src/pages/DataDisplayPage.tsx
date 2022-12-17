import React from "react";
import { neoApi } from "../api";
import BarChart from "../components/charts/BarChart";
import useQuery from "../hooks/useQuery";

export default function DataDisplayPage() {
  // const { data, error, isLoading } = useQuery({
  //   queryFn: neoApi.getBrowseNeoApi,
  //   queryKey: "getBrowseNeoApi",
  // });
  return (
    <div>
      <BarChart
        titles={[
          "NEO Name",
          "Min Estimated Diameter (km)",
          "Max Estimated Diameter (km)",
        ]}
        width="100%"
        height="400px"
        data={[
          [0, 1, 2],
          [2, 3, 4],
          [4, 5, 6],
          [6, 7, 8],
        ]}
        options={{
          legend: { position: "top" },
          hAxis: {
            title: "Min Estimated Diameter (km)",
            minValue: 0,
          },
          vAxis: {
            title: "Neo Name",
          },
        }}
      />
    </div>
  );
}
