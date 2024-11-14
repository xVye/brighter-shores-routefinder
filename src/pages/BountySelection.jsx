import Page from "../components/Page.jsx";
import Paragraph from "../components/Paragraph.jsx";
import Subheading from "../components/Subheading.jsx";
import Bounty from "../components/Bounty.jsx";
import { deliveryData } from "../algorithm/bounties.js";
import { useEffect, useState } from "react";

const defaultBountyState = Object.keys(deliveryData).map((key) => ({
  name: key,
  image: `https://brightershoreswiki.org/images/${key.replace(" ", "_")}.png`,
  selected: false,
}));

const BountySelection = () => {
  const [bounties, setBounties] = useState(() => {
    const bountyJson = sessionStorage.getItem("bounties");
    if (bountyJson) {
      return JSON.parse(sessionStorage.getItem("bounties"));
    }

    return defaultBountyState;
  });

  const [availableBounties, setAvailableBounties] = useState(() => {
    const bountyJson = sessionStorage.getItem("availableBounties");
    if (bountyJson) {
      return JSON.parse(sessionStorage.getItem("availableBounties"));
    }

    return defaultBountyState;
  });

  useEffect(() => {
    sessionStorage.setItem("bounties", JSON.stringify(bounties));
  }, [bounties]);

  useEffect(() => {
    sessionStorage.setItem(
      "availableBounties",
      JSON.stringify(availableBounties),
    );
  }, [availableBounties]);

  const selectBounty = (name) => {
    const numSelected = bounties.filter((bounty) => bounty.selected).length;

    const newBounties = bounties.map((bounty) => {
      if (bounty.name === name) {
        return {
          ...bounty,
          selected: !bounty.selected && numSelected < 6,
        };
      }
      return bounty;
    });

    setBounties(newBounties);
  };

  const selectAvailableBounty = (name) => {
    const numSelected = availableBounties.filter(
      (bounty) => bounty.selected,
    ).length;

    const newBounties = availableBounties.map((bounty) => {
      if (bounty.name === name) {
        return {
          ...bounty,
          selected: !bounty.selected && numSelected < 6,
        };
      }
      return bounty;
    });

    setAvailableBounties(newBounties);
  };

  return (
    <Page
      title="Bounty Selection"
      meta="Select from current and available bounties"
    >
      <Subheading>Your bounties</Subheading>
      <Paragraph>
        The bounties you currently have. You can select up to six bounties.
      </Paragraph>
      <div className="grid grid-cols-3 gap-3 mb-5">
        {bounties.map((selection) => (
          <Bounty
            key={selection.name}
            img={selection.image}
            name={selection.name}
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
            img={selection.image}
            name={selection.name}
            selected={selection.selected}
            onClick={() => selectAvailableBounty(selection.name)}
          />
        ))}
      </div>
    </Page>
  );
};

export default BountySelection;
