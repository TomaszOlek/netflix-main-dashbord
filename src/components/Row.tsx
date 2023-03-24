import { useLayoutEffect, useCallback, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// @ts-ignore
import { Icon } from "@iconify/react";

import Actions from "./Actions";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import {
  createNewRow,
  incrementedOffset,
  decrementedOffset,
  addItemsToRow,
} from "../actions";

function Row({ index }: { index: number }) {
  const scroller = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const width = useSelector((state: RootState) => state.windowSize);
  const isMobile = width.windowSize <= 767;

  useEffect(() => {
    dispatch(createNewRow(`row${index}`));
  }, []);

  const rowMoviesList = useSelector((state: RootState) =>
    state.rowData[`row${index}`] ? state.rowData[`row${index}`].movies : [],
  );
  const rowMoviesOffset = useSelector(
    (state: RootState) => state.rowOffset[`row${index}`] || 0,
  );

  console.log(rowMoviesList);

  const createSlider = useCallback(() => {
    dispatch(addItemsToRow(`row${index}`));
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        scroller: scroller.current,
        horizontal: true,
        // markers: true,
        start: "left left",
        end: "right left",
        onUpdate: self => {
          let progress = Number(self.progress.toFixed(2));
          if (progress >= 0.12 && self.direction === 1) {
            createSlider();
            self.refresh();
          }
        },
      });
    });

    return () => ctx.revert();
  }, [createSlider]);

  const handleClick = (direction: string) => {
    if (direction === "left") {
      dispatch(incrementedOffset(`row${index}`));
    } else {
      dispatch(decrementedOffset(`row${index}`));
    }
    if (scroller.current) {
      const { scrollLeft, clientWidth } = scroller.current;
      // setShuffledData((prev) => [...prev, ...shuffled, ...shuffled]);
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scroller.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div>
      {!isMobile && rowMoviesOffset !== 0 && (
        <div
          style={{ position: "relative" }}
          onClick={() => handleClick("left")}
        >
          <div className="move-row-left">
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
      <div className="row-video" ref={scroller}>
        {rowMoviesList.map((videoData, index) => (
          <div className="row-video-wraper" key={index}>
            <div className="row-video__item">
              <img src={videoData.image} />
            </div>
            <Actions videoData={videoData} />
          </div>
        ))}
      </div>
      {!isMobile && (
        <div
          style={{ position: "relative" }}
          onClick={() => handleClick("right")}
        >
          <div className="move-row-right">
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

export default Row;
