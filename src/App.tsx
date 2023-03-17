import "./styles/css/styles.css"

import Banner from "./components/Banner"
import NavBar from "./components/NavBar"
import Row from "./components/Row"
import TopRaytedRow from "./components/TopRaytedRow"

import { Icon } from '@iconify/react';

import breakingBad from "./assets/serials/breakingBad.png"
import walkingDead from "./assets/serials/walkingDead.png"
import Vikings from "./assets/serials/Vikings.png"
import Lucifer from "./assets/serials/Lucifer.png"
import PeakyBlinders from "./assets/serials/PeakyBlinders.png"

function App() {

  const rawData = [
    {
      image: breakingBad,
      name: "Breaking Bad",
      lastWatched: "Pilot",
      procentageWatched: 50,
      lengthOfEpisode: 58,
    },
    {
      image: walkingDead,
      name: "Walking Dead",
      lastWatched: "Days Gone Bye",
      procentageWatched: 30,
      lengthOfEpisode: 52,
    },
    {
      image: Vikings,
      name: "Vikings",
      lastWatched: "Rites of Passage",
      procentageWatched: 85,
      lengthOfEpisode: 50,
    },
    {
      image: Lucifer,
      name: "Lucifer",
      lastWatched: "Lucifer, Stay. Good Devil.",
      procentageWatched: 20,
      lengthOfEpisode: 48,
    },
    {
      image: PeakyBlinders,
      name: "Peaky Blinders",
      lastWatched: "Episode 1",
      procentageWatched: 90,
      lengthOfEpisode: 56,
    }
  ]

  const Rows = [
    "Docenione przez krytyków",
    "Popularne teraz",
    "Obejrzyj ponownie",
  ]

  const TopRayted = [
    "Top 10 seriali w Polsce dzisiaj",
    "Top 10 seriali w Polsce dzisiaj",
  ]
  

  return (
    <div className="App">
      <NavBar/>
      <Banner/>
      <div className="row">

        {
          Rows.map( (item, index)=>(
            <div key={index}>
              <div className="row-header">
                <p className="row-header__title">{item}</p>
                <div className="row-header__more">
                  <p>Zobacz wszystkie</p>
                  <Icon 
                    style={{
                      width: "20px",
                      height: "20px",
                    }}
                    icon="ic:round-keyboard-arrow-right" 
                  />
                </div>
              </div>
              <Row videosData={rawData}/>
            </div>
          ))
        }
        {
          TopRayted.map((item, index)=>(
            <div key={index}>
              <div className="row-header">
                <p className="row-header__title">{item}</p>
                <div className="row-header__more">
                  <p>Zobacz wszystkie</p>
                  <Icon 
                    style={{
                      width: "20px",
                      height: "20px",
                    }}
                    icon="ic:round-keyboard-arrow-right" 
                  />
                </div>
              </div>
              <TopRaytedRow videosData={rawData}/>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
