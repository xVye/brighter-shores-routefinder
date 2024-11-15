import CheckCircle from "../icons/CheckCircle.jsx";

const Bounty = ({ type, selected, onClick, size = "normal" }) => {
  if (size === "small") {
    return (
      <div className="inline-block rounded px-1.5" onClick={onClick}>
        <div className="flex items-center">
          <img
            width={25}
            height={25}
            src={`https://brightershoreswiki.org/images/${type.replace(/ /g, "_")}.png`}
            alt={type}
            className="rounded-md"
          />
          <div className="ml-1">{type}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full border p-4 rounded cursor-pointer hover:text-blue-500 hover:bg-gray-50 block relative"
      onClick={onClick}
    >
      <div className="flex items-center text-right">
        <img
          width={50}
          height={50}
          src={`https://brightershoreswiki.org/images/${type.replace(/ /g, "_")}.png`}
          alt="carrots"
          className="rounded-md"
        />
        <div className="ml-4 text-lg">{type}</div>
        {selected && (
          <CheckCircle className="size-7 text-green-500 absolute right-1 top-1" />
        )}
      </div>
    </div>
  );
};

export default Bounty;
