/*
  [1] GET TOTAL
  [2] CREATE PRODUCT
  [3] SAVE LOCALSTORAGE
  [4] CLEAR INPUT
  [5] READ
  [6] COUNT
  [7] DELETE
  [8] UPDATE
  [9] SEARCH
  [10] CLEAN DATA

*/

let title = document.querySelector("#title");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let search = document.querySelector("#search");

let total = document.querySelector(".total span");

let create = document.querySelector("#create");
let mainUpdate = document.querySelector("#mainUpdate");
let searchTitle = document.querySelector("#search-title");
let searchCategory = document.querySelector("#search-category");
let deleteAllButton = document.querySelector("#delete");

let deleteTable = document.querySelector("table .delete");
let updateTable = document.querySelector("table .update");
let table = document.querySelector("table");
let tbody = document.querySelector("table tbody");

let arry = [];

// CHECKING THE LOCAL STORAGE IF THERE IS ENY DATA
if (window.localStorage.getItem("data")) {
	let mainJson = JSON.parse(window.localStorage.getItem("data"));
	arry = mainJson;
	productOne(arry);
}

// CALLING THE DELETE ALL FUNCTION
deleteAllValue();

// CALLING THE TOTAL FUNCTION BY ALL INPUTS
price.oninput = totalOne;
taxes.oninput = totalOne;
ads.oninput = totalOne;
discount.oninput = totalOne;

// THE TOTAL FUNCTION
function totalOne() {
	if (price.value === "" || taxes.value === "" || ads.value === "") {
		total.innerHTML = "00";
		total.parentElement.classList.remove("active");
	} else {
		let marge =
			parseInt(price.value) + parseInt(taxes.value) + parseInt(ads.value);
		let final = isNaN(parseInt(discount.value))
			? marge
			: marge - parseInt(discount.value);
		total.parentElement.classList.add("active");
		total.innerHTML = final;
	}
}

// CALLING THE CREATE OBJECT FUNCTION BY THE CREATE BUTTON
create.onclick = createData;

// CREATE THE OBJECT FOR SAVE DATA
function createData() {
	//CREATE THE EMPTY OBJECT
	let mainObject = new Object();

	// CALLING THE LOOPING FUNCTION
	loopingCount(mainObject);

	// SAVE DATA TO LOCAL STORAGE
	window.localStorage.setItem("data", JSON.stringify(arry));

	// TO EMPTY THE TABLE
	tbody.innerHTML = "";

	// CALLING THE MAIN FUNCTION
	productOne(arry);

	// TO EMPTY THE INPUTS
	clearInputs();

	// CALLING THE DELETE ALL FUNCTION
	deleteAllValue();
}

// FUNCTION OF CLEAR ALL INPUTS
function clearInputs() {
	title.value = "";
	price.value = "";
	taxes.value = "";
	ads.value = "";
	discount.value = "";
	count.value = "";
	category.value = "";
	total.innerHTML = "00";
	total.parentElement.classList.remove("active");
}

// LOOPING COUNT FUNCTION
function loopingCount(test) {
	if (count.value !== "") {
		for (let i = 0; i < count.value; i++) {
			test = {
				id: arry.length + 1,
				tit: title.value,
				pri: price.value,
				tax: taxes.value,
				discou: discount.value,
				ad: ads.value,
				tot: total.innerHTML,
				coun: count.value,
				catego: category.value,
			};
			// PUSH THE OBJECTS
			arry.push(test);
		}
	} else {
		test = {
			id: arry.length + 1,
			tit: title.value,
			pri: price.value,
			tax: taxes.value,
			discou: discount.value,
			ad: ads.value,
			tot: total.innerHTML,
			coun: count.value,
			catego: category.value,
		};
		// PUSH THE OBJECTS
		arry.push(test);
	}
}

