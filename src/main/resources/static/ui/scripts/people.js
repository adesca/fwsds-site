const rootUrl = "/api/person";

function getNewPersonDetails() {
    const firstName = document.getElementById('newPersonFirst').value;
    const lastName = document.getElementById('newPersonLast').value;
    const expirationDate = document.getElementById('newPersonMembership').value;

    return {
        firstName: firstName,
        lastName: lastName,
        expirationDate: expirationDate
    }
}

function clearTable() {
    const table = document.querySelector('table')

    let rowCount = document.querySelectorAll('tr').length
    while (rowCount > 2) {
        table.deleteRow(2)
        rowCount = document.querySelectorAll('tr').length
    }

}

function updateListOfPeople() {
    fetch(`${rootUrl}/all`).then(response => response.json())
        .then(body => {
            clearTable()

            body.map((item, index) => {
                var membershipExpiredString = '';

                if (item.membershipExpired === true) {
                    membershipExpiredString = 'yes'
                } else {
                    membershipExpiredString = 'no'
                }

                const tableEl = document.querySelector('table');

                const newRow = tableEl.insertRow(index + 2);
                newRow.insertCell(0).innerText = `${index}`;
                newRow.insertCell(1).innerText = `${item.firstName}`;
                newRow.insertCell(2).innerText = `${item.lastName}`;
                newRow.insertCell(3).innerText = `${item.expirationDate}`;
                newRow.insertCell(4).innerText = `${membershipExpiredString}`
                // const tr = document.createElement('tr')

                // const td1 = document.createElement('td')
                // td1.innerText = `${index}`
                // tr.appendChild()
                // tr.innerHTML = `
                // <td scope="col">${index}</td>
                // <td scope="col">${item.firstName}</td>
                // <td scope="col">${item.lastName}</td>
                // <td scope="col">${item.expirationDate}</td>
                // <td scope="col">${membershipExpiredString}</td>
                //     `;
                return document.createElement('tr')
            }).forEach(newTrElement => {

                document.querySelector('tbody').appendChild(newTrElement)
            })

        })
}

function addNewPerson() {
    const personDetails = getNewPersonDetails();

    fetch(rootUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(personDetails)
    }).then(response => {
        updateListOfPeople()
    })
}
