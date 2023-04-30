import { useRef } from "react";

import Actions from "./Actions";
import Slider from "./Slider/Slider";

import { useSelector } from "react-redux";
import { RootState } from "../reducers";

function Row({ index }: { index: number }) {
  const scroller = useRef<HTMLDivElement>(null);

  const rowMoviesList = useSelector((state: RootState) =>
    state.rowData[`row${index}`] ? state.rowData[`row${index}`].movies : [],
  );

  return (
    <Slider index={index} scroller={scroller} repeatable={true}>
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
    </Slider>
  );
}

export default Row;
