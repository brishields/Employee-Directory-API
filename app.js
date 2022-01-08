/************************************************
 ***********   Global Variables   ***************
 ***********************************************/
let employees = [];
const urlAPI = 'https://randomuser.me/api/1.3/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US';
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
let index;

//Fetch Data
fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))

function displayEmployees (employeeData) {
    employees = employeeData;
    let employeeHTML = '';

    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
        let state = employee.location.state;

        employeeHTML += `
        <div class="card" data-index="${index}">
        <img class="avatar" src="${picture.large}"/>
        <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}, ${state}</p>
        </div>
        </div>
        `
    });
    gridContainer.innerHTML = employeeHTML;
}



gridContainer.addEventListener('click', e => {
    // make sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) {
    // select the card element based on its proximity to actual element clicked
    const card = e.target.closest(".card");
    index = card.getAttribute('data-index');
    displayModal(index);
    }
    });

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
    });

 function displayModal (index) {
    let { name, dob, phone, email, location: { city, street, state, postcode}, picture } = employees[index];
    
    let date = new Date(dob.date);
    // Removes extra dash from the beginning of the phone number for proper formatting.
    let formattedPhone = phone.replace('-',' ');

    const modalHTML = `
    <img class="avatar" src="${picture.large}"/>
    <div class="text-container">
    <h2 class="name">${name.first} ${name.last}</h2>
    <p class="email">${email}</p>
    <p class="address">${city}, ${state}</p>
    <hr />
    <p class="phone">${formattedPhone}</p>
    <p class="address">${street.number} ${street.name}, ${city}, ${state}, ${postcode}</p>
    <p class="birthday">Birthday:
    ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;

    console.log(`${formattedPhone}`);
    }       
        