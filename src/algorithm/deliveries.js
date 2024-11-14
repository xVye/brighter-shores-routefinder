export const deliveryData = {
    'Carrots': {
        buyLocation: 'Greengrocers',
        sellLocation: 'Tanners Road',
    },
    'Soap': {
        buyLocation: 'Soap Shop',
        sellLocation: "Lord's Road West"
    },
    'Ribs': {
        buyLocation: "Lord's Road West",
        sellLocation: 'Outer Market',
    },
    'Meat Wrap': {
        buyLocation: 'Thadwick Square',
        sellLocation: 'Unicorn Farm'
    },
    'Beef Joint': {
        buyLocation: "Henderson's Meat Storehouse",
        sellLocation: 'Thadwick Square'
    },
    'Clockwork Sheep': {
        buyLocation: "Lord's Road East",
        sellLocation: "Lani's Curiosities"
    },
    'Porcelain Doll': {
        buyLocation: "Tanners Road",
        sellLocation: 'Fortunehold Farm'
    },
    'Plates': {
        buyLocation: "Cobble Corner",
        sellLocation: "Waterfront Market"
    },
    'Pin Badge': {
        buyLocation: 'Outer Market',
        sellLocation: 'Cyclops Store Cave'
    },
    'Pumpkin': {
        buyLocation: 'Fortunehold Farm',
        sellLocation: "Lord's Road Central"
    },
    'Pizza': {
        buyLocation: 'Goose Inn Kitchen',
        sellLocation: "Meggrit's Market"
    }
}

export const DeliveryStatus = {
    NOT_STARTED: 0, // The item still needs to be purchased
    IN_PROGRESS: 1, // The item has been purchased but not yet sold
    COMPLETED: 2    // The item has been purchased and sold
}
