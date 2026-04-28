import { useLocation } from "react-router-dom";
import { getPageMeta } from "../data/pageMeta";

const usePageMeta = () => {
  const location = useLocation();
  return getPageMeta(location.pathname);
};

export default usePageMeta;
