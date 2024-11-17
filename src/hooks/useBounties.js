import { bounties } from "../algorithm/bounties.js";
import { useEffect, useMemo, useState } from "react";

const defaultBountyState = Object.fromEntries(
  Object.entries(bounties).map(([key, value]) => [
    key,
    {
      name: value.name,
      selected: false,
    },
  ]),
);

const useBounties = (key) => {
  const [bountyObj, setBountyObj] = useState(() => {
    const bountyJson = sessionStorage.getItem(key);
    if (bountyJson) {
      return JSON.parse(sessionStorage.getItem(key));
    }

    return defaultBountyState;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(bountyObj));
  }, [key, bountyObj]);

  const bounties = useMemo(() => {
    return Object.keys(bountyObj).map((key) => ({
      key,
      ...bountyObj[key],
    }));
  }, [bountyObj]);

  const selectedBounties = useMemo(() => {
    return bounties.filter((bounty) => bounty.selected);
  }, [bounties]);

  const selectBounty = (key) => {
    setBountyObj((bountyObj) => {
      return {
        ...bountyObj,
        [key]: {
          ...bountyObj[key],
          selected: !bountyObj[key].selected,
        },
      };
    });
  };

  return { bounties, selectedBounties, selectBounty };
};

export default useBounties;
