let reservation = {
  startDate: null,
  endDate: null,
  guestsCount: 0,
  roomType: null,
  name: null,
  phone: null,
  email: null,
};

document.addEventListener("DOMContentLoaded", () => {
  changeContent("search-form-content");

  document.getElementById("search-form-btn").addEventListener("click", (e) => {
    searchFormData(e);
  });

  document
    .querySelector("#new-reservation")
    .addEventListener("click", (e) => cleanData(e));

  document
    .querySelector("#search-back-btn")
    .addEventListener("click", (e) => fillSearchForm(e));

  document.querySelectorAll(".room-type").forEach((room) => {
    room.addEventListener("click", (e) => selectRoomType(e));
  });

  document
    .querySelector("#search-next-btn")
    .addEventListener("click", (e) => findRoom(e));

  document
    .querySelector("#guest-details-back-btn")
    .addEventListener("click", (e) => fillRoomForm(e));

  document
    .querySelector("#guest-details-next-btn")
    .addEventListener("click", (e) => getPersonalData(e));

  document
    .querySelector("#confirm-back-btn")
    .addEventListener("click", (e) => getBackToPersonalData(e));

  document
    .querySelector("#confirm-reservation")
    .addEventListener("click", (e) => showThanksPage(e));

  document
    .querySelector("#new-reservation")
    .addEventListener("click", (e) => cleanData(e));
});

function cleanData(e) {
  changeContent("search-form-content");
}

function changeContent(className) {
  document
    .querySelectorAll(".custom-form")
    .forEach((div) => div.classList.add("hidden"));
  if (document.querySelector(`.${className}`) != null) {
    document.querySelector(`.${className}`).classList.remove("hidden");
  }
}

function searchFormData(e) {
  e.preventDefault();

  const data = e.target.parentElement;
  const checkIn = data.querySelector("#check-in").value;
  const checkOut = data.querySelector("#check-out").value;
  const people = data.querySelector("#people").value;

  if (
    checkIn != "" &&
    checkOut != "" &&
    people != "" &&
    new Date(checkIn) <= new Date(checkOut)
  ) {
    reservation.startDate = checkIn;
    reservation.endDate = checkOut;
    reservation.guestsCount = people;

    changeContent("our-offers-content");
  }
}

function fillSearchForm(e) {
  e.preventDefault();

  changeContent("search-form-content");

  document.querySelector("#check-in").value = reservation.startDate;
  document.querySelector("#check-out").value = reservation.endDate;
  document.querySelector("#people").value = reservation.guestsCount;
}

function fillRoomForm(e) {
  e.preventDefault();
  changeContent("our-offers-content");
}

function selectRoomType(e) {
  let myTarget = undefined;
  e.preventDefault;
  if (e.target.querySelector("img") != null) {
    myTarget = e.target;
  } else {
    myTarget = e.target.parentElement;
  }
  document
    .querySelectorAll(".room-type")
    .forEach((room) => room.classList.remove("selected-room"));
  myTarget.classList.add("selected-room");
}

function findRoom(e) {
  e.preventDefault();

  const roomInfo = document.querySelector(".selected-room h4").textContent;
  reservation.roomType = roomInfo;

  changeContent("guest-details-form-content");
}

function getPersonalData(e) {
  e.preventDefault();

  const data = e.target.parentElement.parentElement;

  const name = data.querySelector("#name").value;
  const phoneNumber = data.querySelector("#phone-number").value;
  const email = data.querySelector("#email").value;

  if (name != "" && phoneNumber != "" && email != "") {
    reservation.name = name;
    reservation.phone = phoneNumber;
    reservation.email = email;

    changeContent("confirm-reservation-content");
    fillConfirmReservationData(reservation);
  }
}

function fillConfirmReservationData(reservationData) {
  document.getElementById("guest-name").textContent =
    `Name ${reservationData.name}` || "N/A";
  document.getElementById("guest-phone-number").textContent =
    `Phone Number ${reservationData.phone}` || "N/A";
  document.getElementById("guest-email").textContent =
    `Email ${reservationData.email}` || "N/A";
  document.getElementById("guest-room-type").textContent =
    `Room Type ${reservationData.roomType}` || "N/A";
  document.getElementById("guest-check-in-date").textContent =
    `Date-in ${reservationData.startDate}` || "N/A";
  document.getElementById("guest-check-out-date").textContent =
    `Date-out ${reservationData.endDate}` || "N/A";
}

function getBackToPersonalData(e) {
  e.preventDefault();

  changeContent("guest-details-form-content");
}

function showThanksPage(e) {
  e.preventDefault();

  changeContent("thank-you-content");
}
