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

            /* From all the columns in the rows, only fetching the required ones;

             * 1. The condition i < tableHeaders, will restrict from failing, if the COLUMN
             *    COUNT is not equal for table headers and table rows.
             * 
             * 2. Only taking values, if current column index belongs to the required table headers.
             * 
             *  Note ; We already trimmed the headers name while fetching, as it was returning spaces.
             */

            $(tds).each((i, element) => {
                if( i< tableHeaders.length &&
                      ( tableHeaders[i].includes("ProjectName")
                      || tableHeaders[i].includes("ProjectNo") 
                      || tableHeaders[i].includes("Status"))
                      )
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