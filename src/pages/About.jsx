import Page from "../components/Page.jsx";
import Paragraph from "../components/Paragraph.jsx";
import gpsv2 from "../algorithm/gpsv2.js";

const About = () => {
  console.log(gpsv2.distance(102, 15));
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
