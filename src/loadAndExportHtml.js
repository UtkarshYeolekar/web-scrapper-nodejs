const puppeteer = require('puppeteer');
const logger = require('../logger');

async function loadAndExportHTMLPageContent(PageURL) {

  try {

    logger.info(`Startig Scrapping Page : ${PageURL}` );

    // launching headless browser.
    let browser = await puppeteer.launch();

    // Creating new page/tab
    let page = await browser.newPage();    

    // Loading/Opening page.
    await page.goto(PageURL);

    logger.info('Page Loaded');

    return await page.content();

  }
  catch (execption) {
    logger.error('Exception Occurred While Loading/Exporting HTML Page Content', execption);
  }

}
module.exports = loadAndExportHTMLPageContent;

