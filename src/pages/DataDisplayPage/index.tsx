import React, { useState } from "react";
import { neoApi } from "../../api";
import { NearEarthObject } from "../../api/neo/types";
import BarChart from "../../components/charts/BarChart";
import {
  transformEstimatedDiameters,
  transformToTableEstimatedDiameters,
} from "../../components/modules/DataDisplay/transformers";
import CheckBox from "../../components/ui/CheckBox";
import Select from "../../components/ui/Select";
import Table from "../../components/ui/Table";
import useQuery from "../../hooks/useQuery";

export enum TO_SHOW {
  TABLE = "table",
  CHARTS = "charts",
}

export default function DataDisplayPage() {
  const [filters, setFilters] = useState({
    orbiting_body: "none",
    toShow: TO_SHOW.TABLE,
  });
  const { transformedData, error, isLoading } = useQuery({
    queryFn: neoApi.getBrowseNeoApi,
    queryKey: "getBrowseNeoApi",
    transformFn: transformToTableEstimatedDiameters(filters),
  });

  function handleChangeFilters(e: React.ChangeEvent<HTMLInputElement>) {
    setFilters(() => {
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
  }
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>{error}</div>;

  const chartsData = transformEstimatedDiameters(
    transformedData as NearEarthObject[]
  );
  return (
    <div>
      <div style={{ display: "flex" }} onChange={handleChangeFilters}>
        <CheckBox
          defaultChecked
          value="table"
          name="toShow"
          label="Table"
          type="radio"
        />
        <CheckBox value="charts" name="toShow" label="Charts" type="radio" />
      </div>

      <Select
        onChange={
          handleChangeFilters as unknown as (
            e: React.ChangeEvent<HTMLSelectElement>
          ) => void
        }
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
      {filters.toShow === TO_SHOW.CHARTS &&
      chartsData &&
      (chartsData as (string | number)[][]).length > 0 ? (
        <BarChart
          titles={[
            "NEO Name",
            "Min Estimated Diameter (km)",
            "Max Estimated Diameter (km)",
          ]}
          width="100%"
          height="400px"
          data={chartsData as (string | number)[][]}
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

      {filters.toShow === TO_SHOW.TABLE && (
        <Table
          data={(transformedData as NearEarthObject[]) || []}
          headers={[
            {
              title: "",
              dataIndex: "name",
              render: (row, i) => {
                return `${i}.`;
              },
            },
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
      )}
    </div>
  );
}
