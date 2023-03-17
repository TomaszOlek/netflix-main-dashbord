import { useState, useRef, useEffect } from "react";
import { Icon } from '@iconify/react';

import Actions from "./Actions";

type videosData = {
  image: string,
  name: string,
  lastWatched: string,
  procentageWatched: number,
  lengthOfEpisode: number,
}

function TopRatedRow({ videosData }: { videosData: videosData[] }) {
  const shuffled = [ ...videosData].sort(() => Math.random() - 0.5)

  const [width, setWidth] = useState<number>(window.innerWidth);
  const [shuffledData, setShuffledData] = useState([...shuffled, ...shuffled]);
  const [isMoved, setIsMoved] = useState(0);
  const [rightArrow, setRightArrow] = useState(true);

  const scroller = useRef<HTMLDivElement>(null)
  const isMobile = width <= 767;

  function handleWindowSizeChange() {
      setWidth(window.innerWidth);
  }
  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);


  const handleClick = (direction: string) => {
    const newIsMoved = direction === 'right' ? isMoved + 1 : isMoved - 1;
    setIsMoved(newIsMoved)

    if (scroller.current){
      let { scrollLeft, clientWidth, scrollWidth, offsetWidth } = scroller.current

      const scrollTo =
      direction === 'left'
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth
      scroller.current.scrollTo({ left: scrollTo, behavior: 'smooth' })

      if (scrollWidth - scrollTo - offsetWidth <= 0) {
        setRightArrow(false);
      } else {
        setRightArrow(true);
      }
    } 
  }

  return (
    <div>
        {(!isMobile && isMoved !== 0) &&
          <div style={{ position: "relative"}} onClick={() => handleClick('left')}>
            <div className="move-topRaytedRow-left">
              <Icon icon="ic:outline-keyboard-arrow-left" style={{
                width: "40px",
                height: "40px"
              }}/>
            </div>
          </div>
        }

        <div className="topRated-video" ref={scroller}>
        {shuffledData.map((videoData, index) => (
            <div className="topRated-video-wraper" key={index}>
              <p>{index+1}</p>
              <div className="topRated-video__item">
                <img src={videoData.image}/>
              </div>
              <Actions videoData={videoData} />
            </div>
        ))}
        </div>

        {!isMobile && rightArrow &&
          <div style={{ position: "relative"}} onClick={() => handleClick('right')}>
            <div className="move-topRaytedRow-right">
              <Icon icon="ic:twotone-keyboard-arrow-right" style={{
                width: "40px",
                height: "40px"
              }}/>
            </div>
          </div>
        }
    </div>
  )
}

export default TopRatedRow