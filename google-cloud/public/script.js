const api = "https://europe-central2-theta-totem-313112.cloudfunctions.net";

const tasksTable = document.getElementById("tasksTable");

const xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        const elements = JSON.parse(this.responseText);
        for (let i = 0; i < elements.length; i++) {
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            td1.setAttribute("data-label", "Id");
            td1.innerText = elements[i].id;
            const td2 = document.createElement("td");
            td2.setAttribute("data-label", "Name");
            td2.innerText = elements[i].name;
            const td3 = document.createElement("td");
            td3.setAttribute("data-label", "Team");
            td3.innerText = elements[i].team;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tasksTable.appendChild(tr);
        }
    }
});
xhr.open("GET", `${api}/getTasks`);
xhr.send();
xhr.corsEnabledFunction = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else {
        res.send('Cookie Organizer');
    }
};


const addTask = document.getElementById("addTask");
addTask.addEventListener("click", function () {
    Swal.fire({
        html: '<span>Name</span>' +
            '<input id="swal-input1" class="swal2-input">' +
            '<span>Team</span>' +
            '<input id="swal-input2" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
            return [
                addInput(
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value,
                )
            ]
        }
    })
});
function addInput(name, team) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            window.location.reload(true);
        }
    });
    xhr.open("POST", `${api}/addTask?name=${name}&team=${team}`);
    xhr.send();
    xhr.corsEnabledFunction = (req, res) => {
        res.set('Access-Control-Allow-Origin', '*');

        if (req.method === 'OPTIONS') {
            res.set('Access-Control-Allow-Methods', 'GET');
            res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.set('Access-Control-Max-Age', '3600');
            res.status(204).send('');
        } else {
            res.send('Cookie Organizer');
        }
    };
}