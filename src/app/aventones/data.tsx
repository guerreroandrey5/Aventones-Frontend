import React from "react";
const columns = [
    { name: "DRIVER", uid: "driver" },
    { name: "TRAVEL", uid: "from" },
    { name: "SEATS", uid: "seats" },
    { name: "FEE", uid: "fee" },
    { name: "ACTIONS", uid: "actions" },
];


/* driver: { type: mongoose.Schema.Types.ObjectId, ref: 'drivers' },
    riders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'riders' }],
    pickup: { type: String },
    destination: { type: String },
    days: { type: Array },
    fee: { type: Number },
    time: { type: String },
    seatsAvailable: { type: Number }

    {
        id: 1,
        driver: "guerreroandrey5",
        from: "Quesada",
        to: "Alajuela",
        seats: "04",
        fee: "$5",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        car: "Honda CR-V 2004",
    }
*/

const users = [
    {

        id: "66896d0777dd9c8161742c9d",
        driver: "Luis Guerrero",
        from: "Los Chiles Frontera",
        to: "Upala",
        seats: 4,
        fee: "$30",
        car: "KIA Sportage 2013"

    },
    {
        id: 2,
        driver: "Barroyo",
        from: "Quesada",
        to: "Naranjo",
        seats: "01",
        fee: "$10",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        car: "Toyota Corolla 2020",
    },
    {
        id: 3,
        driver: "yluna",
        from: "Aguas Zarcas",
        to: "Naranjo",
        seats: "01",
        fee: "--",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
        car: "Ford Festiva 1990",
    },
    {
        id: 4,
        driver: "Barroyo",
        from: "Naranjo",
        to: "Quesada",
        seats: "01",
        fee: "$10",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        car: "Toyota Corolla 2020",
    },
];

export { columns, users };