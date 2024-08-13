import { useLocation } from "react-router-dom";

export const useQuery: any = () => {
  const queryStrings = useLocation()
    .search.replace("?", "")
    .split("&")
    .map((item) => item.split("=")?.[0] || "")
    .filter((item) => !!item);

  const paramsSearch = new URLSearchParams(useLocation().search);
  const valueSearch = queryStrings.map((item) => ({
    name: item,
    value: paramsSearch.get(item),
  }));
  return valueSearch.reduce(
    (obj, current) => ({ ...obj, [current.name]: current.value }),
    {}
  );
};
