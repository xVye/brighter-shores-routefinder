import Page from "../components/Page.jsx";
import Paragraph from "../components/Paragraph.jsx";
import Subheading from "../components/Subheading.jsx";
import Bounty from "../components/Bounty.jsx";
import useBounties from "../hooks/useBounties.js";
import useSettings from "../hooks/useSettings.js";

import { bounties as bountyData } from "../algorithm/bounties.js";
import InternalLink from "../components/InternalLink.jsx";
import ExternalLink from "../components/ExternalLink.jsx";

const SelectBounties = () => {
  const {
    bounties,
    selectedBounties: selectedBounties,
    selectBounty,
    reset: resetBounties,
  } = useBounties("bounties");
  const {
    bounties: availableBounties,
    selectedBounties: selectedAvailableBounties,
    selectBounty: selectAvailableBounty,
    reset: resetAvailableBounties,
  } = useBounties("availableBounties");

  const { merchantingLevel } = useSettings();

  return (
    <Page
      title="Bounty Selection"
      meta="Select from current and available bounties."
    >
      <Subheading>Your bounties</Subheading>
      <Paragraph className="mb-2">
        Select bounties you currently have (up to 6 total). To see or hide
        relevant bounties, change your merchanting level on the{" "}
        <InternalLink to="/configuration">configuration page</InternalLink>. Not
        all bounties have been discovered yet, so higher level ones may be
        missing. Please help contribute by providing details about these
        bounties in our{" "}
        <ExternalLink to="https://discord.gg/fcSYv9GPwJ">Discord</ExternalLink>,
        and we will get them added.
      </Paragraph>
      <button
        className={`text-blue-600 hover:underline font-medium text-sm mb-3 ${selectedBounties.length === 0 ? "invisible" : ""}`}
        onClick={resetBounties}
      >
        Clear selections
      </button>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 mb-7">
        {bounties
          .filter(
            (bounty) =>
              merchantingLevel === 0 ||
              bountyData[bounty.key].level <= merchantingLevel,
          )
          .map((bounty) => (
            <Bounty
              key={bounty.key}
              bountyKey={bounty.key}
              selected={bounty.selected}
              onClick={() => selectBounty(bounty.key)}
            />
          ))}
      </div>

      <Subheading>Bounty board (optional)</Subheading>
      <Paragraph className="mb-2">
        If you only want to find the best route for your current bounties, you
        can skip these. Otherwise, you can wait for more bounties to be
        available and select them here. The tool will calculate the best route
        from all possible bounties and let you know which ones to abandon and
        which ones to pick up.
      </Paragraph>
      <button
        className={`text-blue-600 hover:underline font-medium text-sm mb-3 ${selectedAvailableBounties.length === 0 ? "invisible" : ""}`}
        onClick={resetAvailableBounties}
      >
        Clear selections
      </button>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 mb-5">
        {availableBounties
          .filter(
            (bounty) =>
              merchantingLevel === 0 ||
              bountyData[bounty.key].level <= merchantingLevel,
          )
          .map((bounty) => (
            <Bounty
              key={bounty.key}
              bountyKey={bounty.key}
              selected={bounty.selected}
              onClick={() => selectAvailableBounty(bounty.key)}
            />
          ))}
      </div>
      <Paragraph className="mt-10">
        After making your selections, continue to the next page to see the best
        route.
      </Paragraph>
    </Page>
  );
};

export default SelectBounties;
