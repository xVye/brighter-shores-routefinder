import CheckCircle from "../icons/CheckCircle.jsx";
import { bounties } from "../algorithm/bounties.js";
import { useMemo } from "react";

const Bounty = ({ bountyKey, selected, onClick, size = "normal" }) => {
  const bounty = useMemo(() => {
    return bounties[bountyKey];
  }, [bountyKey]);

  if (!bounty) {
    return null;
  }

  if (size === "small") {
    return (
      <div className="inline-block rounded px-1.5" onClick={onClick}>
        <div className="flex items-center">
          <img
            width={25}
            height={25}
            src={`https://brightershoreswiki.org/images/${bounty.name.replace(/ /g, "_")}.png`}
            onError={(e) => (e.currentTarget.src = "/unknown.jpg")}
            alt={bounty.name}
            className="rounded-md"
          />
          <div className="ml-1">{bounty.name}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full border p-2 rounded block relative ${onClick ? "cursor-pointer hover:text-blue-500 hover:bg-gray-50 select-none" : ""}`}
      onClick={onClick}
    >
      <div className="flex items-center text-right">
        <img
          width={42}
          height={42}
          src={`https://brightershoreswiki.org/images/${bounty.name.replace(/ /g, "_")}.png`}
          onError={(e) => (e.currentTarget.src = "/unknown.jpg")}
          alt="carrots"
          className="rounded-md"
        />
        <div className="ml-4 text-lg">{bounty.name}</div>
        {selected && (
          <CheckCircle className="size-7 text-green-500 absolute right-1 top-1" />
        )}
      </div>
    </div>
  );
};

export default Bounty;
