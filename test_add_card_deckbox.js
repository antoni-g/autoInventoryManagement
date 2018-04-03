const puppeteer = require('puppeteer');
var info = require('./test.json');

// series of functions to test adding a llanowar elves to deckbox
var init = async function(){
	console.log('attempting to add elf to deckbox.')
	const browser = await puppeteer.launch();
  	const page = await browser.newPage();
  	await page.goto('https://deckbox.org');
  	await page.screenshot({path: 'deckbox_landing.png'});
  	var pageTitle = await page.title();
  	if (pageTitle === 'Deckbox') {
  		console.log('user not logged in on deckbox.');
  		await login(page);
  	}
  	else {
  		console.log('logged in on deckbox.');
  	}
  	await browser.close();
};

async function login(page) {
	console.log('attempting to hit login button');
  await page.click('#nav > ul > li:nth-child(2) > a');
  await page.screenshot({path: 'deckbox_login.png'});
}

module.exports.addElf = init;