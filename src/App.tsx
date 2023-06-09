import "./styles/css/styles.css";
import { useEffect } from "react";

import Banner from "./components/Banner";
import NavBar from "./components/NavBar";
import Row from "./components/Row";
import TopRaytedRow from "./components/TopRaytedRow";

import { Icon } from "@iconify/react";

import { useDispatch } from "react-redux";
import { setWindowSize } from "./actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("resize", () =>
      dispatch(setWindowSize(window.innerWidth)),
    );

    return () => {
      window.removeEventListener("resize", () =>
        dispatch(setWindowSize(window.innerWidth)),
      );
    };
  }, []);

  useEffect(() => {
    dispatch(setWindowSize(window.innerWidth));
  });

  return (
    <div className="App">
      <NavBar />
      <Banner />
      <div className="row">
        {Rows.map((item, index) => (
          <div key={index}>
            <div className="row-header">
              <p className="row-header__title">{item}</p>
              <a className="row-header__more" href="#">
                <p>Zobacz wszystkie</p>
                <Icon
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                  icon="ic:round-keyboard-arrow-right"
                />
              </a>
            </div>
            <Row index={index} />
          </div>
        ))}
        {TopRayted.map((item, index) => (
          <div key={index}>
            <div className="row-header">
              <p className="row-header__title">{item}</p>
              <a className="row-header__more" href="#">
                <p>Zobacz wszystkie</p>
                <Icon
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                  icon="ic:round-keyboard-arrow-right"
                />
              </a>
            </div>
            <TopRaytedRow index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

const Rows = [
  "Docenione przez krytyków",
  "Popularne teraz",
  "Obejrzyj ponownie",
];

const TopRayted = [
  "Top 15 seriali w Polsce dzisiaj",
  "Top 15 seriali w Polsce dzisiaj",
];
