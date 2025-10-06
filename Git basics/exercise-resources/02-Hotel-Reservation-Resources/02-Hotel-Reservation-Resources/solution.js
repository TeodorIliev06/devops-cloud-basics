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

    //changeContent("guest-details-form-content");
  }

  document
    .querySelector("#guest-details-back-btn")
    .addEventListener("click", (e) => fillRoomForm(e));

  function fillRoomForm(e) {
    e.preventDefault();
    changeContent("search-result-form-content");
  }

  function changeContent(className) {
    document
      .querySelectorAll(".custom-form")
      .forEach((div) => div.classList.add("hidden"));
    if (document.querySelector(`.${className}`) != null) {
      document.querySelector(`.${className}`).classList.remove("hidden");
    }
  }

  document
    .querySelector("#new-reservation")
    .addEventListener("click", (e) => cleanData(e));

  function cleanData(e) {
    changeContent("search-form-content");
  }
});
