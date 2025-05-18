import { useEffect, useState } from "react";
import DetailsCarLeft from "../../components/DetailsCarLeft/DetailsCarLeft";
import DetailsCarRight from "../../components/DetailsCarRight/DetailsCarRight";
import css from "./carPage.module.css";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCarById } from "../../redux/cars/operations";
import { Atom } from "react-loading-indicators";

export default function CarPage() {
  const [car, setCar] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await dispatch(getCarById(id)).unwrap();
        console.log("Received data:", data);
        setCar(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [id, dispatch]);

  if (!car) {
    return (
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
    );
  }

  return (
    <div className={css.container}>
      <div className={css.contentLayout}>
        <DetailsCarLeft car={car} />
        <DetailsCarRight car={car} />
      </div>
    </div>
  );
}
