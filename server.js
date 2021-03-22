const pageURL = 'https://news.ycombinator.com/';
const scrapHTMLPage = require('./src/index');
require('./logger');

async function startup() {
    await scrapHTMLPage(pageURL);
}

startup()
    .finally(() => {
        // waiting for logger to complete the writing of logs in the file.
        setTimeout(()=>{
            process.nextTick(process.exit())
        },5000)
});