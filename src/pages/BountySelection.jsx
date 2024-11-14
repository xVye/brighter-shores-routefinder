import Page from "../components/Page.jsx";
import Paragraph from "../components/Paragraph.jsx";
import Subheading from "../components/Subheading.jsx";
import Bounty from "../components/Bounty.jsx";
import useBounties from "../hooks/useBounties.js";

const BountySelection = () => {
  const { bounties, selectBounty } = useBounties("bounties");
  const { bounties: availableBounties, selectBounty: selectAvailableBounty } =
    useBounties("availableBounties");

  return (
    <Page
      title="Bounty Selection"
      meta="Select from current and available bounties."
    >
      <Subheading>Your bounties</Subheading>
      <Paragraph>
        The bounties you currently have. You can select up to six bounties.
      </Paragraph>
      <div className="grid grid-cols-3 gap-3 mb-5">
        {bounties.map((selection) => (
          <Bounty
            key={selection.name}
            type={selection.name}
            selected={selection.selected}
            onClick={() => selectBounty(selection.name)}
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
        {availableBounties.map((selection) => (
          <Bounty
            key={selection.name}
            type={selection.name}
            selected={selection.selected}
            onClick={() => selectAvailableBounty(selection.name)}
          />
        ))}
      </div>
    </Page>
  );
};

export default BountySelection;
