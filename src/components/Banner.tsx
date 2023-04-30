import banner from "../assets/banner.png";
import bannerTitle from "../assets/banner-title.png";
import { Icon } from "@iconify/react";

function Banner() {
  return (
    <div className="banner">
      <div style={{ position: "absolute" }}>
        <div className="banner__image">
          <img src={banner} />
        </div>
      </div>
      <div className="banner__content">
        <div className="banner-toplist">
          <div className="banner-toplist__icon">
            <p>Top</p>
            <p>10</p>
          </div>
          <p>Nr 5 wśród seriali dzisiaj</p>
        </div>
        <img src={bannerTitle} loading="lazy" style={{ userSelect: "none" }} />
        <p className="banner__discription">
          Makabrycznie bystra i sarkastyczna Wednesday Addams prowadzi śledztwo
          w sprawie serii zabójstw, przysparzając sobie nowych przyjaciół i
          wrogów w Akademii Nevermore.
        </p>
        <div className="banner-buttons">
          <button className="banner-buttons__play bannerButton">
            <Icon
              style={{
                width: "20px",
                height: "20px",
              }}
              icon="bi:play-fill"
            />
            Odtwórz
          </button>

          <button className="banner-buttons__info bannerButton">
            <Icon
              style={{
                width: "20px",
                height: "20px",
              }}
              icon="material-symbols:info-outline-rounded"
            />
            Więcej informacji
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
