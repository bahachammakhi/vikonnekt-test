import { useState, useEffect, useCallback, useMemo } from "react";
import { data as dataLoad } from "../pages/data";

const cache = new Map();

interface IUseQueryProps<Data, Variables, TransformData> {
  queryFn: (variables: Variables | undefined) => Promise<Data>;
  queryKey: string;
  transformFn?: (data: Data | null) => TransformData;
  variables?: Variables;
}

function useQuery<Data, Variables = Record<string, any>, TransformData = Data>({
  queryFn,
  queryKey,
  transformFn,
  variables,
}: IUseQueryProps<Data, Variables, TransformData>) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (variables: Variables | undefined) => {
      setLoading(true);
      try {
        if (cache.has(queryKey)) {
          const data = cache.get(queryKey);
          setData(data);
        } else {
          const data = dataLoad;
          // const data = await queryFn(variables);
          cache.set(queryKey, data);
          setData(data as any);
        }
      } catch (e) {
        setError((e as any).message);
      } finally {
        setLoading(false);
      }
    },
    [queryFn, queryKey]
  );

  useEffect(() => {
    fetchData(variables);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variables]);

  const transformedData = useMemo(
    () => (transformFn ? transformFn(data) : data),
    [data, transformFn]
  );
  return {
    isLoading,
    data: transformedData,
    error,
  };
}

export default useQuery;
