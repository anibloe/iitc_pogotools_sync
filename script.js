(() => {
	const fetchJSON = (() => {
		// prettier-ignore
		return Promise.all([
      fetch("./IITC-pogo_new.json"),
      fetch("./IITC-pogo_tablet.json"),
      fetch("./IITC-pogo_laptop.json"),
      fetch("./IITC-pogo_desktop.json"),
      fetch("./IITC-pogo_old.json")
    ])
    .then(jsonObjs => {
      return Promise.all(jsonObjs.map(jsonObj => jsonObj.json()));
    })
		.then((arrJsonObjs) => {
			const used = [];
			const nObj = {};

			arrJsonObjs.forEach((oObj) => {
				const oCats = Object.keys(oObj);

				oCats.forEach((oCat) => {
					const oItemIds = Object.keys(oObj[oCat]);

					oItemIds.forEach((oItemId) => {
						const isDone = used.includes(oItemId);

						if (!!isDone) return;

						used.push(oItemId);

						if (!nObj[oCat]) nObj[oCat] = {};

						nObj[oCat][oItemId] = oObj[oCat][oItemId];
					});
				});
			});

			const elLink = document.createElement("a");
			elLink.href = window.URL.createObjectURL(new Blob([JSON.stringify(nObj)], { type: "text/plain" }));
			elLink.download = "IITC-pogo__output.json";
			elLink.click();

			console.log(nObj);
		})
		.catch(console.error);
	})();
})();
