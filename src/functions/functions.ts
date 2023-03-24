
type videosData = {
  image: string;
  name: string;
  lastWatched: string;
  procentageWatched: number;
  lengthOfEpisode: number;
};

export const shuffleArray = (myArray: videosData[], lengthMultiplier: number = 1) => { 
  const sort = [...myArray].sort(() => Math.random() - 0.5);
  return Array(lengthMultiplier).fill(sort).flat();
}