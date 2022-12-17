import {
  IGetBrowseNeoApiResponse,
  NearEarthObject,
} from "../../../api/neo/types";
import { sortByAverage } from "./utils";

interface IFilters {
  orbiting_body: string;
}

const filterByOrbitingBody = (filters: IFilters) => {
  return ({ close_approach_data }: NearEarthObject) => {
    if (filters.orbiting_body === "none") return true;
    return close_approach_data.some(
      ({ orbiting_body }) => orbiting_body === filters.orbiting_body
    );
  };
};

export const transformEstimatedDiameters = (filters: IFilters) => {
  return (data: IGetBrowseNeoApiResponse | null) => {
    const preResult = data
      ? data.near_earth_objects
          .filter(filterByOrbitingBody(filters))
          .map(({ name, estimated_diameter }) => {
            return [
              name,
              estimated_diameter.kilometers.estimated_diameter_min,
              estimated_diameter.kilometers.estimated_diameter_max,
            ];
          })
      : [];

    return preResult.sort(sortByAverage);
  };
};
