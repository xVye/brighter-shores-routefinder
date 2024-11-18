import Page from "../components/Page.jsx";
import Paragraph from "../components/Paragraph.jsx";
import Subheading from "../components/Subheading.jsx";
import ExternalLink from "../components/ExternalLink.jsx";
import InternalLink from "../components/InternalLink.jsx";

const About = () => {
  return (
    <Page
      title="RouteFinder"
      meta="A tool for Brighter Shores which finds the best merchanting routes."
    >
      <Subheading>How it works</Subheading>
      <Paragraph>
        Select bounties which you currently have, and the tool will use{" "}
        <ExternalLink to="https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm">
          Dijkstra&apos;s algorithm
        </ExternalLink>{" "}
        to find the best possible paths for you to take to complete each bounty.
      </Paragraph>

      <Paragraph>
        Rooms unlocked by quests and den raids are taken into account, so make
        sure to <InternalLink to="/configuration">configure</InternalLink> your
        settings accordingly.
      </Paragraph>

      <Paragraph>
        You can optionally wait and select more bounties when they become
        available from the bounty board. The tool will calculate the best route
        from all possible bounties and let you know which ones to abandon and
        which ones to pick up.
      </Paragraph>

      <Subheading>Time estimations</Subheading>

      <Paragraph>
        The best routes are calculated by time and not by distance. ETAs are
        provided for each step of the route and are a great way to gauge the
        accuracy of the tool. If you find these estimations are off, then please
        let us know on our{" "}
        <ExternalLink to="https://discord.gg/fcSYv9GPwJ">
          Discord server
        </ExternalLink>{" "}
        so that we can improve our algorithm.
      </Paragraph>

      <Subheading>Contributing</Subheading>
      <Paragraph>
        You do not need to be a developer to contribute to the tool. Join our{" "}
        <ExternalLink to="https://discord.gg/fcSYv9GPwJ">Discord</ExternalLink>{" "}
        server to help in various ways:
        <ul className="list-disc ml-10 mt-2">
          <li className="mb-1">
            The <span className="bg-gray-200 px-1 rounded">#data-needed</span>{" "}
            channel includes specific things we need help with, such as item
            images or information about den raid rooms.
          </li>
          <li className="mb-1">
            Post any routes which are faster than what the tool suggests in{" "}
            <span className="bg-gray-200 px-1 rounded">#better-routes</span>
          </li>
          <li className="mb-1">
            Post <span className="bg-gray-200 px-1 rounded">#bug-reports</span>
          </li>
          <li className="mb-1">
            Post{" "}
            <span className="bg-gray-200 px-1 rounded">#inaccurate-etas</span>{" "}
          </li>
          <li className="mb-1">
            Post any other{" "}
            <span className="bg-gray-200 px-1 rounded">
              #ideas-and-suggestions
            </span>{" "}
            you have!
          </li>
        </ul>
        <Paragraph className="mt-5">
          This tool is open source and the code is{" "}
          <ExternalLink to="https://github.com/bricefrisco/brighter-shores-routefinder">
            available on GitHub
          </ExternalLink>
          . Further technical details regarding how the tool works can be found
          there. All code contributions are welcome!
        </Paragraph>
      </Paragraph>
    </Page>
  );
};

export default About;
