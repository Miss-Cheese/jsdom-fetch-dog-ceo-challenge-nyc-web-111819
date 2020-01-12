console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"

document.addEventListener('DOMContentLoaded', function() {
    fetchImages()
    renderImages()
    listBreeds()
  })

function fetchImages() {
    fetch (imgUrl)
    .then(function(response) {
      return response.json();
    })
    .then(results => {
        results.message.forEach(image => renderImages(image))
      });
  }
  
function renderImages(dogImageLink) {
    const imageContainer = document.getElementById("dog-image-container")
    const image = document.createElement('img')
    image.src = dogImageLink
    imageContainer.appendChild(image)
}

const breedUrl = 'https://dog.ceo/api/breeds/list/all'
let dogBreeds = []

function listBreeds() {
    fetch (breedUrl)
    .then(function(response) {
        return response.json();
    })
    .then(results => {
       dogBreeds = Object.keys(results.message)
       renderBreeds(dogBreeds)
       dropDownFilter()
    })
}

function renderBreeds(dogBreeds) {
    const ul = document.getElementById("dog-breeds");
    removeChildren(ul)
    dogBreeds.forEach(breed => addBreed(breed))
}

function addBreed(breed) {
    const ul = document.getElementById("dog-breeds");
    let dogLi = document.createElement('li')
    dogLi.innerText = breed
    ul.appendChild(dogLi)
    dogLi.addEventListener("click", changeColor)
}

function changeColor(event) {
    event.target.style.color = "green"
}

function dropDownFilter(){
    let selectId = document.getElementById("breed-dropdown")
    selectId.addEventListener('change', function(event) {
        breedSelector(event.target.value)
    })
}

function breedSelector(letter) {
    renderBreeds(dogBreeds.filter(breed => breed.startsWith(letter)))
}

function removeChildren(element) {
    let child = element.lastElementChild
    while (child) {
        element.removeChild(child)
        child = element.lastElementChild
    }
}