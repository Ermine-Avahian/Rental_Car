import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CatalogFilters from "../../components/CatalogFilters/CatalogFilters";
import CatalogList from "../../components/CatalogList/CatalogList";
import { fetchCars } from "../../redux/cars/operations";
import { selectCars, selectCarsLoading } from "../../redux/cars/selectors";
import css from "./CatalogPage.module.css";

const ITEMS_PER_PAGE = 8;

export default function CatalogPage() {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectCarsLoading);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // Initial fetch of first page on mount
    setPage(1);
    setHasMore(true);
    dispatch(fetchCars({ page: 1, limit: ITEMS_PER_PAGE }));
  }, []);

  const handleLoadMore = () => {
    // Load next page if not loading and more items exist
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      dispatch(fetchCars({ page: nextPage, limit: ITEMS_PER_PAGE })).then(
        (action) => {
          // Check if loaded less than items per page — no more pages
          const loadedCount = action.payload.cars
            ? action.payload.cars.length
            : action.payload.length;
          if (loadedCount < ITEMS_PER_PAGE) {
            setHasMore(false);
          }
          setPage(nextPage);
        }
      );
    }
  };

  return (
    <div className={css.catalogPage}>
      <CatalogFilters />

      {/* Show message if no cars match filters */}
      {cars.length === 0 && !isLoading ? (
        <p>No cars match your filters.</p>
      ) : (
        <>
          {/* Display list of cars */}
          <CatalogList filteredCars={cars} />

          {/* Load more button if more cars available */}
          {hasMore && !isLoading && (
            <button className={css.button} onClick={handleLoadMore}>
              Load more
            </button>
          )}

          {/* Loading indicator */}
          {isLoading && <p>Loading...</p>}
        </>
      )}
    </div>
  );
}
