import { IGetBrowseNeoApiResponse } from "../../../api/neo/types";
import { sortByAverage } from "./utils";

export const transformEstimatedDiameters = (
  data: IGetBrowseNeoApiResponse | null
) => {
  const preResult = data
    ? data.near_earth_objects.map(({ name, estimated_diameter }) => {
        return [
          name,
          estimated_diameter.kilometers.estimated_diameter_min,
          estimated_diameter.kilometers.estimated_diameter_max,
        ];
      })
    : [];

  return preResult.sort(sortByAverage);
};
