
/* data/space.ts */

export type Planet = {
  name: string;
  type: string;
  color: string;
  secondary: string;
  diameter: number;
  distance: number;
  day: string;
  year: string;
  orbitalDays: number;
  temp: number;
  gravity: number;
  moons: number;
  fact: string;
};

export const planets: Planet[] = [
  {
    name: "Mercury",
    type: "Terrestrial planet",
    color: "#a9a9a9",
    secondary: "#545968",
    diameter: 4879,
    distance: 57.9,
    day: "58.6 Earth days (rotation)",
    year: "88 Earth days",
    orbitalDays: 88,
    temp: 167,
    gravity: 3.7,
    moons: 0,
    fact: "Mercury has almost no atmosphere, so its surface experiences extreme temperature changes.",
  },
  {
    name: "Venus",
    type: "Terrestrial planet",
    color: "#e8ba78",
    secondary: "#9d663d",
    diameter: 12104,
    distance: 108.2,
    day: "243 Earth days (rotation)",
    year: "225 Earth days",
    orbitalDays: 225,
    temp: 464,
    gravity: 8.87,
    moons: 0,
    fact: "Venus is the hottest planet because its thick carbon dioxide atmosphere traps heat.",
  },
  {
    name: "Earth",
    type: "Terrestrial planet",
    color: "#278bd3",
    secondary: "#145438",
    diameter: 12742,
    distance: 149.6,
    day: "23 h 56 m (sidereal)",
    year: "365.25 Earth days",
    orbitalDays: 365.25,
    temp: 15,
    gravity: 9.81,
    moons: 1,
    fact: "Earth is the only world currently known to support life, with liquid oceans covering most of its surface.",
  },
  {
    name: "Mars",
    type: "Terrestrial planet",
    color: "#df704a",
    secondary: "#863a2c",
    diameter: 6779,
    distance: 227.9,
    day: "24 h 37 m",
    year: "687 Earth days",
    orbitalDays: 687,
    temp: -65,
    gravity: 3.71,
    moons: 2,
    fact: "Mars is home to Olympus Mons, the largest known volcano in the solar system.",
  },
  {
    name: "Jupiter",
    type: "Gas giant",
    color: "#c5a07c",
    secondary: "#8e6046",
    diameter: 139820,
    distance: 778.6,
    day: "9 h 56 m",
    year: "11.86 Earth years",
    orbitalDays: 4333,
    temp: -110,
    gravity: 24.79,
    moons: 115,
    fact: "Jupiter's Great Red Spot is a giant atmospheric storm observed for centuries.",
  },
  {
    name: "Saturn",
    type: "Gas giant",
    color: "#e7cf9c",
    secondary: "#947d4e",
    diameter: 116460,
    distance: 1433.5,
    day: "10 h 33 m",
    year: "29.45 Earth years",
    orbitalDays: 10759,
    temp: -140,
    gravity: 10.44,
    moons: 293,
    fact: "Saturn's rings are made predominantly of countless pieces of water ice.",
  },
  {
    name: "Uranus",
    type: "Ice giant",
    color: "#83d5de",
    secondary: "#367f9d",
    diameter: 50724,
    distance: 2872.5,
    day: "17 h 14 m",
    year: "84 Earth years",
    orbitalDays: 30687,
    temp: -195,
    gravity: 8.69,
    moons: 29,
    fact: "Uranus rotates on its side, giving it extremely unusual seasons.",
  },
  {
    name: "Neptune",
    type: "Ice giant",
    color: "#476bea",
    secondary: "#263b98",
    diameter: 49244,
    distance: 4495.1,
    day: "16 h 6 m",
    year: "164.8 Earth years",
    orbitalDays: 60190,
    temp: -200,
    gravity: 11.15,
    moons: 16,
    fact: "Neptune has some of the fastest winds measured in the solar system.",
  },
];

export type CosmicObject = {
  name: string;
  category: string;
  distance: string;
  detail: string;
  fact: string;
  image: string;
};

export const cosmicObjects: CosmicObject[] = [
  {
    name: "Andromeda Galaxy",
    category: "Galaxy",
    distance: "~2.5 million light-years",
    detail: "Large spiral galaxy",
    fact: "Andromeda is the nearest major spiral galaxy to the Milky Way. The two galaxies are moving toward one another, although the timing and outcome of a future encounter remain uncertain.",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&q=85",
  },
  {
    name: "Orion Nebula",
    category: "Nebula",
    distance: "~1,350 light-years",
    detail: "Star-forming emission nebula",
    fact: "The Orion Nebula contains a stellar nursery where stars form from enormous clouds of gas and dust.",
    image: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1200&q=85",
  },
  {
    name: "Sagittarius A*",
    category: "Black hole",
    distance: "~26,000 light-years",
    detail: "Supermassive black hole",
    fact: "At the center of the Milky Way lies a black hole with a mass of approximately four million Suns.",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&q=85",
  },
  {
    name: "Proxima Centauri",
    category: "Star",
    distance: "~4.24 light-years",
    detail: "Red dwarf star",
    fact: "Proxima Centauri is the closest known star to our Sun and belongs to the Alpha Centauri stellar system.",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&q=85",
  },
  {
    name: "Proxima Centauri b",
    category: "Exoplanet",
    distance: "~4.24 light-years",
    detail: "Confirmed exoplanet",
    fact: "This planet orbits Proxima Centauri in approximately 11.2 days. Whether it can support life is unknown.",
    image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=1200&q=85",
  },
];

