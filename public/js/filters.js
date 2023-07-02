// Get rid of any headers that don't actually have entries below them
// Separate JS file because I don't want this messing with other pages


document.addEventListener('DOMContentLoaded', function() {
    const hThree = document.querySelectorAll('h3')
    const hTwo = document.querySelectorAll('h2')
    hThree.forEach(e => {
        if (!e.nextElementSibling.children.length) {
            e.classList.add('hidden')
        }
    })
    hTwo.forEach(e => {
        if (!window.location.href.includes("none") && !e.nextElementSibling.children.length) {
            e.classList.add('hidden')
        }
        if (window.location.href.includes("junBestOfShow") && e.innerText === "Adults") {
            e.classList.add('hidden')
        }
        else if (window.location.href.includes("bestOfShow") && e.innerText === "Juniors") {
            e.classList.add('hidden')
        }
    })
 }, false);
