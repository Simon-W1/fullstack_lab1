const registerUser = document.querySelector("#registerUser")
const registerName = document.querySelector("#registerName")
const registerAge = document.querySelector("#registerAge")
const registerError = document.querySelector("#registerError")
const users = []
const table = document.querySelector("#table")
const userId = document.querySelector("#userId")
const updateName = document.querySelector("#updateName")
const updateAge = document.querySelector("#updateAge")
const updateError = document.querySelector("#updateError")

registerUser.addEventListener("submit", e => {
    e.preventDefault()
    const registerDetails = {
        name: registerName.value,
        age: registerAge.value
    }
    fetch("api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(registerDetails)
    })
    location.reload()
})

window.onload = function initialize() {
    fetch("api/users", {
        method: "GET",
    })
    .then(res => res.json())
    .then(response => {
        console.log(JSON.stringify(response))
        for (var i = 0; i < response.length; i++) {
            var user = response[i]
            var row = table.insertRow(-1)
            var cell1 = row.insertCell(0)
            var cell2 = row.insertCell(1)
            var cell3 = row.insertCell(2)
            var cell4 = row.insertCell(3)
            var cell5 = row.insertCell(4)
            cell1.innerHTML = user.name
            cell2.innerHTML = user.age
            var btn1 = document.createElement("input")
            btn1.type = "button"
            btn1.value = "Show details"
            btn1.id = "btn" + i + "1"
            cell3.appendChild(btn1)
            var btn2 = document.createElement("input")
            btn2.type = "button"
            btn2.value = "Update"
            btn2.id = "btn" + i + "2"
            cell4.appendChild(btn2)
            var btn3 = document.createElement("input")
            btn3.type = "button"
            btn3.value = "Delete"
            btn3.id = "btn" + i + "3"
            cell5.appendChild(btn3)
        }
    })
}

table.addEventListener("click", (e) => {
    var element = e.target
    if (element.type == "button") {
        var rowNr = element.id.charAt(3)
        var action = element.id.charAt(4)
        fetch("api/users", {
            method: "GET"
        })
        .then(res => res.json())
        .then(response => {
            var id = response[rowNr]._id
            if (action == 1) {
                //Show details
                userId.innerHTML = "User id: " + id
            } else if (action == 2) {
                //Update
                const updateDetails = {
                    name: updateName.value,
                    age: updateAge.value
                }
                fetch("api/users/" + id, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updateDetails)
                })
                .then(response => {
                    if (!response.ok) {
                        updateError.innerHTML = "Both fields must be filled to update a user."
                    } else {
                        location.reload()
                    }
                })
            } else if (action == 3) {
                //Delete
                fetch("api/users/" + id, {
                    method: "DELETE"
                })
                location.reload()
            } else {
                //Error
                console.log("action error")
            }
        })
    }
})