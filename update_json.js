const fs = require('fs');

// Function to update JSON data
function updateJSON() {
    // Read JSON file
    let jsonData = JSON.parse(fs.readFileSync('data.json'));

    // Modify JSON data (example: increment a value)
    jsonData.value++;

    // Write updated JSON back to file
    fs.writeFileSync('data.json', JSON.stringify(jsonData, null, 2));
}

// Call updateJSON function initially
updateJSON();

// Call updateJSON function every 5 minutes (300,000 milliseconds)
setInterval(updateJSON, 300000); 
