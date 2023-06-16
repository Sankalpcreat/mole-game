const MIN_INTERVAL = 2000;
const MAX_INTERVAL = 20000;
const SAD_INTERVAL = 500;
const HUNGRY_INTERVAL = 2000;
const wormContainer = document.querySelector(".worm-container");//for the line that shows the progress of game how much percentage is left
let score = 0;

const getInterval = () =>
  Date.now() + MIN_INTERVAL + Math.floor(Math.random() * MAX_INTERVAL);
const getSadInterval = () => Date.now() + SAD_INTERVAL;
const getKingStatus = () => Math.random() > 0.9;//king status if 90% above
const getHungryInterval = () => Date.now() + HUNGRY_INTERVAL;//hungery function

const moles = [
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-0")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-1")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-2")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-3")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-4")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-5")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-6")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-7")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-8")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-9")
  }
];

const getNextStatus = mole => {
  switch (mole.status) {
    case "sad":
    case "fed"://sad and fed are similiar condition
      mole.next = getSadInterval();
      if (mole.king) {
        mole.node.children[0].src = "./king-mole-leaving.png";
      } else {
        mole.node.children[0].src = "./mole-leaving.png";
      }
      mole.status = "leaving";
      break;
    case "leaving":
      mole.next = getInterval();
      mole.king = false;
      mole.node.children[0].classList.toggle("gone", true);
      mole.status = "gone";
      break;
    case "hungry":
      mole.node.children[0].classList.toggle("hungry", false);
      if (mole.king) {
        mole.node.children[0].src = "./king-mole-sad.png";
      } else {
        mole.node.children[0].src = "./mole-sad.png";
      }
      mole.status = "sad";
      mole.next = getSadInterval();
      break;
    case "gone":
      mole.status = "hungry";
      mole.king = getKingStatus();
      mole.next = getHungryInterval();
      mole.node.children[0].classList.toggle("hungry", true);
      mole.node.children[0].classList.toggle("gone", false);
      if (mole.king) {
        mole.node.children[0].src = "./king-mole-hungry.png";
      } else {
        mole.node.children[0].src = "./mole-hungry.png";
      }
      break;
  }
};

const feed = e => {
  if (e.target.tagName !== "IMG" || !e.target.classList.contains("hungry")) {
    return;
  }//conditon for mole able to feedable is if there is image than only it can feed and if it is not hungery

  const mole = moles[+e.target.dataset.index];

  mole.status = "fed";//conditon of fed of mole
  mole.next = getSadInterval();//if face is sad
  mole.node.children[0].classList.toggle("hungry", false);//if it is hungry
  if (mole.king) {
    mole.node.children[0].src = "./king-mole-fed.png";//if we seleced mole king from image
    score += 20;
  } else {
    mole.node.children[0].src = "./mole-fed.png";
    score += 10;
  }

  if (score >= 100) {
    win();
    return;
  }

  wormContainer.style.width = `${score}%`;
};

const win = () => {
  document.querySelector(".bg").classList.toggle("hide", true);//win function if you win the game hide 
  document.querySelector(".win").classList.toggle("show", true);//add to show win mole picture
};

document.querySelector(".bg").addEventListener("click", feed);

const nextFrame = () => {
  const now = Date.now();
  for (let i = 0; i < moles.length; i++) {
    if (moles[i].next < now) {
      getNextStatus(moles[i]);//checking for the moles if its greater than prevoius so change the state(expression) of image
    }
  }
  requestAnimationFrame(nextFrame);
};

requestAnimationFrame(nextFrame);