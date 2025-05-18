import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import AppBar from "./AppBar/AppBar";
import { useDispatch } from "react-redux";
import { fetchCars } from "../redux/cars/operations";
import { Atom } from "react-loading-indicators";
import { fetchBrands } from "../redux/brands/operationsBrands";

const Home = lazy(() => import("../pages/HomePage/HomePage"));
const Catalog = lazy(() => import("../pages/CatalogPage/CatalogPage"));
const CarDetails = lazy(() => import("../pages/CarPage/CarPage"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  return (
    <div>
      <AppBar />

      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              width: "100vw",
            }}
          >
            <Atom color={["#001EFF", "#0066FF", "#00CCFF", "#33FFFF"]} />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<CarDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}
