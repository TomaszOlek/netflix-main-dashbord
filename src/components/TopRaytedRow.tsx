import { useRef, useEffect } from "react";

import Actions from "./Actions";
import Slider from "./Slider/Slider";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { createNewRow, incrementedOffset, decrementedOffset } from "../actions";

function TopRatedRow({ index }: { index: number }) {
  const scroller = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createNewRow(`topRatedRow${index}`));
  }, []);

  const rowMoviesList = useSelector((state: RootState) =>
    state.rowData[`row${index}`] ? state.rowData[`row${index}`].movies : [],
  );

  return (
    <Slider index={index} scroller={scroller}>
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
    </Slider>
  );
}

export default TopRatedRow;
