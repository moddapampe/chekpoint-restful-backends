const url = "https://dummy-apis.netlify.app/api/contact-suggestions?count=";
const counter = document.querySelector(".counter");
let count = localStorage.getItem("count") || 0;

renderCounter();

getPeopleData(8);

function getPeopleData(count) {
    fetch(url + count)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            renderPeopleData(jsonData);
        });
}

function renderPeopleData(peopleData) {
    const list = document.querySelector("#memberList");
    let htmlResult = "";

    peopleData.forEach((person) => {
        htmlResult += `
    <article class="person">
     
     <img class="background" src="${person.backgroundImage}">
     <div class="button-wrapper"><button class="delete-btn"></button> </div>
     <div class="img"><img class="profile-pic" src="${person.picture}"></div>
     <div class="name">${person.name.title}${person.name.first} ${person.name.last}</div>
     <div class="profession" id="profession">${person.title}</div>
     <div class="mutuals">
     <a href=""><img id="bonded" src="bonded.png" alt="n/a"> ${person.mutualConnections} mutual connections</a>
     </div>
     
     <a href=""><button class="connect">Connect</button></a>
       
    </article>`;
    });
    list.innerHTML = htmlResult;

    const btnConnects = document.querySelectorAll(".connect");

    btnConnects.forEach((btnConnect) => {
        btnConnect.addEventListener("click", toggleConnect);
    });

    const xButtons = document.querySelectorAll(".delete-btn");

    xButtons.forEach((xButton, index) => {
        xButton.addEventListener("click", function() {
            deleteMember(peopleData, index);
        });
    });
}

function deleteMember(peopleData, index) {
    const peopleDataDelete = peopleData.filter((person, personIndex) => {
        return index !== personIndex;
    });

    fetch(url + 1)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            peopleDataDelete.push(jsonData[0]);
            renderPeopleData(peopleDataDelete);
        });
}

function toggleConnect() {
    if (this.innerText === "Connect") {
        this.innerText = "Pending";
        count++;
        renderCounter();
        localStorage.setItem("count", count);
    } else if (this.innerText === "Pending") {
        this.innerText = "Connect";
        count--;
        renderCounter();
        localStorage.setItem("count", count);
    }
}

function renderCounter() {
    counter.innerText = count;
}