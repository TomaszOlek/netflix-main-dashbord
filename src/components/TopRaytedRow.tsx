import { useState, useRef, useEffect } from "react";
// @ts-ignore
import { Icon } from "@iconify/react";
import Actions from "./Actions";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { createNewRow, incrementedOffset, decrementedOffset } from "../actions";

function TopRatedRow({ index }: { index: number }) {
  const scroller = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const width = useSelector((state: RootState) => state.windowSize);
  const isMobile = width.windowSize <= 767;

  useEffect(() => {
    dispatch(createNewRow(`topRatedRow${index}`));
  }, []);

  const rowMoviesList = useSelector((state: RootState) =>
    state.rowData[`row${index}`] ? state.rowData[`row${index}`].movies : [],
  );
  const rowMoviesOffset = useSelector(
    (state: RootState) => state.rowOffset[`row${index}`] || 0,
  );

  const [rightArrow, setRightArrow] = useState(true);

  const handleClick = (direction: string) => {
    if (direction === "left") {
      dispatch(incrementedOffset(`row${index}`));
    } else {
      dispatch(decrementedOffset(`row${index}`));
    }

    if (scroller.current) {
      let { scrollLeft, clientWidth, scrollWidth, offsetWidth } =
        scroller.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scroller.current.scrollTo({ left: scrollTo, behavior: "smooth" });

      if (scrollWidth - scrollTo - offsetWidth <= 0) {
        setRightArrow(false);
      } else {
        setRightArrow(true);
      }
    }
  };

  return (
    <div>
      {!isMobile && rowMoviesOffset !== 0 && (
        <div
          style={{ position: "relative" }}
          onClick={() => handleClick("left")}
        >
          <div className="move-topRaytedRow-left">
            <Icon
              icon="ic:outline-keyboard-arrow-left"
              style={{
                width: "40px",
                height: "40px",
              }}
            />
          </div>
        </div>
      )}

      <div className="topRated-video" ref={scroller}>
        {rowMoviesList.map((videoData, index) => (
          <div className="topRated-video-wraper" key={index}>
            <p>{index + 1}</p>
            <div className="topRated-video__item">
              <img src={videoData.image} />
            </div>
            <Actions videoData={videoData} />
          </div>
        ))}
      </div>

      {!isMobile && rightArrow && (
        <div
          style={{ position: "relative" }}
          onClick={() => handleClick("right")}
        >
          <div className="move-topRaytedRow-right">
            <Icon
              icon="ic:twotone-keyboard-arrow-right"
              style={{
                width: "40px",
                height: "40px",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TopRatedRow;
