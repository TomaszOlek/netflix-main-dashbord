import React, { useState } from "react";
import { useLayoutEffect, useCallback, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers";
import {
  createNewRow,
  incrementedOffset,
  decrementedOffset,
  addItemsToRow,
} from "../../actions";

interface SliderProps {
  children: React.ReactNode;
  scroller: React.RefObject<HTMLDivElement>;
  index: number;
  repeatable?: boolean;
}

function Slider({
  children,
  scroller,
  index,
  repeatable = false,
}: SliderProps) {
  const dispatch = useDispatch();

  const width = useSelector((state: RootState) => state.windowSize);
  const isMobile: boolean = width.windowSize <= 767;
  const [rightArrow, setRightArrow] = useState(true);

  useEffect(() => {
    dispatch(createNewRow(`row${index}`));
  }, []);

  const rowMoviesOffset = useSelector(
    (state: RootState) => state.rowOffset[`row${index}`] || 0,
  );

  if (repeatable) {
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
  }

  const handleClick = (direction: string) => {
    if (direction === "left") {
      dispatch(incrementedOffset(`row${index}`));
    } else {
      dispatch(decrementedOffset(`row${index}`));
    }
    if (scroller.current) {
      const { scrollLeft, clientWidth, scrollWidth, offsetWidth } =
        scroller.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scroller.current.scrollTo({ left: scrollTo, behavior: "smooth" });

      if (!repeatable) {
        if (scrollWidth - scrollTo - offsetWidth <= 0) {
          setRightArrow(false);
        } else {
          setRightArrow(true);
        }
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

      <>{children}</>

      {!isMobile && rightArrow && (
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

export default Slider;
