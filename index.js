const addForm = document.querySelector("#addForm");
const addBtn = document.querySelector(".addBtn");
const adressBook = document.querySelector("#adressBook");

const contacts = [];

addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const contactName = document.querySelector("#name");
  const phoneNum = document.querySelector("#phoneNum");

  if (contactName.value && phoneNum.value) {
    person = {};
    person[contactName.name] = contactName.value;
    person[phoneNum.name] = phoneNum.value;
    contacts.push(person);
  }

  console.log(contacts);

  localStorage.setItem("contacts", JSON.stringify(contacts));

  if (adressBook.firstChild) {
    adressBook.innerHTML = null;
  }
});

if (contacts.length > 0) {
}
