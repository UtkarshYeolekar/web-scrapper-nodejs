const cheerio = require('cheerio');
const logger = require('../logger');

async function parseHTMLContent(html) {
    try {

        const scrapedData = [];
        const tableHeaders = [];

        logger.info('Parsing HTML');

        const $ = cheerio.load(html);

        $("table:nth-child(4) tr").each((index, element) => {

            // Getting Table Headers
            if (index === 0) {
                const ths = $(element).find("td");
                $(ths).each((i, element) => {
                    tableHeaders.push(
                        $(element).text().trim().replace(/ +/g, "")
                    );
                });
                return true;
            }

            // Getting Table Rows Data
            const tds = $(element).find("td");

            const tableRow = {};

            $(tds).each((i, element) => {
                tableRow[tableHeaders[i]] = $(element).text().trim();
            });

            scrapedData.push(tableRow);

        });

        logger.info('Parsing HTML Completed');
        return scrapedData;
    }
    catch (exception) {
        logger.error('Exception Occured While Parsing HTML Content', exception);
    }
}

module.exports = parseHTMLContent;