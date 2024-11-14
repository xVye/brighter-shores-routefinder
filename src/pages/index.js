import About from "./About.jsx";
import Configuration from "./Configuration.jsx";
import BountySelection from "./BountySelection.jsx";
import BountyPlan from "./BountyPlan.jsx";

export const categories = ["Settings", "Bounties"];

const pages = [
  {
    title: "About",
    path: "/",
    component: About,
  },
  {
    title: "Configuration",
    path: "/configuration",
    component: Configuration,
    category: categories[0],
  },
  {
    title: "Bounty Selection",
    path: "/bounty-selection",
    component: BountySelection,
    category: categories[1],
  },
  {
    title: "Bounty Plan",
    path: "/bounty-plan",
    component: BountyPlan,
    category: categories[1],
  },
];

export default pages;
