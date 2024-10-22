const puppeteer = require('puppeteer');
const fs = require('fs'); // File system module to save files

(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: null,
    headless: false// Set to true if you don't want the browser to be visible
  });
  const page = await browser.newPage();

  // Start listening for network responses
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    request.continue(); // Continue processing the request
  });

  page.on('response', async (response) => {
    try {
      const responseBody = await response.text();
      
      // Check if the response contains "PrinterCode"
      if (responseBody.includes('"PrinterCode"')) {
        console.log(`Response URL: ${response.url()}`);

        // Parse the response body as JSON
        const parsedResponse = JSON.parse(responseBody);
        
        // Extract the PrinterCode from the parsed response
        const printerCode = parsedResponse[0]?.PrinterCode;

        if (printerCode) {
          console.log(`PrinterCode: ${printerCode}`);

          // Save only the PrinterCode to a file named Label.zpl
          fs.writeFileSync('Label.zpl', printerCode);
          console.log('PrinterCode saved to Label.zpl');
        } else {
          console.log('No PrinterCode found in the response');
        }
      }
    } catch (error) {
      console.error('Error processing response:', error);
    }
  });

  // Navigate to the page you want to monitor
  await page.goto('https://test.cloud.plex.com/', {
    waitUntil: 'networkidle0', // Wait until all network requests are done
  });

  // You can add any other interactions with the page here

  // Close the browser after some time (optional)
  // await browser.close();
})();
