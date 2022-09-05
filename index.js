const addForm = document.querySelector("#addContact");
const addBtn = document.querySelector(".addBtn");
const adressBook = document.querySelector("#adressBook");

const contacts = [];

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

    if (adressBook.firstChild) {
      adressBook.innerHTML = null;
    }

    if (contacts.length > 0) {
      contacts.forEach((singleContact) => {
        const contactArr = Object.entries(singleContact);
        const card = document.createElement("div");
        const editBtn = document.createElement("button");
        const favoriteBtn = document.createElement("button");

        card.textContent = `${contactArr[0][1]} : ${contactArr[1][1]}`;
        editBtn.textContent = "Edit";
        favoriteBtn.textContent = "Favorite";

        adressBook.appendChild(card);
        adressBook.appendChild(editBtn);
        adressBook.appendChild(favoriteBtn);
      });
    }
  }

  console.log(contacts);
});
