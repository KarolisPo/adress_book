const addForm = document.querySelector("#addContact");
const adressBook = document.querySelector("#adressBook");

let contacts = [];

function createContact(object) {
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

  adressBook.append(card, editBtn, favoriteBtn, deleteBtn);

  document.querySelectorAll(".delete").forEach((button) => {
    button.addEventListener("click", (e) => {
      deleteArrayObj(contacts, e);
    });
  });

}

function deleteArrayObj(array, event) {
  let contactObj = JSON.parse(localStorage.getItem("contacts"));
  array.forEach((obj) => {
    if (obj.phone_number === event.target.name) {
      array.splice(array.indexOf(obj), 1);
      contactObj.splice(contactObj.indexOf(obj), 1);
      localStorage.setItem("contacts", JSON.stringify(contactObj));
    }
  });
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