// CREATE PRODUCT
function productOne(test) {
	test.forEach((e, index) => {
		let tr = document.createElement("tr");
		tr.classList.add("tr");
		tr.dataset.id = `${e.id}`;
		// CREATE ID
		let id = document.createElement("td");
		let idText = document.createTextNode(`${index + 1}`);
		id.appendChild(idText);
		// CREATE TITLE
		let titleCreate = document.createElement("td");
		let titleText = document.createTextNode(`${e.tit !== "" ? e.tit : "--"}`);
		titleCreate.appendChild(titleText);
		// CREATE PRICE
		let priceCreate = document.createElement("td");
		let priceText = document.createTextNode(
			`${e.pri !== "" ? e.pri : "--"} DH`
		);
		priceCreate.appendChild(priceText);
		// CREATE TAXES
		let taxesCreate = document.createElement("td");
		let taxesText = document.createTextNode(
			`${e.tax !== "" ? e.tax : "--"} DH`
		);
		taxesCreate.appendChild(taxesText);
		// CREATE ADS
		let adsCreate = document.createElement("td");
		let adsText = document.createTextNode(`${e.ad !== "" ? e.ad : "--"} DH`);
		adsCreate.appendChild(adsText);
		// CREATE DISCOUNT
		let discountCreate = document.createElement("td");
		let discountText = document.createTextNode(
			`${e.discou !== "" ? e.discou : "--"} DH`
		);
		discountCreate.appendChild(discountText);
		// CREATE TOTAL
		let totalCreate = document.createElement("td");
		let totalText = document.createTextNode(
			`${e.tot !== "" ? e.tot : "--"} DH`
		);
		totalCreate.appendChild(totalText);
		// CREATE CATEGORY
		let categoryCreate = document.createElement("td");
		let categoryText = document.createTextNode(
			`${e.catego !== "" ? e.catego : "--"}`
		);
		categoryCreate.appendChild(categoryText);

		// CREATE THE UPDATE BUTTON
		let update = document.createElement("td");
		let updateSpan = document.createElement("span");
		updateSpan.classList.add("update");
		updateSpan.innerHTML = "update";
		update.appendChild(updateSpan);

		// CREATE THE DELETE BUTTON
		let deleting = document.createElement("td");
		let deletingSpan = document.createElement("span");
		deletingSpan.classList.add("delete");
		deletingSpan.innerHTML = "delete";
		deleting.appendChild(deletingSpan);

		// CREATE SELECT BUTTON
		let selectOne = document.createElement("td");
		let selectSpan = document.createElement("span");
		selectSpan.classList.add("select");
		selectSpan.innerHTML = "select";
		selectOne.appendChild(selectSpan);

		// TO APPEND EVERYTHINGS TO THE TR
		tr.append(
			id,
			titleCreate,
			priceCreate,
			taxesCreate,
			adsCreate,
			discountCreate,
			totalCreate,
			categoryCreate,
			update,
			deleting,
			selectOne
		);

		// TO APPEND TR TO THE TBODY
		tbody.appendChild(tr);
	});
}

deleteAllButton.onclick = () => {
	let pass = confirm("Are You Sure You Want To Clear");
	if (pass === true) {
		window.localStorage.clear();
		window.location.reload();
	} else {
		return false;
	}
};

// DELETE ALL FUNCTION
function deleteAllValue() {
	if (arry.length !== 0) {
		deleteAllButton.setAttribute("value", `delete all (${arry.length})`);
		deleteAllButton.classList.add("active");
	} else {
		return false;
	}
}

table.onclick = function (e) {
	deleteAndUpdate(e);
};

function deleteAndUpdate(e) {
	if (e.target.classList.contains("delete")) {
		let confirmOne = confirm("Are You Sure You Want To Delete It");
		if (confirmOne === true) {
			let filterArray = arry.filter((elem) => {
				if (
					+e.target.parentElement.parentElement.getAttribute("data-id") !==
					elem.id
				) {
					return elem;
				}
			});
			arry = filterArray;
			window.localStorage.setItem("data", JSON.stringify(arry));
			window.location.reload();
		} else {
			return false;
		}
	} else if (e.target.classList.contains("update")) {
		setDataToInputs(e.target);
		window.scrollTo({
			top: 10,
			behavior: "smooth",
		});
	} else if (e.target.classList.contains("select")) {
		e.target.classList.add("active");
		setDataToInputs(e.target);
	}
}

// SET THE DATA TO THE INPUTS TO UPDATE IT
function setDataToInputs(test) {
	arry.forEach((elem) => {
		if (+test.parentElement.parentElement.getAttribute("data-id") === elem.id) {
			elem.catching = "catch";
			title.value = elem.tit;
			price.value = elem.pri;
			taxes.value = elem.tax;
			ads.value = elem.ad;
			discount.value = elem.discou;
			count.value = "";
			category.value = elem.catego;
			total.innerHTML = elem.tot;
			total.parentElement.classList.add("active");
			mainUpdate.style.display = "block";
			create.style.display = "none";
			count.style.visibility = "hidden";
			count.style.pointerEvents = "none";
		}
	});
}

// THE MAIN UPDATE CLICK
mainUpdate.onclick = () => {
	arry.forEach((elementing) => {
		if (elementing.catching) {
			elementing.tit = title.value;
			elementing.pri = price.value;
			elementing.tax = taxes.value;
			elementing.ad = ads.value;
			elementing.discou = discount.value;
			elementing.catego = category.value;
			elementing.tot = total.innerHTML;

			delete elementing.catching;
		}
	});

	console.log(arry);
	total.innerHTML = "00";
	total.parentElement.classList.remove("active");
	mainUpdate.style.display = "none";
	create.style.display = "block";
	count.style.visibility = "visible";
	count.style.pointerEvents = "all";

	window.localStorage.setItem("data", JSON.stringify(arry));
	clearInputs();
	window.location.reload();
};

searchTitle.onclick = () => {
	let hello = arry.filter((element) =>
		element.tit.toLocaleUpperCase() === search.value.toLocaleUpperCase()
			? element
			: false
	);
	search.value = "";
	tbody.innerHTML = "";
	productOne(hello);
};

searchCategory.onclick = () => {
	let hello = arry.filter((element) =>
		element.catego.toLocaleUpperCase() === search.value.toLocaleUpperCase()
			? element
			: false
	);
	search.value = "";
	tbody.innerHTML = "";
	productOne(hello);
};

