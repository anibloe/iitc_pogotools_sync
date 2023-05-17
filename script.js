const obj = {
    gyms: {
      "8423a915f20a4ad08ea411908f68f2e9.16": {
        guid: "8423a915f20a4ad08ea411908f68f2e9.16",
        lat: 51.736352,
        lng: -0.449545,
        name: "Barnacres Play Area",
      },
    },
    pokestops: {
      "1262fb688aed45828b97763f6fc745c8.16": {
        guid: "1262fb688aed45828b97763f6fc745c8.16",
        lat: 51.741264,
        lng: -0.434381,
        name: "Acorn carving bench",
      },
    },
    notpogo: {
      "f66681a95a5e45fc85a65bda6ef4eaea.16": {
        guid: "f66681a95a5e45fc85a65bda6ef4eaea.16",
        lat: 51.733297,
        lng: -0.458766,
        name: "Apsley Basin Gate",
      },
    },
    ignoredCellsExtraGyms: {},
    ignoredCellsMissingGyms: {},
  },
  used = [],
  cats = Object.keys(obj),
  newObj = {
    gyms: {},
    pokestops: {},
    notpogo: {},
    ignoredCellsExtraGyms: {},
    ignoredCellsMissingGyms: {},
  };

cats.forEach((key) => {
  const itemIds = Object.keys(obj[key]);

  itemIds.forEach((itemId) => {
    const isDone = used.includes(itemId);

    if (!!isDone) return;

    used.push(itemId);

    newObj[key][itemId] = obj[key][itemId];
  });
});
