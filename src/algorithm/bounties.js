import { markets } from "./nodes.js";

export const bounties = {
  CARROTS: {
    name: "Carrots",
    seller: markets.GREENGROCERS,
    buyer: markets.TOY_STALL,
  },
  SOAP: {
    name: "Soap",
    seller: markets.SOAP_SHOP,
    buyer: markets.BUTCHERS_STALL,
  },
  RIBS: {
    name: "Ribs",
    seller: markets.BUTCHERS_STALL,
    buyer: markets.SOUVENIR_STALL,
  },
  MEAT_WRAP: {
    name: "Meat Wrap",
    seller: markets.HALLIGS_STREET_FOOD,
    buyer: markets.CHEESE_SHOP,
  },
  BEEF_JOINT: {
    name: "Beef Joint",
    seller: markets.HENDERSONS_MEAT,
    buyer: markets.HALLIGS_STREET_FOOD,
  },
  CLOCKWORK_SHEEP: {
    name: "Clockwork Sheep",
    seller: markets.PENNYS_CLOCKWORK,
    buyer: markets.CLOCK_STALL,
  },
  PORCELAIN_DOLL: {
    name: "Porcelain Doll",
    seller: markets.TOY_STALL,
    buyer: markets.FORTUNEHOLD_FARM,
  },
  PLATES: {
    name: "Plates",
    seller: markets.HERMARS_HOMEWARE,
    buyer: markets.JENNALERS_WINES,
  },
  PIN_BADGE: {
    name: "Pin Badge",
    seller: markets.SOUVENIR_STALL,
    buyer: markets.VICTOR_T_CYCLOPS,
  },
  PUMPKIN: {
    name: "Pumpkin",
    seller: markets.FORTUNEHOLD_FARM,
    buyer: markets.VASE_STALL,
  },
  PIZZA: {
    name: "Pizza",
    seller: markets.CHEF,
    buyer: markets.FRANCESCAS_FRUIT_STALL,
  },
  BANANAS: {
    name: "Bananas",
    seller: markets.FRANCESCAS_FRUIT_STALL,
    buyer: markets.PENNYS_CLOCKWORK,
  },
  TIN_POCKET_WATCH: {
    name: "Tin Pocket Watch",
    seller: markets.SNILCHS_WATCHES,
    buyer: markets.BOGGS_ANTIQUES,
  },
  HOMESPUN_CLOTH: {
    name: "Homespun Cloth",
    seller: markets.TEXTILES_STALL,
    buyer: markets.CLOCK_STALL,
  },
};

export const BountyStatus = {
  NOT_STARTED: 0, // The item still needs to be purchased
  IN_PROGRESS: 1, // The item has been purchased but not yet sold
  COMPLETED: 2, // The item has been purchased and sold
};

export const deliveryData = {
  Carrots: {
    buyLocation: "Greengrocers",
    sellLocation: "Tanners Road",
  },
  Soap: {
    buyLocation: "Soap Shop",
    sellLocation: "Lord's Road West",
  },
  Ribs: {
    buyLocation: "Lord's Road West",
    sellLocation: "Outer Market",
  },
  "Meat Wrap": {
    buyLocation: "Thadwick Square",
    sellLocation: "Unicorn Farm",
  },
  "Beef Joint": {
    buyLocation: "Henderson's Meat Storehouse",
    sellLocation: "Thadwick Square",
  },
  "Clockwork Sheep": {
    buyLocation: "Lord's Road East",
    sellLocation: "Lani's Curiosities",
  },
  "Porcelain Doll": {
    buyLocation: "Tanners Road",
    sellLocation: "Fortunehold Farm",
  },
  Plates: {
    buyLocation: "Cobble Corner",
    sellLocation: "Waterfront Market",
  },
  "Pin Badge": {
    buyLocation: "Outer Market",
    sellLocation: "Cyclops Store Cave",
  },
  Pumpkin: {
    buyLocation: "Fortunehold Farm",
    sellLocation: "Lord's Road Central",
  },
  Pizza: {
    buyLocation: "Goose Inn Kitchen",
    sellLocation: "Meggrit's Market",
  },
  Bananas: {
    buyLocation: "Meggrit's Market",
    sellLocation: "Lord's Road East",
  },
  "Tin Pocket Watch": {
    buyLocation: "Meggrit's Market",
    sellLocation: "Bogg's Antiques",
  },
};

export const DeliveryStatus = {
  NOT_STARTED: 0, // The item still needs to be purchased
  IN_PROGRESS: 1, // The item has been purchased but not yet sold
  COMPLETED: 2, // The item has been purchased and sold
};
