import useBounties from "../hooks/useBounties.js";
import Page from "../components/Page.jsx";
import { useEffect, useState } from "react";
import Bounty from "../components/Bounty.jsx";
import Subheading from "../components/Subheading.jsx";
import Paragraph from "../components/Paragraph.jsx";

const worker = new Worker(new URL("../algorithm/worker.js", import.meta.url), {
  type: "module",
});

const formatTime = (input) => {
  let seconds = parseInt(input, 10);
  if (isNaN(seconds)) {
    return input; // In case the input is not a valid number.
  }

  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;

  if (minutes > 0) {
    return `${minutes}m${seconds}s`;
  } else {
    return `${seconds}s`;
  }
};

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
      currentBounties: selectedBounties,
      availableBounties: selectedAvailableBounties,
    });
  }, [selectedBounties, selectedAvailableBounties]);

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
      {data.deliveries?.length ? (
        <>
          <Subheading>Route</Subheading>
          <Paragraph>
            After abandoning and/or picking up the bounties mentioned above,
            take the following route to complete them in the most efficient way:
          </Paragraph>
          {/*<div className="grid grid-cols-6 gap-0">*/}
          {/*  {data.deliveries.map((bounty) => (*/}
          {/*    <Bounty key={bounty} type={bounty} size="small" />*/}
          {/*  ))}*/}
          {/*</div>*/}
        </>
      ) : null}

      {data.actions?.length ? (
        <div className="relative overflow-x-auto mb-7">
          <table className="table-fixed w-full text-left rtl:text-right">
            <thead className="text-gray-900 uppercase">
              <tr className="border-b border-gray-100">
                <th scope="col" className="py-3">
                  Action
                </th>
                <th scope="col" className="py-3">
                  Item
                </th>
                <th scope="col" className="py-3 text-right">
                  Location
                </th>
                <th scope="col" className="py-3 text-right">
                  Est. Time
                </th>
              </tr>
            </thead>
            <tbody>
              {data.actions.map((action, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 last:border-none"
                >
                  <td className="py-3 capitalize">{action.type}</td>
                  <td className="py-3">
                    {action.item ? (
                      <Bounty type={action.item} size="small" />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="py-3 text-right">{action.location}</td>
                  <td className="py-3 text-right">
                    {formatTime(Math.round(action.distance))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {data.actions ? (
        <Paragraph>
          After completing the route, you can navigate back to the previous page
          using the button below or the navigation menu and select more bounties
          to complete.
        </Paragraph>
      ) : null}
    </Page>
  );
};

export default BountyPlan;
