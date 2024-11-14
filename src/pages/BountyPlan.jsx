import useBounties from "../hooks/useBounties.js";
import Page from "../components/Page.jsx";
import { useEffect, useState } from "react";
import Bounty from "../components/Bounty.jsx";
import Subheading from "../components/Subheading.jsx";
import Paragraph from "../components/Paragraph.jsx";

const worker = new Worker(new URL("../algorithm/worker.js", import.meta.url), {
  type: "module",
});

const BountyPlan = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const { selectedBounties } = useBounties("bounties");
  const { selectedBounties: selectedAvailableBounties } =
    useBounties("availableBounties");

  useEffect(() => {
    worker.onmessage = (event) => {
      setData(event.data);
      setLoading(false);
    };
  }, []);

  useEffect(() => {
    if (
      selectedBounties.length === 0 &&
      selectedAvailableBounties.length === 0
    ) {
      return;
    }

    setData({});
    setLoading(true);
    worker.postMessage({
      currentDeliveries: selectedBounties,
      availableDeliveries: selectedAvailableBounties,
    });
  }, [selectedBounties, selectedAvailableBounties]);

  console.log(data);
  console.log(selectedBounties, selectedAvailableBounties);

  return (
    <Page title="Bounty Plan" meta="The best route based on your selections.">
      {loading && (
        <div className="h-[325px] flex items-center place-content-center mb-6">
          <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse">
            Calculating best route...
          </div>
        </div>
      )}
      {data.abandon?.length ? (
        <>
          <Subheading>Abandon</Subheading>
          {/*<Paragraph>First, abandon the following bounties</Paragraph>*/}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {data.abandon.map((bounty) => (
              <Bounty key={bounty} type={bounty} />
            ))}
          </div>
        </>
      ) : null}
      {data.pickup?.length ? (
        <>
          <Subheading>Pickup</Subheading>
          {/*<Paragraph>Next, accept the following bounties</Paragraph>*/}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {data.pickup.map((bounty) => (
              <Bounty key={bounty} type={bounty} />
            ))}
          </div>
        </>
      ) : null}
      {data.deliveries && (
        <>
          <Subheading>Route</Subheading>
          <Paragraph>
            After abandoning and/or picking up the bounties mentioned above,
            take the following route to complete them in the most efficient way:
          </Paragraph>
          <div className="grid grid-cols-6 gap-0">
            {data.deliveries.map((bounty) => (
              <Bounty key={bounty} type={bounty} size="small" />
            ))}
          </div>
        </>
      )}
    </Page>
  );
};

export default BountyPlan;
