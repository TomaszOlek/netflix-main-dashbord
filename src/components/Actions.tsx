
import { Icon } from '@iconify/react';

type videoData = {
  image: string,
  name: string,
  lastWatched: string,
  procentageWatched: number,
  lengthOfEpisode: number,
}

function Banner( {videoData}:  {videoData: videoData} ) {
  return (
    <div className="row-video-preview">
      <img src={videoData.image}/>
      <div style={{ position: "relative"}}>
        <div className="row-video-preview__actions">
          <div className='actions'>
            <Icon icon="material-symbols:play-circle-rounded" 
            className='actions-icon'
            style={{
              width: "20px",
              height: "20px",
            }}/>
            <div className='actions-reactions'>
                {/* Likes */}
              <Icon icon="ant-design:like-filled" 
              className='actions-icon'
              style={{
                width: "14px",
                height: "14px",
              }}/>
              <Icon icon="ant-design:dislike-filled" 
              className='actions-icon'
              style={{
                width: "14px",
                height: "14px",
              }}/>
              <Icon icon="ri:heart-3-line" 
              className='actions-icon'
              style={{
                width: "14px",
                height: "14px",
              }}/>
            </div>

            <p>{videoData.lastWatched}</p>
          </div>

          <div className='actions-progress'>
            <div className='actions-progress__text'>
              <p>{`
                ${((videoData.procentageWatched * 0.01) * videoData.lengthOfEpisode).toFixed(0)} 
                z
                ${ videoData.lengthOfEpisode } min
              `}</p>
            </div>
            <div className='actions-progress__preogress'>
              <div style={{ left: `${videoData.procentageWatched - 100}%`}}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner