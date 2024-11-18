import Page from "../components/Page.jsx";
import Paragraph from "../components/Paragraph.jsx";
import Subheading from "../components/Subheading.jsx";
import Bounty from "../components/Bounty.jsx";
import useBounties from "../hooks/useBounties.js";
import useSettings from "../hooks/useSettings.js";

import { bounties as bountyData } from "../algorithm/bounties.js";
import InternalLink from "../components/InternalLink.jsx";

const SelectBounties = () => {
  const { bounties, selectBounty } = useBounties("bounties");
  const { bounties: availableBounties, selectBounty: selectAvailableBounty } =
    useBounties("availableBounties");

  const { merchantingLevel } = useSettings();

  return (
    <Page
      title="Bounty Selection"
      meta="Select from current and available bounties."
    >
      <Subheading>Your bounties</Subheading>
      <Paragraph>
        The bounties you currently have. You can select up to six bounties. You
        can change your merchanting level on the{" "}
        <InternalLink to="/configuration">configuration page</InternalLink> to
        see or hide bounties of a higher level.
      </Paragraph>
      <div className="grid grid-cols-3 gap-3 mb-5">
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
      <Paragraph>
        If you only want to find the best route for your current bounties, you
        can skip these. Otherwise, you can wait for more bounties to be
        available and select them here. The tool will calculate the best route
        from all possible bounties and let you know which ones to abandon and
        which ones to pick up.
      </Paragraph>
      <div className="grid grid-cols-3 gap-3 mb-5">
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
    </Page>
  );
};

export default SelectBounties;
