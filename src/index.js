const loadAndExportHTMLPageContent = require('./loadAndExportHtml');
const parseHTMLContent = require('./parseHtmlContent');
const logger = require('../logger');

async function ScrapHTMLPage(PageURL){
    let pageContent = await loadAndExportHTMLPageContent(PageURL);
    let parseResponse = await parseHTMLContent(pageContent);
    logger.info('Parsing Completed');
}

module.exports = ScrapHTMLPage;