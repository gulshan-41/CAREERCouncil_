import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CategoriesContext = createContext();

export function CategoriesProvider({ children }) {
  // State for categories.json (list of categories)
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  // State for categoriesData/${catID}.json (cached per catID)
  const [categoryDetails, setCategoryDetails] = useState({}); // { catID: { relatedCourses, introduction } }
  const [detailsLoading, setDetailsLoading] = useState({}); // { catID: boolean }
  const [detailsError, setDetailsError] = useState({}); // { catID: string }

  // Fetch categories.json once on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/data/CategoriesList/categoriesList.json");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        console.log('categoriesList = ',data);
        
        setCategories(data);
        setCategoriesLoading(false);
      } catch (err) {
        setCategoriesError(err.message);
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Function to fetch category details (cached)
  const fetchCategoryDetails = useCallback(async (catID) => {
    if (categoryDetails[catID]) {
      return; // Already cached, skip fetch
    }

    setDetailsLoading((prev) => ({ ...prev, [catID]: true }));
    setDetailsError((prev) => ({ ...prev, [catID]: null }));

    try {
      const response = await fetch(`/data/categoriesData/${catID}.json`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data for ${catID}`);
      }
      const data = await response.json();
      
      console.log("CategoriesData = " ,catID, data);
      
      setCategoryDetails((prev) => ({
        ...prev,
        [catID]: {
          relatedCourses: data.relatedCourses || [],
          introduction: data.introduction || [],
        },
      }));
    } catch (err) {
      setDetailsError((prev) => ({ ...prev, [catID]: err.message }));
    } finally {
      setDetailsLoading((prev) => ({ ...prev, [catID]: false }));
    }
  }, [categoryDetails]);

  const contextValue = {
    categories,
    categoriesLoading,
    categoriesError,
    categoryDetails,
    detailsLoading,
    detailsError,
    fetchCategoryDetails,
  };

  return (
    <CategoriesContext.Provider value={contextValue}>
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }
  return context;
}