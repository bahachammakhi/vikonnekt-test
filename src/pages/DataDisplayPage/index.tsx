import React from "react";
import BarChart from "../../components/charts/BarChart";
import useShowNeoData from "../../components/modules/DataDisplay/useShowNeoData";
import CheckBox from "../../components/ui/CheckBox";
import Select from "../../components/ui/Select";
import Table from "../../components/ui/Table";

export enum TO_SHOW {
  TABLE = "table",
  CHARTS = "charts",
}

export default function DataDisplayPage() {
  const {
    filters,
    data: { tableData, chartsData },
    isLoading,
    error,
    handleChangeFilters,
  } = useShowNeoData();

  const options = [
    { name: "Earth", value: "Earth" },
    { name: "Juptr", value: "Juptr" },
    { name: "Mars", value: "Mars" },
    { name: "Merc", value: "Merc" },
    { name: "none", value: "none" },
  ];

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>{error}</div>;

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
        options={options}
      />
      {filters.toShow === TO_SHOW.CHARTS &&
      chartsData &&
      chartsData.length > 0 ? (
        <BarChart
          titles={[
            "NEO Name",
            "Min Estimated Diameter (km)",
            "Max Estimated Diameter (km)",
          ]}
          width="100%"
          height="400px"
          data={chartsData}
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
          data={tableData || []}
          headers={[
            {
              title: "",
              dataIndex: "name",
              render: (_, i) => {
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
              render(record) {
                return record.estimated_diameter.kilometers
                  .estimated_diameter_min;
              },
            },
            {
              title: "Max Estimated Diameter (km)",
              dataIndex: "estimated_diameter",
              render(record) {
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
