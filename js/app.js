const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
// fetch() method returns a promise object - is fulfilled when the browser receives a response from the server

// Using breeds list endpoint to return a list of all the master breeds and populate the select list - chains .then methods to convert data and returned response to JSON
fetch('https://dog.ceo/api/breeds/list')
  .then(response => response.json())
  .then(data => generateOptions(data.message))

// To display the random dog url on the page
fetch('https://dog.ceo/api/breeds/image/random')
  .then(response => response.json())
  .then(data => generateImage(data.message))

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
    card.innerHTML = html;
}

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------



// ------------------------------------------
//  POST DATA
// ------------------------------------------

