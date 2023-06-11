import { createContext, useState } from "react"

//Es el que consumimos
export const FiltersContext = createContext()

//El que provee acceso al contexto
export function FiltersProvider ({ children }) {
  const [filters, setFilters] = useState({
    category: "all",
    minPrice: 0
  })

  return (
    <FiltersContext.Provider value={{filters, setFilters}}>
      {children}
    </FiltersContext.Provider>
  )
}