/**
 * Starting at Rugged Canyon, traverse the map as if we were hugging the left wall.
 * This means we go in the order of: west, north, east, south.
 *
 * Double quote all keys since some contain single quotes.
 */
const locations = {
    "Boulder Canyon": {
        connections: [

        ]
    },
    "Council Office": {
        connections: [

        ]
    },
    "Cyclops Canyon": {
        connections: [

        ]
    },
    "Cyclops East Pass": {
        connections: [

        ]
    },
    "Cyclops Living Area": {
        connections: [

        ]
    },
    "Cyclops Sleeping Cave": {
        connections: [

        ]
    },
    "Cyclops Store Cave": {
        connections: [

        ]
    },
    "Rugged Canyon": {
        connections: [

        ]
    },
    "Shrubby Canyon": {
        connections: [

        ]
    },
    "Unicorn Farm": {
        connections: [

        ]
    },
    "Stony Canyon": {
        connections: [

        ]
    },
    "Stony Gorge": {
        connections: [

        ]
    },
    "Stony Ravine": {
        connections: [

        ]
    },
    "Road to Crenopolis": {
        connections: [

        ]
    },
    "Rockbird Clearing": {
        connections: [

        ]
    },
    "Fortunehold Meadow": {
        connections: [

        ]
    },
    "Fortunehold Farm": {
        connections: [

        ]
    },
    "Fortunehold": {
        connections: [

        ]
    },
    "West Gate": {
        connections: [

        ]
    },
    "Lord's Road West": {
        connections: [

        ]
    },
    "Bladrick's Armory": {
        connections: [

        ]
    },
    "Hopton Corner": {
        connections: [

        ]
    },
    "Rat Alley": {
        connections: [

        ]
    },
    "Ratmen Den": {
        connections: [

        ]
    },
    "Murkwell Court": {
        connections: [

        ]
    },
    "Meggrit's Market": {
        connections: [

        ]
    },
    "Crenobelisk": {
        connections: [

        ]
    },
    "Murkwell Lane": {
        connections: [

        ]
    },
    "Sludge Street": {
        connections: [

        ]
    },
    "Sewer Gate": {
        connections: [

        ]
    },
    "Sewer Entrance": {
        connections: [

        ]
    },
    "Dismal Drainage": {
        connections: [

        ]
    },
    "Southwest Sewer": {
        connections: [

        ]
    },
    "Sewer Pipes": {
        connections: [

        ]
    },
    "Southeast Sewer": {
        connections: [

        ]
    },
    "Sewer Pool": {
        connections: [

        ]
    },
    "Dawkin Lane": {
        connections: [

        ]
    },
    "Soap Shop": {
        connections: [

        ]
    },
    "Dawkin Court": {
        connections: [

        ]
    },
    "Servant's House": {
        connections: [

        ]
    },
    "Servant's Bathroom": {
        connections: [

        ]
    },
    "Lord's Road Central": {
        connections: [

        ]
    },
    "Forensics Lab": {
        connections: [

        ]
    },
    "Lord's Road East": {
        connections: [

        ]
    },
    "Guardhouse Lobby": {
        connections: [

        ]
    },
    "Waltain's Office": {
        connections: [

        ]
    },
    "Investigation Hall": {
        connections: [

        ]
    },
    "Guard's Archive": {
        connections: [

        ]
    },
    "Interrogation Room": {
        connections: [

        ]
    },
    "Lord's Road New": {
        connections: [

        ]
    },
    "Thadwick Square": {
        connections: [

        ]
    },
    "Peacock Road South": {
        connections: [

        ]
    },
    "Peacock Road Central": {
        connections: [

        ]
    },
    "Peacock Road North": {
        connections: [

        ]
    },
    "Fillan's Living Room": {
        connections: [

        ]
    },
    "Fillan's Bedroom": {
        connections: [

        ]
    },
    "Fillan's Storeroom": {
        connections: [

        ]
    },
    "Kaynat's Garden": {
        connections: [

        ]
    },
    "Kaynat's Hall": {
        connections: [

        ]
    },
    "Fountain of Delight": {
        connections: [

        ]
    },
    "Vestere Drive": {
        connections: [

        ]
    },
    "Hamila Jimore's Garden": {
        connections: [

        ]
    },
    "Hamila Jimore's Hallway": {
        connections: [

        ]
    },
    "Private Road": {
        connections: [

        ]
    },
    "Helfar's Wall": {
        connections: [

        ]
    },
    "Helfar's Gate": {
        connections: [

        ]
    },
    "East Courtyard": {
        connections: [

        ]
    },
    "Slant Street": {
        connections: [

        ]
    },
    "Bogg's Antiques": {
        connections: [

        ]
    },
    "Dilapidated Warehouse": {
        connections: [

        ]
    },
    "West Player Market": {
        connections: [

        ]
    },
    "North Player Market": {
        connections: [

        ]
    },
    "East Player Market": {
        connections: [

        ]
    },
    "Henderson's Meat Storehouse": {
        connections: [

        ]
    },
    "Bert's Gallery": {
        connections: [

        ]
    },
    "Crenopolis Market Portal Stone": {
        connections: [

        ]
    },
    "South Player Market": {
        connections: [

        ]
    },
    "Market Chambers": {
        connections: [

        ]
    },
    "Ratmore Road": {
        connections: [

        ]
    },
    "City Dyes": {
        connections: [

        ]
    },
    "Tanners Road": {
        connections: [

        ]
    },
    "Tannery": {
        connections: [

        ]
    },
    "Quibble Lane": {
        connections: [

        ]
    },
    "Smuggler's Cove": {
        connections: [

        ]
    },
    "Waterfront": {
        connections: [

        ]
    },
    "Pier One": {
        connections: [

        ]
    },
    "Pier Two": {
        connections: [

        ]
    },
    "Waterfront Market": {
        connections: [

        ]
    },
    "The Frog and Barnacle": {
        connections: [

        ]
    },
    "Geld Family Residence": { // will we hit geld family logistics?
        connections: [

        ]
    },
    "Thimble Lane": {
        connections: [

        ]
    },
    "Morose Lane East": {
        connections: [

        ]
    },
    "Morose Lane West": {
        connections: [

        ]
    },
    "Lani's Curiosities": {
        connections: [

        ]
    },
    "Dusty Corner": {
        connections: [

        ]
    },
    "Dusty Alley": {
        connections: [

        ]
    },
    "Dusty Nook": {
        connections: [

        ]
    },
    "Twiddle Corner": {
        connections: [

        ]
    },
    "Cobble Corner": {
        connections: [

        ]
    }


}

export default locations;