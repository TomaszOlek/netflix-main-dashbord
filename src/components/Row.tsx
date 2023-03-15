import { useState, useLayoutEffect, useCallback, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from '@iconify/react';

import Actions from "./Actions"

type videosData = {
  image: string,
  name: string,
  lastWatched: string,
  procentageWatched: number,
  lengthOfEpisode: number,
}

function Row({ videosData }: { videosData: videosData[] }) {
  const shuffled = [ ...videosData].sort(() => Math.random() - 0.5)

  const [width, setWidth] = useState<number>(window.innerWidth);
  const [shuffledData, setShuffledData] = useState([...shuffled, ...shuffled, ...shuffled]);
  const [index, setIndex] = useState(0);
  const [isMoved, setIsMoved] = useState(0)

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

  const createSlider = useCallback(() => {
    setShuffledData((prev) => [...prev, shuffledData[index]]);
    if (index + 1 >= videosData.length) {
      setIndex(0);
    } else {
      setIndex((prev) => prev + 1);
    }
  }, [index, shuffledData, setShuffledData, videosData.length]);

  useLayoutEffect(() => {

    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        scroller: scroller.current,
        horizontal: true,
        // markers: true,
        start: "left left",
        end: "right left",
        onUpdate: (self) => {
          let progress = Number(self.progress.toFixed(2));
          if (progress >= 0.6 && self.direction === 1) {
            createSlider();
            self.refresh();
          }
        }
      });
    });

    return () => ctx.revert();

  }, [createSlider]);

  const handleClick = (direction: string) => {

    const newIsMoved = direction === 'right' ? isMoved + 1 : isMoved - 1;
    setIsMoved(newIsMoved)

    if (scroller.current) {
      const { scrollLeft, clientWidth } = scroller.current

      setShuffledData(prev => [...prev, ...shuffled, ...shuffled])

      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth
      scroller.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  return (
    <div>
        {(!isMobile && isMoved !== 0) &&
          <div style={{ position: "relative"}} onClick={() => handleClick('left')}>
            <div className="move-row-left">
              <Icon icon="ic:outline-keyboard-arrow-left" style={{
                width: "40px",
                height: "40px"
              }}/>
            </div>
          </div>
        }
        <div className="row-video" ref={scroller}>
        {shuffledData.map((videoData, index) => (
            <div className="row-video-wraper" key={index}>
              <div className="row-video__item">
                <img src={videoData.image}/>
              </div>
              <Actions videoData={videoData} />
            </div>
        ))}
        </div>
        {!isMobile &&
          <div style={{ position: "relative"}} onClick={() => handleClick('right')}>
            <div className="move-row-right">
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

export default Row