let flag = document.getElementById("flag")
let data
let countryId = ""
let countryIndex = -1
let bankSize = 10
let streak = {}
let targetCountrysNumber
let completedCountries = 0

function changeFlag() {
    if (completedCountries == targetCountrysNumber) {
        document.getElementById("endScreen").style.display = "flex"
        document.getElementById("settings").style.display = "none"
        document.getElementById("restartButton").style.display = "none"
        return
    }
    countryIndex += Math.floor(Math.random() * (bankSize - 1))
    if (shuffledList.length < bankSize) {
        countryIndex = countryIndex % shuffledList.length
    } else {
        countryIndex = countryIndex % bankSize + 1
    }
    countryId = shuffledList[countryIndex]
    flag.src = "https://flagcdn.com/" + countryId.toLowerCase() + ".svg"
}

let countryList = []
function createCountryList() {
    countryList = []
    for (let i = 0; i < Object.keys(codes).length; i++) {
        console.log()
        if (settings.regions[codes[Object.keys(codes)[i]].region.toLowerCase().replace(/\s/g, '')]) {
            if (duplicateFlags.includes(Object.keys(codes)[i]) && settings.duplicateFlags) {
                continue
            }
            countryList.push(Object.keys(codes)[i])
        }
    }
}

let duplicateFlags = ["BV", "HM", "MF", "SJ", "UM"]


let shuffledList
function createShuffledList() {
    shuffledList = countryList
    for (let i = shuffledList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffledList[i];
        shuffledList[i] = shuffledList[j];
        shuffledList[j] = temp;
    }
    targetCountrysNumber = shuffledList.length
}

async function main() {
    createCountryList()
    createShuffledList()
    changeFlag()
    updateCompletion()
}

let activeSuggetion = 0
let activeSuggestionValue = ""
let suggestionsLength = 0
document.getElementById("guessField").addEventListener("input", function (e) {
    activeSuggetion = 0
    updateSuggestion()
})

let input = document.getElementById("guessField")

function updateSuggestion() {
    const suggetions = document.getElementById("suggestions")
    suggetions.innerHTML = ""
    input = document.getElementById("guessField")
    let index = 0
    if (input.value.length > 0) {
        for (let i = 0; i < Object.keys(codes).length; i++) {
            if (removeAccents(codes[Object.keys(codes)[i]].name.substr(0, input.value.length).toLowerCase()) == removeAccents(input.value.toLowerCase())) {
                const element = document.createElement("div")
                element.innerHTML = codes[Object.keys(codes)[i]].name
                element.onclick = function () {
                    input.value = (this.innerHTML)
                    const suggetions = document.getElementById("suggestions")
                    suggetions.innerHTML = ""
                    input.focus()
                    checkGuess()
                };
                if (index == activeSuggetion) {
                    element.classList.add("activeSuggestion")
                    activeSuggestionValue = codes[Object.keys(codes)[i]].name
                }
                element.classList.add("suggestion")
                element.classList.add("reverse")
                suggetions.append(element)
                index++
            }
        }
        suggestionsLength = index
        if (suggestionsLength > 0) {
            document.getElementById("guessField").style.borderRadius = "10px 10px 0px 0px"
        } else {

            document.getElementById("guessField").style.borderRadius = "10px"
        }
    } else {
        document.getElementById("guessField").style.borderRadius = "10px"
    }
}

//Code from https://gist.github.com/marcelo-ribeiro/abd651b889e4a20e0bab558a05d38d77

const accentsMap = new Map([
    ["A", "Á|À|Ã|Â|Å"],
    ["a", "á|à|ã|â|å"],
    ["E", "É|È|Ê|Ë"],
    ["e", "é|è|ê|ë"],
    ["I", "Í|Ì|Î|Ï"],
    ["i", "í|ì|î|ï"],
    ["O", "Ó|Ò|Ô|Õ"],
    ["o", "ó|ò|ô|õ"],
    ["U", "Ú|Ù|Û"],
    ["u", "ú|ù|û"],
    ["C", "Ç"],
    ["c", "ç"],
    ["N", "Ñ"],
    ["n", "ñ"]
]);

const reducer = (acc, [key]) => acc.replace(new RegExp(accentsMap.get(key), "g"), key);

function removeAccents(text) {
    return [...accentsMap].reduce(reducer, text);
}


document.onkeydown = handleKey

