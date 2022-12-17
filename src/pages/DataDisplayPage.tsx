import React from "react";
import { neoApi } from "../api";
import BarChart from "../components/charts/BarChart";
import useQuery from "../hooks/useQuery";

export default function DataDisplayPage() {
  const { data, error, isLoading } = useQuery({
    queryFn: neoApi.getBrowseNeoApi,
    queryKey: "getBrowseNeoApi",
    transformFn: (data) => {
      return data
        ? data.near_earth_objects.map(({ name, estimated_diameter }) => {
            return [
              name,
              estimated_diameter.kilometers.estimated_diameter_min,
              estimated_diameter.kilometers.estimated_diameter_max,
            ];
          })
        : [];
    },
  });
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      {data ? (
        <BarChart
          titles={[
            "NEO Name",
            "Min Estimated Diameter (km)",
            "Max Estimated Diameter (km)",
          ]}
          width="100%"
          height="400px"
          data={data as (string | number)[][]}
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
      ) : (
        <div>No Data to show</div>
      )}
    </div>
  );
}
