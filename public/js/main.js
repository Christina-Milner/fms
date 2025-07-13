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


// Hide edit buttons and make other entries non-clickable when the form to add an entry is opened

async function openAddForm() {
    document.querySelectorAll('.entry').forEach(e => e.removeEventListener('click', event => editThis(event.target.parentElement)))
    editButton.classList.remove('active')
    document.querySelectorAll('.buttonsGoHere').forEach(e => e.classList.add('hidden'))
    const painterInfo = document.querySelector('#painterIdInfo')
    if (painterInfo) { 
        painterInfo.classList.add('hidden')
    }
    const form = document.querySelector('#inputForm')
    form.classList.remove('hidden')

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
    document.querySelectorAll('.buttonsGoHere').forEach(e => e.classList.add('hidden'))
    const painterInfo = document.querySelector('#painterIdInfo')
    if (painterInfo) { 
        painterInfo.classList.add('hidden')
    }
    const entryID = element.id
    const data = await fetch(`ID_${entryID}`, {
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    })
    let json = await data.json()
    //console.log(json)
    document.querySelector('#inputForm').classList.remove('hidden')
    document.querySelectorAll('.entry').forEach(e => e.classList.add('hidden'))
    document.querySelector('#name').value = json.fullName
    document.querySelector('#numOfModels').value = json.numOfModels
    document.querySelector('#secretIdBox').value = element.id
    const [ooc, junior, standardFig, standardVroom, mastersFig, mastersVroom] = [document.querySelector('#outOfComp'), document.querySelector('#junior'),
         document.querySelector('#standardFig'), document.querySelector('#standardVroom'), document.querySelector('#mastersFig'), , document.querySelector('#mastersVroom')]
    if (!json.competition ) {
        ooc.checked = true
        for (let thing of [junior, standardFig, standardVroom, mastersFig, mastersVroom]) {
            thing.checked = false
        }
    } else if (json.competition === 1) {
        junior.checked = true
        for (let thing of [ooc, standardFig, standardVroom, mastersFig, mastersVroom]) {
            thing.checked = false
        }
    } else if (json.competition === 2) {
        standardFig.checked = true
        for (let thing of [junior, ooc, standardVroom, mastersFig, mastersVroom]) {
            thing.checked = false
        }
     } else if (json.competition === 3) {
        mastersFig.checked = true
        for (let thing of [junior, ooc, standardVroom, standardFig, mastersVroom]) {
            thing.checked = false
        }
    }  else if (json.competition === 4) {
        standardVroom.checked = true
        for (let thing of [junior, ooc, standardFig, mastersFig, mastersVroom]) {
            thing.checked = false
        }
    }  else if (json.competition === 5) {
        mastersVroom.checked = true
        for (let thing of [junior, ooc, standardVroom, mastersFig, standardFig]) {
            thing.checked = false
        }
    } else {
        document.querySelector('#outOfComp').checked = false
        document.querySelector('#junior').checked = false
        document.querySelector('#standard').checked = false
        document.querySelector('#masters').checked = true
    }
}

// Search box

const box = document.querySelector('#searchBox')
box.addEventListener('input', runSearch)

function runSearch(e) {
    let entries = document.querySelectorAll('.entry')
    const input = box.value.toLowerCase()
    if (!box.value) {
        entries.forEach(entry => entry.classList.remove('hidden'))
    }
    else if (entries.length) {
        for (let entry of entries) {
            if (!entry.childNodes[3].innerText.toLowerCase().includes(input)) {
                entry.classList.add('hidden')
            } else {
                entry.classList.remove('hidden')
            }
        }
    }
}
  