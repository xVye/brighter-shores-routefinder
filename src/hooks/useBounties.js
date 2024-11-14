import { deliveryData } from "../algorithm/bounties.js";
import { useEffect, useMemo, useState } from "react";

const defaultBountyState = Object.keys(deliveryData).map((key) => ({
  name: key,
  image: `https://brightershoreswiki.org/images/${key.replace(" ", "_")}.png`,
  selected: false,
}));

const useBounties = (key) => {
  const [bounties, setBounties] = useState(() => {
    const bountyJson = sessionStorage.getItem(key);
    if (bountyJson) {
      return JSON.parse(sessionStorage.getItem(key));
    }

    return defaultBountyState;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(bounties));
  }, [key, bounties]);

  const selectedBounties = useMemo(() => {
    return bounties
      .filter((bounty) => bounty.selected)
      .map((bounty) => bounty.name);
  }, [bounties]);

  const selectBounty = (name) => {
    const newBounties = bounties.map((bounty) => {
      if (bounty.name === name) {
        return {
          ...bounty,
          selected: !bounty.selected && selectedBounties.length < 6,
        };
      }
      return bounty;
    });

    setBounties(newBounties);
  };

  return { bounties, selectedBounties, selectBounty };
};

export default useBounties;
