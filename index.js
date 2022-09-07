const addForm = document.querySelector("#addContact");
const adressBook = document.querySelector("#adressBook");
const localContanct = "contacts";

let contacts = [];
let favorites = [];

function createContact(object) {
  const card = document.createElement("div");
  const contactInfo = document.createElement("div");
  const btnWrap = document.createElement("div");
  const editBtn = document.createElement("button");
  const favoriteBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  favoriteBtn.name = object.phone_number;
  editBtn.name = object.phone_number;
  deleteBtn.name = object.phone_number;

  favoriteBtn.classList.add("favorite");
  editBtn.classList.add("edit");
  deleteBtn.classList.add("delete");
  contactInfo.classList.add("info-wrap");

  contactInfo.textContent = `${object.name} : ${object.phone_number}`;
  editBtn.textContent = "Edit";
  favoriteBtn.textContent = "Favorite";
  deleteBtn.textContent = "Delete";

  btnWrap.append(editBtn, favoriteBtn, deleteBtn);
  contactInfo.append(btnWrap);
  card.append(contactInfo);
  adressBook.appendChild(card);

  if (
    favorites.some((singleObj) => singleObj.phone_number === favoriteBtn.name)
  ) {
    favoriteBtn.classList.toggle("myFavorite");
  }

  deleteBtn.addEventListener("click", (e) => {
    deleteArrayObj(e);
  });

  favoriteBtn.addEventListener("click", (e) => {
    addToFavorites(e);
  });

  editBtn.addEventListener("click", (e) => {
    editContact(e);
  });
}

function editContact(event) {
  const editForm = document.createElement("form");
  const newName = document.createElement("input");
  const newNumber = document.createElement("input");
  const saveBtn = document.createElement("button");

  newName.name = "editName";
  newNumber.name = "editNumber";

  saveBtn.setAttribute("type", "submit");
  saveBtn.name = event.target.name;
  saveBtn.textContent = "Save";

  editForm.classList.add("editContact");
  editForm.append(newName, newNumber, saveBtn);
  editForm.classList.add = "editContactForm";
  currentContact = contacts.filter((singleContact) => {
    return singleContact.phone_number === event.target.name;
  });

  newName.value = currentContact[0].name;
  newNumber.value = currentContact[0].phone_number;

  event.target.parentElement.parentElement.parentElement.appendChild(editForm);
  event.target.parentElement.parentElement.innerHTML = null;

  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const oldNumber = e.target.lastChild.name;
    editExistingContact(newName.value, newNumber.value, oldNumber);
  });
}

function editExistingContact(name, phone, oldNum) {
  const indexOfObj = contacts.findIndex((element) => {
    return element.phone_number === oldNum;
  });

  contacts[indexOfObj].name = name;
  contacts[indexOfObj].phone_number = phone;

  localStorage.setItem("contacts", JSON.stringify(contacts));
  checkContent(adressBook);
  createContactCard();
}

function addToFavorites(event) {
  const indexOfObj = contacts.findIndex((element) => {
    return element.phone_number === event.target.name;
  });

  const isInList = favorites.some(
    (contact) => contact.phone_number === event.target.name
  );

  if (isInList) {
    const indexOfFav = favorites.findIndex((element) => {
      return element.phone_number === event.target.name;
    });
    favorites.splice(indexOfFav, 1);
    event.target.classList.toggle("myFavorite");
  } else {
    event.target.classList.toggle("myFavorite");
    favorites.push(contacts[indexOfObj]);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function deleteArrayObj(event) {
  const indexOfObj = contacts.findIndex((element) => {
    return element.phone_number === event.target.name;
  });
  contacts.splice(indexOfObj, 1);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  adressBook.removeChild(event.target.parentElement);
}

function checkContent(div) {
  if (div.firstChild) {
    div.innerHTML = null;
  }
}

function createContactCard() {
  if (contacts.length > 0) {
    contacts.forEach((singleContact) => {
      createContact(singleContact);
    });
  }
}

addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const contactName = document.querySelector("#name");
  const phoneNum = document.querySelector("#phoneNum");

  if (contactName.value && phoneNum.value) {
    person = {};
    person[contactName.name] = contactName.value;
    person[phoneNum.name] = phoneNum.value;
    contacts.push(person);
    localStorage.setItem("contacts", JSON.stringify(contacts));

    checkContent(adressBook);
    createContactCard();
  }
});

document.querySelector("#search").addEventListener("submit", (e) => {
  e.preventDefault();
  const searchInput = document.querySelector("#searchInput");
  const searchResult = document.querySelector("#searchResult");

  const indexOfObj = contacts.findIndex((element) => {
    return (
      element.name === searchInput.value ||
      element.phone_number === searchInput.value
    );
  });
  if (indexOfObj > -1) {
    searchResult.textContent = "";
    searchResult.textContent = `${contacts[indexOfObj].name} : ${contacts[indexOfObj].phone_number} `;
  } else {
    searchResult.textContent = "";
    searchResult.textContent = "Contact not found!";
  }
});

if (localStorage.getItem("contacts")) {
  checkContent(adressBook);
  let contactObj = JSON.parse(localStorage.getItem("contacts"));

  contactObj.forEach((singleContact) => {
    contacts.push(singleContact);
    createContact(singleContact);
  });
}

if (localStorage.getItem("favorites")) {
  let favoriteObj = JSON.parse(localStorage.getItem("favorites"));

  favoriteObj.forEach((singleContact) => {
    favorites.push(singleContact);
  });

  const favoriteBtns = document.querySelectorAll(".favorite");
  favoriteBtns.forEach((singleBtn) => {
    if (
      favorites.some((singleObj) => singleObj.phone_number === singleBtn.name)
    ) {
      singleBtn.classList.toggle("myFavorite");
    }
  });
}
