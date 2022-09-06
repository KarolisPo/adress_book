const addForm = document.querySelector("#addContact");
const adressBook = document.querySelector("#adressBook");

let contacts = [];
let favorites = [];

function createContact(object) {
  console.log("this is start", contacts);
  const card = document.createElement("div");
  const editBtn = document.createElement("button");
  const favoriteBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  favoriteBtn.name = object.phone_number;
  editBtn.name = object.phone_number;
  deleteBtn.name = object.phone_number;

  favoriteBtn.classList.add("favorite");
  editBtn.classList.add("edit");
  deleteBtn.classList.add("delete");

  card.textContent = `${object.name} : ${object.phone_number}`;
  editBtn.textContent = "Edit";
  favoriteBtn.textContent = "Favorite";
  deleteBtn.textContent = "Delete";

  card.append(editBtn, favoriteBtn, deleteBtn);
  adressBook.appendChild(card);

  document.querySelectorAll(".delete").forEach((button) => {
    button.addEventListener("click", (e) => {
      deleteArrayObj(contacts, e);
    });
  });

  document.querySelectorAll(".favorite").forEach((button) => {
    button.addEventListener("click", (e) => {
      const indexOfObject = contacts.indexOf(e.target.name);
      favorites.push(contacts[contacts.indexOf(e.target.name)]);
      console.log(favorites);
    });
  });
}

function deleteArrayObj(array, event) {
  const indexOfObj = array.findIndex((element) => {
    return element.phone_number === event.target.name;
  });
  array.splice(indexOfObj, 1);
  localStorage.setItem("contacts", JSON.stringify(array));

  adressBook.removeChild(event.target.parentElement);
}


function checkContent(div) {
  if (div.firstChild) {
    div.innerHTML = null;
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

    if (contacts.length > 0) {
      contacts.forEach((singleContact) => {
        createContact(singleContact);
      });
    }
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
