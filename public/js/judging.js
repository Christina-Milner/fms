// Make all entries click to edit on DOM load

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.entry').forEach(e => e.addEventListener('click', event => {
        let target = event.target.classList.contains('entry') ? event.target : event.target.parentElement.classList.contains('entry') ? event.target.parentElement : event.target.parentElement.parentElement
        editThis(target)
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
    document.querySelector('#numOfModels').innerText = json.numOfModels
    document.querySelector('#inComp').innerText = json.inCompetition ? "In competition" : "Not in competition"
    document.querySelector('#age').innerText = json.junior ? "Junior" : "Adult"
    document.querySelector('#age').classList.add(json.junior ? "junior" : "adult")
    if (json.judged == "N/A") {
        document.querySelector('#isJudged').classList.add('hidden')
        document.querySelector('#notForJudging').checked = true
        document.querySelector('#forMedals').classList.add('hidden')
        document.querySelector('#bestOfShow').classList.add('hidden')
        document.querySelector('#forBestOfShow').classList.add('hidden')
        document.querySelector('#junBestOfShow').classList.add('hidden')
        document.querySelector('#forJunBestOfShow').classList.add('hidden')
    }
    else if (json.judged) {
        document.querySelector('#isJudged').classList.remove('hidden')       // Oh my God so many bugs caused by the ability to click from one entry to another
        document.querySelector('#forMedals').classList.remove('hidden')
        document.querySelector('#bestOfShow').classList.remove('hidden')
        document.querySelector('#forBestOfShow').classList.remove('hidden')
        document.querySelector('#junBestOfShow').classList.remove('hidden')
        document.querySelector('#forJunBestOfShow').classList.remove('hidden')
        document.querySelector('#yesJudged').checked = true
        document.querySelector('#notJudged').checked = false
    } else if (!json.judged) {
        document.querySelector('#isJudged').classList.remove('hidden')       
        document.querySelector('#forMedals').classList.remove('hidden')
        document.querySelector('#bestOfShow').classList.remove('hidden')
        document.querySelector('#forBestOfShow').classList.remove('hidden')
        document.querySelector('#junBestOfShow').classList.remove('hidden')
        document.querySelector('#forJunBestOfShow').classList.remove('hidden')
        document.querySelector('#yesJudged').checked = false
        document.querySelector('#notJudged').checked = true
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
    [document.querySelector('#bestOfShow'), document.querySelector('#junBestOfShow'), document.querySelector('#corrr'), document.querySelector('#peoplesChoice')].forEach(e => {
        if (json.prizes && json.prizes[e.id]) {
            e.checked = true
        } else {
            e.checked = false
        }
    })
    if (json.prizes && json.prizes.sponsors.length) {
        document.querySelector('#sponsors').value = json.prizes.sponsors.join(', ')
    } else {
        document.querySelector('#sponsors').value = ""
    }
    if (json.junior) {
        document.querySelectorAll('.adultsOnly').forEach(e => e.classList.add('hidden'))
        document.querySelectorAll('.kidsOnly').forEach(e => e.classList.remove('hidden'))
    } else {
        document.querySelectorAll('.kidsOnly').forEach(e => e.classList.add('hidden'))
        document.querySelectorAll('.adultsOnly').forEach(e => e.classList.remove('hidden'))
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
    console.log(taken)
    let prettyfied = {junBestOfShow: "Junior Best of Show", bestOfShow: "Best of Show", peoplesChoice: "People's Choice"}
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
        else {checkbox.checked = false}
        document.querySelector('#warning').classList.remove('hidden')
    } else {
        document.querySelector('#warning').classList.add('hidden')
    }
}