export type Mission = {
  name: string;
  launch: string;
  year: number;
  status: "Completed" | "Active" | "Program";
  objective: string;
  milestone: string;
};

export const missions: Mission[] = [
  {
    name: "Apollo 11",
    launch: "July 16, 1969",
    year: 1969,
    status: "Completed",
    objective: "First crewed Moon landing",
    milestone: "Humans first walked on the Moon on July 20, 1969.",
  },
  {
    name: "Voyager 2",
    launch: "August 20, 1977",
    year: 1977,
    status: "Active",
    objective: "Explore the outer planets and interstellar space",
    milestone: "Entered interstellar space in 2018.",
  },
  {
    name: "Voyager 1",
    launch: "September 5, 1977",
    year: 1977,
    status: "Active",
    objective: "Explore the outer planets and interstellar space",
    milestone: "Became the first spacecraft to enter interstellar space in 2012.",
  },
  {
    name: "Hubble Space Telescope",
    launch: "April 24, 1990",
    year: 1990,
    status: "Active",
    objective: "Observe the universe from low Earth orbit",
    milestone: "Transformed astronomy with deep-field observations.",
  },
  {
    name: "Perseverance Rover",
    launch: "July 30, 2020",
    year: 2020,
    status: "Active",
    objective: "Investigate ancient habitability and collect Martian samples",
    milestone: "Landed in Jezero Crater on February 18, 2021.",
  },
  {
    name: "James Webb Space Telescope",
    launch: "December 25, 2021",
    year: 2021,
    status: "Active",
    objective: "Observe the early universe, stars and exoplanets in infrared",
    milestone: "Its first full-color scientific images were released in July 2022.",
  },
  {
    name: "Artemis Program",
    launch: "Program; multiple missions",
    year: 2022,
    status: "Program",
    objective: "Establish a sustained human lunar exploration capability",
    milestone: "Artemis I completed its uncrewed Moon mission in December 2022.",
  },
];

export type Question = {
  difficulty: "Easy" | "Medium" | "Hard";
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export const questions: Question[] = [
  {
    difficulty: "Easy",
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    answer: 1,
    explanation: "Iron oxide minerals give much of Mars its reddish appearance.",
  },
  {
    difficulty: "Easy",
    question: "What is the closest star to Earth?",
    options: ["Sirius", "Polaris", "The Sun", "Betelgeuse"],
    answer: 2,
    explanation: "Our Sun is Earth's nearest star.",
  },
  {
    difficulty: "Easy",
    question: "Which planet has the most prominent ring system?",
    options: ["Mars", "Venus", "Earth", "Saturn"],
    answer: 3,
    explanation: "Saturn's large ring system consists primarily of ice particles.",
  },
  {
    difficulty: "Medium",
    question: "What is the largest planet in the solar system?",
    options: ["Neptune", "Saturn", "Jupiter", "Uranus"],
    answer: 2,
    explanation: "Jupiter is the largest planet by both volume and mass.",
  },
  {
    difficulty: "Medium",
    question: "What galaxy contains our solar system?",
    options: ["Andromeda", "Milky Way", "Triangulum", "Whirlpool"],
    answer: 1,
    explanation: "Our solar system lies in the Milky Way galaxy.",
  },
  {
    difficulty: "Medium",
    question: "What is the approximate speed of light in a vacuum?",
    options: ["300 km/s", "3,000 km/s", "30,000 km/s", "300,000 km/s"],
    answer: 3,
    explanation: "Light travels at approximately 299,792 kilometers per second.",
  },
  {
    difficulty: "Medium",
    question: "Which planet takes about 165 Earth years to orbit the Sun?",
    options: ["Jupiter", "Neptune", "Mars", "Venus"],
    answer: 1,
    explanation: "Neptune's orbital period is approximately 164.8 Earth years.",
  },
  {
    difficulty: "Hard",
    question: "What is the event horizon of a black hole?",
    options: [
      "Its solid surface",
      "A boundary beyond which light cannot escape to infinity",
      "Its magnetic north pole",
      "The outer edge of its galaxy",
    ],
    answer: 1,
    explanation: "The event horizon marks the boundary from inside which signals cannot escape to distant observers.",
  },
  {
    difficulty: "Hard",
    question: "What does one astronomical unit approximately represent?",
    options: [
      "The Earth–Moon distance",
      "The Sun–Neptune distance",
      "The Earth–Sun distance",
      "One light-year",
    ],
    answer: 2,
    explanation: "One AU is approximately 149.6 million kilometers.",
  },
  {
    difficulty: "Hard",
    question: "What was the first spacecraft to enter interstellar space?",
    options: ["Pioneer 10", "Voyager 2", "New Horizons", "Voyager 1"],
    answer: 3,
    explanation: "Voyager 1 crossed the heliopause into interstellar space in 2012.",
  },
];
