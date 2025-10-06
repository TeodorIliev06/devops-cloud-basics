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

  function findRoom(e) {
    e.preventDefault();

    const roomInfo = document.querySelector(".selected-room h4").textContent;
    reservation.roomType = roomInfo;
  }

  /*
document.querySelector('#guest-details-back-btn').addEventListener('click', (e) => fillRoomForm(e));

function fillRoomForm(e) {
    e.preventDefault();
    changeContent('search-result-form-content');
}

document.querySelector('#guest-details-next-btn').addEventListener('click', (e) => getPersonalData(e));

function getPersonalData(e) {
    e.preventDefault();
    const data = e.target.parentElement.parentElement;

    const name = data.querySelector('#name').value;
    const phone = data.querySelector('#phone-number').value;
    const email = data.querySelector('#email').value;

    if (name != '' && phone != '' && email != '') {
        reservation.name = name;
        reservation.phone = phone;
        reservation.email = email;
        console.log(reservation);
        changeContent('confirm-reservation-content');
        fillConfirmReservationData(reservation);
    }
}

function fillConfirmReservationData(customReservation) {
    document.querySelector('.confirm-reservation #guest-name').textContent = `Name: ${customReservation.name}`;
    document.querySelector('.confirm-reservation #guest-phone').textContent = `Phone Number: ${customReservation.phone}`;
    document.querySelector('.confirm-reservation #guest-email').textContent = `Email: ${customReservation.email}`;
    document.querySelector('.confirm-reservation #guest-room-type').textContent = `Room Type: ${customReservation.roomType}`;
    document.querySelector('.confirm-reservation #guest-data-in').textContent = `Date-in: ${customReservation.startDate}`;
    document.querySelector('.confirm-reservation #guest-data-out').textContent = `Date-out: ${customReservation.endDate}`;
}
*/
});

function changeContent(className) {
  document
    .querySelectorAll(".custom-form")
    .forEach((div) => div.classList.add("hidden"));
  if (document.querySelector(`.${className}`) != null) {
    document.querySelector(`.${className}`).classList.remove("hidden");
  }
}

function cleanData(e) {
  changeContent("search-form-content");
}

function selectRoomType(e) {
  e.preventDefault();

  let myTarget = undefined;
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

function fillSearchForm(e) {
  e.preventDefault();
  changeContent("search-form-content");
  document.querySelector("#check-in").value = reservation.startDate;
  document.querySelector("#check-out").value = reservation.endDate;
  document.querySelector("#people").value = reservation.guestsCount;
}

function searchFormData(e) {
  e.preventDefault();

  const checkIn = document.getElementById("check-in").value;
  const checkOut = document.getElementById("check-out").value;
  const numberOfPeople = document.getElementById("people").value;

  if (
    checkIn != "" &&
    checkOut != "" &&
    numberOfPeople != "" &&
    new Date(checkIn) <= new Date(checkOut)
  ) {
    reservation.startDate = checkIn;
    reservation.endDate = checkOut;
    reservation.guestsCount = numberOfPeople;

    changeContent("our-offers-content");
  }
}
