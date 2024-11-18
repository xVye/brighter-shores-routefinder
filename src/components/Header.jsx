import ExternalLink from "./ExternalLink.jsx";
import Github from "../icons/Github.jsx";
import Menu from "../icons/Menu.jsx";
import Discord from "../icons/Discord.jsx";

const Header = ({ setMobileMenuShown }) => {
  return (
    <header className="border-b py-2 sticky top-0 bg-white z-50">
      <div className="max-w-[1200px] mx-auto px-3">
        <div className="flex justify-between place-content-center">
          <div className="flex items-center place-content-center">
            <div
              className="md:hidden mr-2 hover:bg-gray-200 rounded p-1 cursor-pointer"
              onClick={() => setMobileMenuShown((shown) => !shown)}
            >
              <Menu className="w-6 h-6" />
            </div>
            <img
              src="android-chrome-192x192.png"
              alt="Brighter Shores"
              width={82}
              height={82}
              className="mr-3"
            />
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold">RouteFinder</span>
              <span className="font-light">For Brighter Shores</span>
            </div>
          </div>

          <div className="flex items-center place-content-center gap-4">
            <ExternalLink
              to="https://discord.gg/fcSYv9GPwJ"
              title="Join our Discord server"
            >
              <div className="p-1 hover:bg-gray-200 cursor-pointer flex justify-center place-content-center rounded">
                <Discord className="w-7 h-7" />
              </div>
            </ExternalLink>
            <ExternalLink
              to="https://github.com/bricefrisco/brighter-shores-routefinder"
              title="View source code (Github)"
            >
              <div className="p-1 hover:bg-gray-200 cursor-pointer flex justify-center place-content-center rounded">
                <Github className="w-7 h-7" />
              </div>
            </ExternalLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
