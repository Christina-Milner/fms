// Make all entries click to edit on DOM load

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.entry').forEach(e => e.addEventListener('click', event => {
        let target = event.target.classList.contains('entry') ? event.target : event.target.parentElement.classList.contains('entry') ? event.target.parentElement : event.target.parentElement.parentElement
        window.location.href.includes("Other") ? editThisOther(target) : editThis(target)
    }))
 }, false);

// This opens the editing form and populates it with the database info for the relevant entry

 async function editThis(element) {
    document.querySelector('#warning').classList.add('hidden')
    const entryID = element.id
    const data = await fetch(`ID_${entryID}`, {
        method: 'get', 
        headers: {'Content-Type': 'application/json'},
    })   
    let json = await data.json() 
    document.querySelector('#inputForm').classList.remove('hidden')
    document.querySelectorAll('.entry').forEach(e => e.classList.add('hidden'))
    document.querySelector('#prizes').classList.remove('hidden')
    document.querySelector('#forID').innerText = `Number: ${json.id}`
    document.querySelector('#secretIdBox').value = json.id
    document.querySelector('#name').innerText = json.fullName
    const comp = {0: "Out of competition", 1: "Junior", 2: "Figures Standard", 3: "Figures Masters", 4: "Vehicles Standard", 5: "Vehicles Masters"}
    // console.log(json.competition)
    // console.log(comp[json.competition])
    document.querySelector('#competition').innerText = comp[json.competition]
    if (!json.competition) { 
        document.querySelector('#isJudged').classList.add('hidden')
        document.querySelector('#forMedals').classList.add('hidden')
        document.querySelector('#bestOfShowStuff').classList.add('hidden')
    } 
    else {
        document.querySelector('#isJudged').classList.remove('hidden')
        document.querySelector('#forMedals').classList.remove('hidden')
        document.querySelector('#bestOfShowStuff').classList.remove('hidden')
    }
    if (!json.judged) {
        document.querySelector('#firstPass').checked = false
        document.querySelector('#yesJudged').checked = false
        document.querySelector('#notJudged').checked = true
    } else if (json.judged == 1) {
        document.querySelector('#firstPass').checked = true
        document.querySelector('#yesJudged').checked = false
        document.querySelector('#notJudged').checked = false
    } else {
        document.querySelector('#firstPass').checked = false
        document.querySelector('#yesJudged').checked = true
        document.querySelector('#notJudged').checked = false
    }

    if (json.prizes && json.prizes.medal) {
        let medal = json.prizes.medal
        if (medal == "bronze") {
            document.querySelector('#bronze').checked = true
            document.querySelector('#silver').checked = false
            document.querySelector('#gold').checked = false 
            document.querySelector('#commended').checked = false
        } else if (medal == "silver") { 
            document.querySelector('#silver').checked = true
            document.querySelector('#bronze').checked = false
            document.querySelector('#gold').checked = false
            document.querySelector('#commended').checked = false
        } else if (medal == "gold") {
            document.querySelector('#gold').checked = true
            document.querySelector('#silver').checked = false
            document.querySelector('#bronze').checked = false
            document.querySelector('#commended').checked = false
        }
        else {
            document.querySelector('#gold').checked = false
            document.querySelector('#silver').checked = false
            document.querySelector('#bronze').checked = false
            document.querySelector('#commended').checked = true
        }
    }
    [document.querySelector('#standardBestOfShow'), document.querySelector('#mastersBestOfShow'), document.querySelector('#junBestOfShow')].forEach(e => {
        if (e && json.prizes && json.prizes[e.id]) {
            e.checked = true
        } else if (e) {
            e.checked = false
        }
    })

    if (json.competition == 1) {
        document.querySelectorAll('.adultsOnly').forEach(e => e.classList.add('hidden'))
        document.querySelectorAll('.kidsOnly').forEach(e => e.classList.remove('hidden'))
    } else {
        document.querySelectorAll('.kidsOnly').forEach(e => e.classList.add('hidden'))
        document.querySelectorAll('.adultsOnly').forEach(e => e.classList.remove('hidden'))
    }
}


