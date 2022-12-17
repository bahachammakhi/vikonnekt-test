import {
  IGetBrowseNeoApiResponse,
  NearEarthObject,
} from "../../../api/neo/types";
import { TO_SHOW } from "../../../pages/DataDisplayPage";
import { sortByAverage } from "./utils";

interface IFilters {
  orbiting_body: string;
  toShow: TO_SHOW;
}

const filterByOrbitingBody = (filters: IFilters) => {
  return ({ close_approach_data }: NearEarthObject) => {
    if (filters.orbiting_body === "none") return true;
    return close_approach_data.some(
      ({ orbiting_body }) => orbiting_body === filters.orbiting_body
    );
  };
};
const transformToChartsEstimatedDiameters = ({
  name,
  estimated_diameter,
}: NearEarthObject) => {
  return [
    name,
    estimated_diameter.kilometers.estimated_diameter_min,
    estimated_diameter.kilometers.estimated_diameter_max,
  ];
};

export const transformToTableEstimatedDiameters = (filters: IFilters) => {
  return (data: IGetBrowseNeoApiResponse | null) => {
    return data
      ? data.near_earth_objects.filter(filterByOrbitingBody(filters))
      : [];
  };
};
export const transformEstimatedDiameters = (data: NearEarthObject[] | null) => {
  const preResult = data ? data.map(transformToChartsEstimatedDiameters) : [];

  return preResult.sort(sortByAverage);
};
