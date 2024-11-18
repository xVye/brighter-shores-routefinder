import ExternalLink from "./ExternalLink.jsx";

const Footer = () => {
  return (
    <footer className="py-6 text-sm text-gray-500 border-t">
      <p>RouteFinder for Brighter Shores.</p>
      <p className="pt-1">
        Find a better route than what the tool suggests?{" "}
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
