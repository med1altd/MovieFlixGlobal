const fs = require('fs');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const cron = require('node-cron');

// Function to update JSON file
async function updateJsonFile() {
    // Read existing JSON data
    let data = fs.readFileSync('data.json');
    let jsonData = JSON.parse(data);

    // Update JSON values here
    jsonData.key = 'new_value';

    // Write updated JSON data back to the file
    fs.writeFileSync('data.json', JSON.stringify(jsonData, null, 4));

    try {
        // Commit changes to Git
        await exec('git add data.json');
        await exec('git commit -m "Update JSON data"');
        await exec('git push');
    } catch (error) {
        console.error('Error occurred while pushing changes to GitHub:', error);
    }
}

// Schedule the task to run every 5 minutes
cron.schedule('*/5 * * * *', async () => {
    console.log('Updating JSON file...');
    await updateJsonFile();
    console.log('JSON file updated and changes pushed to GitHub.');
});
