const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
// fetch() method returns a promise object - is fulfilled when the browser receives a response from the server

// Creates a generic fetch() function which renders result to JSON, when string URL is passed through
function fetchData(url) {
    return fetch(url) // checks the status of the response => then parses to JSON => otherwise will catch error
        // .then(res => console.log(res))
        .then(res => res.json())
}

// Using breeds list endpoint to return a list of all the master breeds and populate the select list - chains .then methods to convert data and returned response to JSON
fetchData('https://dog.ceo/api/breeds/list')
    // .then(response => response.json())

    // The message data returned here contains an array of dog breeds that need to be iterated through and inserted into the select menu
    // .then(data => console.log(data))

    .then(data => generateOptions(data.message)) // fetch() request responds with JSON data, will call to a function called generateOptions


// To display the random dog url on the page
fetchData('https://dog.ceo/api/breeds/image/random')
    // .then(response => console.log(response)) // fetch then returns a response object, data is contained in body
    
    // API used returns data in JSON, needs to be parsed
    // reads the response, returns a promise that resolves to JSON (implicitly returned)
    // .then(response => response.json())

    // To do something to the JSON data - to view returned object values:
    // .then(data => console.log(data))

    // Contains a key with the field message with the image requested - random image url as a string
    // .then(data => console.log(data.message))

    .then(data => generateImage(data.message)) // fetch() request responds with JSON data, will call to a function called generateImage

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

// Create a generateOptions function to iterate through the dog breed JSON data array and insert as HTML <options> from the <select> parent
function generateOptions(data) {
    // Use map to iterate over array and return an option element from each item in the array, stored in the options variable
    // Use interpolation to insert each returned breed as the option and as text
    const options = data.map(item => `
        <option value='${item}'>${item} </option>
    `).join('');
    select.innerHTML = options;
}

// Create the generateImage function, takes the parameter 'data', assigned a template literal to take markup for image and paragraph
function generateImage(data) {
    const html = `
        <img src='${data}' alt>
        <p>Click to view images of ${select.value}s</p>
    `;
    // Set the inner HTML of the empty <div> with the 'card' class
    card.innerHTML = html;       
}

// To return a random image of a selected breed
function fetchBreedImage() {
    // To link breed from <select> menu to pass to fetchData breed randomiser
    const breed = select.value;
    // To be inserted into the card <div>
    const img = card.querySelector('img');
    const p = card.querySelector('p');

    // Function returns a promise that will be completed once a response is a returned from server and passed to JSON
    // Use string interpolation to insert the breed into the fetchData URL
    fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
        // Chain a method to update to a new image <url> and details returned 
        .then(data => {
            img.src = data.message; // sets to the URL if new random breed image
            img.alt = breed; // alt tag set to breed
            p.textContent = `Click to view more ${breed}s`; // update the paragraph text content to breed
        })
}

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
// Call on select menu, a change event and the fetchBreedImage function as the callback
select.addEventListener('change', fetchBreedImage);
// Call on card menu, a click event will generate a new image, using fetchBreedImage as the callback
card.addEventListener('click', fetchBreedImage);


// ------------------------------------------
//  POST DATA
// ------------------------------------------

