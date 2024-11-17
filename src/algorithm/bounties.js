import { markets } from "./nodes.js";

export const bounties = {
  CARROTS: {
    name: "Carrots",
    exp: 3718,
    seller: markets.GREENGROCERS,
    buyer: markets.TOY_STALL,
  },
  SOAP: {
    name: "Soap",
    exp: 3625,
    seller: markets.SOAP_SHOP,
    buyer: markets.BUTCHERS_STALL,
  },
  RIBS: {
    name: "Ribs",
    exp: 2654,
    seller: markets.BUTCHERS_STALL,
    buyer: markets.SOUVENIR_STALL,
  },
  MEAT_WRAP: {
    name: "Meat Wrap",
    exp: 2667,
    seller: markets.HALLIGS_STREET_FOOD,
    buyer: markets.CHEESE_SHOP,
  },
  BEEF_JOINT: {
    name: "Beef Joint",
    exp: 2236,
    seller: markets.HENDERSONS_MEAT,
    buyer: markets.HALLIGS_STREET_FOOD,
  },
  CLOCKWORK_SHEEP: {
    name: "Clockwork Sheep",
    exp: 2594,
    seller: markets.PENNYS_CLOCKWORK,
    buyer: markets.CLOCK_STALL,
  },
  PORCELAIN_DOLL: {
    name: "Porcelain Doll",
    exp: 3296,
    seller: markets.TOY_STALL,
    buyer: markets.FORTUNEHOLD_FARM,
  },
  PLATES: {
    name: "Plates",
    exp: 3364,
    seller: markets.HERMARS_HOMEWARE,
    buyer: markets.JENNALERS_WINES,
  },
  PIN_BADGE: {
    name: "Pin Badge",
    exp: 2590,
    seller: markets.SOUVENIR_STALL,
    buyer: markets.VICTOR_T_CYCLOPS,
  },
  PUMPKIN: {
    name: "Pumpkin",
    exp: 3574,
    seller: markets.FORTUNEHOLD_FARM,
    buyer: markets.VASE_STALL,
  },
  PIZZA: {
    name: "Pizza",
    exp: 3804,
    seller: markets.CHEF,
    buyer: markets.FRANCESCAS_FRUIT_STALL,
  },
  BANANAS: {
    name: "Bananas",
    exp: 3860,
    seller: markets.FRANCESCAS_FRUIT_STALL,
    buyer: markets.PENNYS_CLOCKWORK,
  },
  TIN_POCKET_WATCH: {
    name: "Tin Pocket Watch",
    exp: 4220,
    seller: markets.SNILCHS_WATCHES,
    buyer: markets.BOGGS_ANTIQUES,
  },
  HOMESPUN_CLOTH: {
    name: "Homespun Cloth",
    exp: 3030,
    seller: markets.TEXTILES_STALL,
    buyer: markets.CLOCK_STALL,
  },
  RAINBOW_CHEESE: {
    name: "Rainbow Cheese",
    exp: 2852,
    seller: markets.CHEESE_SHOP,
    buyer: markets.HENDERSONS_MEAT,
  },
  ARGANIAN_WINE: {
    name: "Arganian Wine",
    exp: 3796,
    seller: markets.JENNALERS_WINES,
    buyer: markets.VASE_STALL,
  },
  OAK_PATTERNED_VASE: {
    name: "Oak Patterned Vase",
    exp: 2874,
    seller: markets.VASE_STALL,
    buyer: markets.HENDERSONS_MEAT,
  },
  SCENTED_CANDLE: {
    name: "Scented Candle",
    exp: 3551,
    seller: markets.CANDICES_CANDLES,
    buyer: markets.SOAP_SHOP,
  },
  UNICORN_DUST: {
    exp: 3298,
    name: "Unicorn Dust",
    seller: markets.VICTOR_T_CYCLOPS,
    buyer: markets.JANESSAS_DELICACIES,
  },
  LANDSCAPE_PAINTING: {
    exp: 3228,
    name: "Landscape Painting",
    seller: markets.BERTS_GALLERY,
    buyer: markets.TOMMY_SHOES_WINES,
  },
};

export const BountyStatus = {
  NOT_STARTED: 0, // The item still needs to be purchased
  IN_PROGRESS: 1, // The item has been purchased but not yet sold
  COMPLETED: 2, // The item has been purchased and sold
};
