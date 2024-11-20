import ExternalLink from "./ExternalLink.jsx";

const Footer = () => {
  return (
    <footer className="py-6 text-sm text-gray-500 dark:text-zinc-400 border-t dark:border-zinc-700">
      <p>RouteFinder for Brighter Shores.</p>
      <p className="pt-1">
        Find a better route than what the tool suggests, or an inaccurate ETA?{" "}
        <ExternalLink to="https://discord.gg/fcSYv9GPwJ">
          Let us know!
        </ExternalLink>
      </p>
      <p className="pt-1">
        Open source. View and improve the code on{" "}
        <ExternalLink to="https://github.com/bricefrisco/brighter-shores-routefinder">
          Github.
        </ExternalLink>
      </p>
    </footer>
  );
};

export default Footer;
