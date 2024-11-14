import CheckCircle from "../icons/CheckCircle.jsx";

const Bounty = ({ img, name, selected, onClick }) => {
  return (
    <div
      className="w-full border p-4 rounded cursor-pointer hover:text-blue-500 hover:bg-gray-50 block relative"
      onClick={onClick}
    >
      <div className="flex items-center text-right">
        <img
          width={50}
          height={50}
          src={img}
          alt="carrots"
          className="rounded-md"
        />
        <div className="ml-4 text-lg">{name}</div>
        {selected && (
          <CheckCircle className="size-7 text-green-500 absolute right-1 top-1" />
        )}
      </div>
    </div>
  );
};

export default Bounty;
