import Page from "../components/Page.jsx";
import Paragraph from "../components/Paragraph.jsx";
import Subheading from "../components/Subheading.jsx";
import useSettings from "../hooks/useSettings.js";
import ExternalLink from "../components/ExternalLink.jsx";

const additionalRooms = [
  {
    level: 4,
    rooms: ["Geld Family Residence", "Geld Family Logistics"],
  },
  {
    level: 8,
    rooms: ["Dilapidated Warehouse", "Slant Street Cart House"],
  },
  {
    level: 18,
    rooms: ["Oscen's Warehouse", "Market Chambers"],
  },
  {
    level: 51,
    rooms: ["Four Winds Back Room", "Four Winds Side Room"],
  },
  {
    level: 83,
    rooms: ["Gillad's House", "The Quill Club"],
  },
  // {
  //   level: 121,
  //   rooms: ["Geld Family Residence", "Geld Family Logistics"],
  // },
  // {
  //   level: 168,
  //   rooms: ["Dilapidated Warehouse", "Slant Street Cart House"],
  // },
  // {
  //   level: 219,
  //   rooms: ["Oscen's Warehouse", "Market Chambers"],
  // },
  // {
  //   level: 344,
  //   rooms: ["Four Winds Side Room", "Four Winds Back Room"],
  //   infoNeeded: true,
  // },
  // {
  //   level: 451,
  //   rooms: ["Gillad's House", "The Quill Club"],
  //   infoNeeded: true,
  // },
];

const Configuration = () => {
  const {
    merchantingLevel,
    detectiveLevel,
    battleOfFortuneholdCompleted,
    setMerchantingLevel,
    setDetectiveLevel,
    setBattleOfFortuneholdCompleted,
  } = useSettings();

  return (
    <Page
      title="Configuration"
      meta="Settings for the tool are saved to your browser."
    >
      <Subheading>Merchanting Level</Subheading>
      <Paragraph>
        Used to hide bounties that require a higher merchanting level. Leave
        blank to show all bounties.
      </Paragraph>

      <input
        value={merchantingLevel}
        onChange={(e) => setMerchantingLevel(e.target.value)}
        type="number"
        min="0"
        max="500"
        className="mb-5 block p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
      />

      <Subheading>Detective Level</Subheading>
      <Paragraph>
        Higher detective levels allow for shorter routes by unlocking rooms. If
        you leave this blank, the tool will assume you have a detective level of
        zero. It is <span className="font-bold">highly recommended</span> to set
        this, or the tool will not take into account any rooms you have
        unlocked.
      </Paragraph>

      <input
        value={detectiveLevel}
        onChange={(e) => setDetectiveLevel(e.target.value)}
        type="number"
        min="0"
        max="500"
        className="mb-5 block p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
      />

      <div className="mb-5">
        <div className="font-semibold mb-2">Additional room unlocks:</div>
        <ul className="list-disc ml-5">
          {detectiveLevel < 4 && <li className="mb-2">None.</li>}
          {additionalRooms.map(
            ({ level, rooms, infoNeeded }) =>
              detectiveLevel >= level && (
                <li key={level} className="mb-2">
                  {rooms.join(" and ")}{" "}
                  {infoNeeded && (
                    <div className="text-sm text-red-500 italic">
                      Not currently included in routes because more info is
                      needed. Please contribute via{" "}
                      <ExternalLink to="https://discord.gg/fcSYv9GPwJ">
                        Discord
                      </ExternalLink>
                      !
                    </div>
                  )}
                </li>
              ),
          )}
        </ul>
      </div>

      <Subheading>Quests</Subheading>
      <Paragraph>
        Some quests unlock new rooms. It is{" "}
        <span className="font-bold">highly recommended</span> to check any
        completed quests, or the tool will not take them into account.
      </Paragraph>

      <div className="flex items-center mb-4">
        <input
          id="default-checkbox"
          type="checkbox"
          checked={battleOfFortuneholdCompleted}
          onChange={(e) => setBattleOfFortuneholdCompleted(e.target.checked)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label
          htmlFor="default-checkbox"
          className="ms-2 text-sm font-medium text-gray-900"
        >
          Battle of Fortunehold
        </label>
      </div>

      <Paragraph className="mt-10">
        Your settings are saved automatically when changed.
      </Paragraph>
    </Page>
  );
};

export default Configuration;
