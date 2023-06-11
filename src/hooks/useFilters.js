import { FiltersContext } from "../context/filtersContext";
import { useContext } from "react";


export function useFilters() {
  // const [filters, setFilters] = useState({
  //   category: "all",
  //   minPrice: 0,
  // });
  const {filters, setFilters} = useContext(FiltersContext)

  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        product.price >= filters.minPrice &&
        (filters.category === "all" || filters.category === product.category)
      );
    });
  };

  return { filters, filterProducts, setFilters }
}