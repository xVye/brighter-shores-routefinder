import Page from "../components/Page.jsx";
import Paragraph from "../components/Paragraph.jsx";

import pathfinderv2 from "../algorithm/pathfinderv2.js";
import { bounties } from "../algorithm/bounties.js";
import pathfinder from "../algorithm/pathfinder.js";

const About = () => {
  console.log(
    pathfinder.findBestRoute([
      bounties.BANANAS.name,
      bounties.BANANAS.name,
      bounties.RIBS.name,
      bounties.RIBS.name,
      bounties.BEEF_JOINT.name,
      bounties.CARROTS.name,
    ]),
  );
  console.log(
    pathfinderv2.findBestRoute([
      bounties.BANANAS,
      bounties.BANANAS,
      bounties.RIBS,
      bounties.RIBS,
      bounties.BEEF_JOINT,
      bounties.CARROTS,
    ]),
  );
  return (
    <Page
      title="Bounty Planner"
      meta="A tool for Brighter Shores which selects the best combinations of available bounties and plans the most efficient route to complete them quickly."
    >
      <Paragraph>[STUB]</Paragraph>
    </Page>
  );
};

export default About;
