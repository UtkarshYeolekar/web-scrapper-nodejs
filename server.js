require('dotenv').config()
const pageURL = process.env.PAGEURL || 'https://news.ycombinator.com/';
const scrapHTMLPage = require('./src/index');

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