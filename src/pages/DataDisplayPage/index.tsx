import React, { useState } from "react";
import { neoApi } from "../../api";
import BarChart from "../../components/charts/BarChart";
import { transformEstimatedDiameters } from "../../components/modules/DataDisplay/transformers";
import Select from "../../components/ui/Select";
import Table from "../../components/ui/Table";
import useQuery from "../../hooks/useQuery";

export default function DataDisplayPage() {
  const [filters, setFilters] = useState({
    orbiting_body: "none",
  });
  const { transformedData, error, isLoading, data } = useQuery({
    queryFn: neoApi.getBrowseNeoApi,
    queryKey: "getBrowseNeoApi",
    transformFn: transformEstimatedDiameters(filters),
  });

  function handleChangeFilters(e: any) {
    setFilters(() => ({
      ...filters,
      [e.target.name]: e.target.value,
    }));
  }
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      <Select
        onChange={handleChangeFilters}
        name="orbiting_body"
        defaultValue="none"
        options={[
          { name: "Earth", value: "Earth" },
          { name: "Juptr", value: "Juptr" },
          { name: "Mars", value: "Mars" },
          { name: "Merc", value: "Merc" },
          { name: "none", value: "none" },
        ]}
      />
      {transformedData &&
      (transformedData as (string | number)[][]).length > 0 ? (
        <BarChart
          titles={[
            "NEO Name",
            "Min Estimated Diameter (km)",
            "Max Estimated Diameter (km)",
          ]}
          width="100%"
          height="400px"
          data={transformedData as (string | number)[][]}
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

      <Table
        data={data?.near_earth_objects || []}
        headers={[
          {
            title: "Neo Name",
            dataIndex: "name",
          },
          {
            title: "Min Estimated Diameter (km)",
            dataIndex: "estimated_diameter",
            render(record, index) {
              return record.estimated_diameter.kilometers
                .estimated_diameter_min;
            },
          },
          {
            title: "Max Estimated Diameter (km)",
            dataIndex: "estimated_diameter",
            render(record, index) {
              return record.estimated_diameter.kilometers
                .estimated_diameter_max;
            },
          },
        ]}
      />
    </div>
  );
}
