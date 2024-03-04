// target inputs through ID //
let searchBar = document.getElementById("vehicleInput");
let vehicleType = document.getElementById("vehicleSelector");
let vehicleNumber = document.getElementById("vehicleNumber");
let vehicleSubmission = document.getElementById("vehicleSubmission");
let cardContainer = document.querySelector(".card-container");

let startTime = [];

// create class for parking //
class Parking {
  constructor(vehicleType, vehicleNumber, capacity = 100, availability = true) {
    this.vehicleType = vehicleType;
    this.vehicleNumber = vehicleNumber;
    this.capacity = capacity;
    this.availability = availability;
  }
  displayCard(index) {
    let date = new Date();
    let hour1 = date.getHours();
    let minutes1 = date.getMinutes();
    startTime.push({ hour1, minutes1 });
    let currentDate = date.getDate();
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();
    let card = document.createElement("div");
    card.classList.add('card');
    if (hour1 > 12) {
      card.innerHTML = `
      <div class="card-body">
      <h2>Vehicle No: ${this.vehicleNumber}<h2>
      <h5 class="card-title">Vehicle Type: ${this.vehicleType}</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">Date: ${currentDate}/${currentMonth}/${currentYear}</h6>
      <h6>Time: ${hour1 - 12}:${minutes1} PM</h6>
    </div>
    <div class="remove-card" data-index = "${index}"> 
    <i class="fa-solid fa-trash"></i>
    </div> `;
      cardContainer.append(card);
    }
    else {
      card.innerHTML = `
      <div class="card-body">
      <h2>Vehicle No: ${this.vehicleNumber}<h2>
      <h5 class="card-title">Vehicle Type: ${this.vehicleType}</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">Date: ${currentDate}/${currentMonth}/${currentYear}</h6>
      <h6>Time: ${hour1}:${minutes1} AM</h6>
    </div>
    <div class="remove-card" data-index = "${index}"> 
    <i class="fa-solid fa-trash"></i>
    </div> `;
      cardContainer.append(card);
    }
  }
}
let vehicles = [];
// event when vehicle parked //
vehicleSubmission.addEventListener("click", () => {
  if (vehicleType.value == "Select Vehicle Type" || vehicleNumber.value == "") {
    alert("*all fields are mandatory")
  }
  else {
    let vehicle = new Parking(vehicleType.value, (vehicleNumber.value).toUpperCase());
    vehicles.push(vehicle);
    vehicle.displayCard(vehicles.length - 1);
    vehicleNumber.value = '';
  }
})
// event when vehicle is out of parking //
cardContainer.addEventListener("click", (event, index) => {
  let removeCardElement = event.target.closest(".remove-card")
  if (removeCardElement) {
    const index = removeCardElement.dataset.index;
    let billNo = Math.trunc(Math.random() * 100000);
    let end = new Date();
    let hour2 = end.getHours();
    let minutes2 = end.getMinutes();
    let hours1 = startTime[index].hour1;
    let totalHour = hour2 - hours1;
    let minutess1 = startTime[index].minutes1;
    let totalMinutes = minutes2 - minutess1;
    let totalTime = `${totalHour} hour and ${totalMinutes} minute`;
    removeCardElement.parentElement.remove();
    if (hours1 > 12 && hour2 < 12) {
      alert(`
      Bill Generated:
      Bill No. ${billNo}
      Thanks for Parking Here!
      you parked here at ${hours1 - 12}:${minutess1} PM
      and leave here at ${hour2}:${minutes2} AM
      your total time = ${totalTime}
      and your total Bill is = ₹${((totalHour * 60) + (totalMinutes) / 60) * 20}
      `)
    }
    else if (hours1 < 12 && hour2 > 12) {
      alert(`
      Bill Generated:
      Bill No. ${billNo}
      Thanks for Parking Here!
      you parked here at ${hours1}:${minutess1} AM
      and leave here at ${hour2 - 12}:${minutes2} PM
      your total time = ${totalTime}
      and your total Bill is = ₹${((totalHour * 60) + (totalMinutes) / 60) * 20}
      `)
    }
    else if (hours1 > 12 && hour2 > 12) {
      alert(`
      Bill Generated:
      Bill No. ${billNo}
      Thanks for Parking Here!
      you parked here at ${hours1 - 12}:${minutess1} PM
      and leave here at ${hour2 - 12}:${minutes2} PM
      your total time = ${totalTime}
      and your total Bill is = ₹${((totalHour * 60) + (totalMinutes) / 60) * 20}
      `)
    }
    else if (hours1 < 12 && hour2 < 12) {
      alert(`
      Bill Generated:
      Bill No. ${billNo}
      Thanks for Parking Here!
      you parked here at ${hours1}:${minutess1} AM
      and leave here at ${hour2}:${minutes2} AM
      your total time = ${totalTime}
      and your total Bill is = ₹${((totalHour * 60) + (totalMinutes) / 60) * 20}
      `)
    }
  }
  vehicles.splice(index, 1)
  startTime.splice(index, 1)
})
