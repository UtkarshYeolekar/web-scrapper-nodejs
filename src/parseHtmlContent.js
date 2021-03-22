const cheerio = require('cheerio');
const logger = require('../logger');

async function parseHTMLContent(html) {
    try {

        logger.info('Parsing HTML');

        let data = [];
        const $ = cheerio.load(html);
        $('table.itemlist tr td:nth-child(3)')
            .each((i, elem) => {
                data.push({
                    title: $(elem).text(),
                    link: $(elem).find('a.storylink').attr('href')
                });
            });
        logger.info('Parsing HTML Completed');
        return data;
    }
    catch (exception) {
        logger.error('Exception Occured While Parsing HTML Content', exception);
    }
}

module.exports = parseHTMLContent;