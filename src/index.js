const loadAndExportHTMLPageContent = require('./loadAndExportHtml');
const parseHTMLContent = require('./parseHtmlContent');
const updateProjectInfo = require('./updateProjectInfo');
const logger = require('../logger');

async function ScrapHTMLPage(PageURL){
    let pageContent = await loadAndExportHTMLPageContent(PageURL);
    let parseResponse = await parseHTMLContent(pageContent);
    await updateProjectInfo(parseResponse);
    logger.info('Parsing Completed', parseResponse);
}

module.exports = ScrapHTMLPage;