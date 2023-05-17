(() => {
	const fetchExternalData = () => {
		// prettier-ignore
		return Promise.all([
      fetch("./IITC-pogo_new.json"),
      fetch("./IITC-pogo_tablet.json"),
      fetch("./IITC-pogo_laptop.json"),
      fetch("./IITC-pogo_desktop.json"),
      fetch("./IITC-pogo_old.json")
    ])
    .then(results => {
      return Promise.all(results.map(result => result.json()));
    });
	};

	fetchExternalData()
		.then((arrJsonObjs) => {
			const used = [];

			const newObj = {
				gyms: {},
				pokestops: {},
				notpogo: {},
				ignoredCellsExtraGyms: {},
				ignoredCellsMissingGyms: {},
			};

			arrJsonObjs.forEach((jsonObj) => {
				const cats = Object.keys(jsonObj);

				cats.forEach((key) => {
					const itemIds = Object.keys(jsonObj[key]);

					itemIds.forEach((itemId) => {
						const isDone = used.includes(itemId);

						if (!!isDone) return;

						used.push(itemId);

						newObj[key][itemId] = jsonObj[key][itemId];
					});
				});
			});

			const elLink = document.createElement("a");
			elLink.href = window.URL.createObjectURL(new Blob([JSON.stringify(newObj)], { type: "text/plain" }));
			elLink.download = "IITC-pogo__output.json";
			elLink.click();
		})
		.catch(console.error);
})();