function handleKey(e) {
    if (e.key == "Enter") {
        if (input.value.length != 0) {
            input.value = activeSuggestionValue
        }
        checkGuess()
    }
    if (e.key == "ArrowDown" && activeSuggetion < suggestionsLength - 1) {
        activeSuggetion++
        updateSuggestion()
    }
    if (e.key == "ArrowUp" && activeSuggetion > 0) {
        activeSuggetion--
        updateSuggestion()
    }
}


function checkGuess() {
    let tip = document.getElementById("tip")
    if (input.value == codes[countryId].name) {
        tip.style.visibility = "hidden"
        if (streak.hasOwnProperty(countryId)) {
            streak[countryId]++
        } else {
            streak[countryId] = 1
        }
        if (streak[countryId] > 1) {
            shuffledList.splice(shuffledList.indexOf(countryId), 1)
            completedCountries++
            updateCompletion()
        }
        changeFlag()
    } else {
        tip.innerHTML = "Falsch " + codes[countryId].name + " währe es gewesen"
        tip.style.visibility = "visible"
        streak[countryId] = -1
    }
    input.value = ""
    updateSuggestion()
}


function updateCompletion() {
    document.getElementById("countryCount").innerHTML = completedCountries + "/" + targetCountrysNumber
}

function startGame() {
    document.getElementById("settings").style.display = "none"
    document.getElementById("restartButton").style.display = "flex"
    getCheckboxes()
    main();
}

settings = { regions: {}, duplicateFlags: true }
let tickNumber = 7

function getCheckboxes() {
    let regions = document.getElementById("regions").children
    settings.regions.europe = !regions[0].classList.contains("inactiveButton")
    settings.regions.africa = !regions[1].classList.contains("inactiveButton")
    settings.regions.northamerica = !regions[2].classList.contains("inactiveButton")
    settings.regions.southamerica = !regions[3].classList.contains("inactiveButton")
    settings.regions.centralamerica = !regions[4].classList.contains("inactiveButton")
    settings.regions.caribbean = !regions[4].classList.contains("inactiveButton")
    settings.regions.asia = !regions[5].classList.contains("inactiveButton")
    settings.regions.oceania = !regions[6].classList.contains("inactiveButton")
    settings.regions.antarctic = !regions[6].classList.contains("inactiveButton")
}

function resetSettings() {
    tickNumber = 7
    let regions = document.getElementById("regions")
    for (const box of regions.children) {
        box.classList.remove("inactiveButton")
        box.children[0].icon = "material-symbols:check-box"
    }
}

function toggleCheckbox(index) {
    let regions = document.getElementById("regions")
    box = regions.children[index]
    if (box.classList.contains("inactiveButton")) {
        box.classList.remove("inactiveButton")
        box.children[0].src = "./icons/check-box.svg"
        tickNumber++
    } else {
        if (tickNumber > 1) {
            box.classList.add("inactiveButton")
            box.children[0].src = "./icons/check-box-outline-blank.svg"
            tickNumber--
        }
    }
}

function restart() {
    resetSettings()
    completedCountries = 0
    document.getElementById("endScreen").style.display = "none"
    document.getElementById("restartButton").style.display = "none"
    document.getElementById("settings").style.display = "flex"
}

navigator.virtualKeyboard.overlaysContent = true;

function setEnterStyle(style) {
    if (style) {
        document.getElementById("guess").classList.add("reverse")
        document.getElementById("guessField").classList.add("reverse")
        document.getElementById("suggestions").classList.add("reverse")
    } else {
        document.getElementById("guess").classList.remove("reverse")
        document.getElementById("guessField").classList.remove("reverse")
        document.getElementById("suggestions").classList.remove("reverse")
    }
}



navigator.virtualKeyboard.addEventListener("geometrychange", (event) => {
    if (event.target.boundingRect.height > 0) {
        setEnterStyle(true)
    } else {
        setEnterStyle(false)
    }
})

function createFlagCacheList() {
    let temp = []
    for (let i = 0; i < Object.keys(codes).length; i++) {
        temp.push(Object.keys(codes)[i].toLowerCase())
    }
    return JSON.stringify(temp)
}

const actualHeight = window.innerHeight;
const elementHeight = document.querySelector('#control-height').clientHeight;

const barHeight = elementHeight - actualHeight;
document.documentElement.style.setProperty('--bar-height', barHeight + 'px');