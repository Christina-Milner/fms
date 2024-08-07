// Hack to highlight which category is being filtered by on the Filters page

const filterButtons = document.querySelectorAll('.filterbutton')

document.addEventListener('DOMContentLoaded', function() {
    filterButtons.forEach(e => {
        if (window.location.href.includes(e.id)) {
            e.classList.add('active')
        }
    }) 
 }, false); 
         
// Other buttons

const addButton = document.querySelector('#addButton')
const editButton = document.querySelector('#editEntries')

if (addButton) {addButton.addEventListener('click', openAddForm)}
if (editButton) {editButton.addEventListener('click', editEntries)}

// Highlight edit button when entries are clickable
if (editButton) {editButton.addEventListener('click', () => editButton.classList.add('active'))}


// Function that retrieves the next ID number when "add entry" is clicked and populates the form with it

async function openAddForm() {
    document.querySelectorAll('.entry').forEach(e => e.removeEventListener('click', event => editThis(event.target.parentElement)))
    editButton.classList.remove('active')
    document.querySelector('.buttonsGoHere').classList.add('hidden')
    const res = await fetch('/postEntry', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    let id = await res.text()
    id = Number(id)

    document.querySelector('#forID').innerText = `Number: ${id}`
    document.querySelector('#inputForm').classList.remove('hidden')
    document.querySelector('#secretIdBox').value = id
}

// Function for making entries editable in Registration view

function editEntries() {
    document.querySelectorAll('.entry').forEach(e => e.addEventListener('click', event => {
        let target = event.target.classList.contains('entry') ? event.target : event.target.parentElement.classList.contains('entry') ? event.target.parentElement : event.target.parentElement.parentElement
        editThis(target)
    }))
}
 

// Function for editing an entry on the Registration page

async function editThis(element) {
    editButton.classList.remove('active')
    document.querySelector('.buttonsGoHere').classList.add('hidden')
    const entryID = element.id
    const data = await fetch(`ID_${entryID}`, {
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    })
    let json = await data.json()
    console.log(json)
    document.querySelector('#inputForm').classList.remove('hidden')
    document.querySelectorAll('.entry').forEach(e => e.classList.add('hidden'))
    document.querySelector('#forID').innerText = `Number: ${json.id}`
    document.querySelector('#secretIdBox').value = json.id
    document.querySelector('#name').value = json.fullName
    document.querySelector('#numOfModels').value = json.numOfModels
    if (!json.competition ) {
        document.querySelector('#outOfComp').checked = true
        document.querySelector('#junior').checked = false
        document.querySelector('#standard').checked = false
        document.querySelector('#masters').checked = false
    } else if (json.competition === 1) {
        document.querySelector('#outOfComp').checked = false
        document.querySelector('#junior').checked = true
        document.querySelector('#standard').checked = false
        document.querySelector('#masters').checked = false
    } else if (json.competition === 2) {
        document.querySelector('#outOfComp').checked = false
        document.querySelector('#junior').checked = false
        document.querySelector('#standard').checked = true
        document.querySelector('#masters').checked = false
    } else {
        document.querySelector('#outOfComp').checked = false
        document.querySelector('#junior').checked = false
        document.querySelector('#standard').checked = false
        document.querySelector('#masters').checked = true
    }
}