async function editThisOther(element) {
    document.querySelector('#warning').classList.add('hidden')
    const entryID = element.id
    const data = await fetch(`ID_${entryID}`, {
        method: 'get', 
        headers: {'Content-Type': 'application/json'},
    })   
    let json = await data.json() 
    document.querySelector('#inputForm').classList.remove('hidden')
    document.querySelectorAll('.entry').forEach(e => e.classList.add('hidden'))
    document.querySelector('#prizes').classList.remove('hidden')
    document.querySelector('#forID').innerText = `Number: ${json.id}`
    document.querySelector('#secretIdBox').value = json.id
    document.querySelector('#name').innerText = json.fullName
    const comp = {0: "Out of competition", 1: "Junior", 2: "Figures Standard", 3: "Figures Masters", 4: "Vehicles Standard", 5: "Vehicles Masters"}
    document.querySelector('#competition').innerText = comp[json.competition]; // DO NOT REMOVE THIS SEMICOLON

    [document.querySelector('#corrr'), document.querySelector('#peoplesChoice')].forEach(e => {
        if (e && json.prizes && json.prizes[e.id]) {
            e.checked = true
        } else if (e) {
            e.checked = false
        }
    }) 
    if (document.querySelector('#sponsors') && json.prizes && json.prizes.sponsors.length) {
        document.querySelector('#sponsors').value = json.prizes.sponsors.join(', ')
    } else if (document.querySelector('#sponsors') ) {  // This JS file is now used by 3 separate partials, some of which no longer have these items
        document.querySelector('#sponsors').value = ""
    }
}

// To make medals checkboxes where only one can be selected (as radio doesn't allow for unselecting)

function onlyOne(checkbox) {
    const checkboxes = document.getElementsByName('medals')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}

// To ensure People's Choice, Best of Show and Junior Best of Show can only be awarded once

async function checkIfTaken(checkbox, prize) {
    document.querySelector('#warning').classList.remove('info')
    let taken = await fetch(`checkFor_${prize}`)
    taken = await taken.json()
    let prettyfied = {junBestOfShow: "Junior Best of Show", standardBestOfShow: "Standard Best of Show", mastersBestOfShow: "Masters Best of Show", peoplesChoice: "People's Choice"}
    if (taken.length && taken[0].id !== Number(document.querySelector('#secretIdBox').value)) {
        checkbox.checked = false
        document.querySelector('#warning').innerHTML = `${prettyfied[prize]} has already been assigned to Number ${taken[0].id}, ${taken[0].fullName}!`
        document.querySelector(`[id="${taken[0].id}"]`).classList.remove('hidden')
        document.querySelectorAll('.entry').forEach(e => {
            if (e.id !== String(taken[0].id)) {
                e.classList.add('hidden') // Make the irrelevant one go away if switching between prizes that are already taken
            }
        })
        document.querySelector('#warning').classList.remove('hidden')
    }
}

// To allow the judges to keep track of how many CORRRs they have given out

async function checkCORRR(checkbox) {
    if (checkbox.checked) {
        document.querySelector('#warning').classList.remove('info')
        let CORRR = await fetch(`checkFor_corrr`)
        CORRR = await CORRR.json()
        document.querySelector('#warning').innerHTML = `CORRR is ${CORRR.length >= 6 ? "already" : "currently"} assigned to ${CORRR.length} ${CORRR.length === 1 ? "contestant" : "contestants"}${CORRR.length >= 6? "!" : "."}`
        document.querySelectorAll('.entry').forEach(e => {
                if (!(CORRR.map(f => f.id).includes(Number(e)))) {
                    e.classList.add('hidden')
                }
            })
        if (CORRR.length) {
            CORRR.forEach(el => {
                document.querySelector(`[id="${el.id}"]`).classList.remove('hidden')
            })
            
        }
        if (CORRR.length < 6) {
            document.querySelector('#warning').classList.add('info')
        }
        document.querySelector('#warning').classList.remove('hidden')
    } else {
        document.querySelector('#warning').classList.add('hidden')
    }
}