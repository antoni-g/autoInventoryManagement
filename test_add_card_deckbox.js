const puppeteer = require('puppeteer');
var json = info('./test.json');

// series of functions to test adding a llanowar elves to deckbox
var login = async function(){
	console.log('attempting to add elf to deckbox.')
	const browser = await puppeteer.launch();
  	const page = await browser.newPage();
  	await page.goto('https://deckbox.org');
  	await page.screenshot({path: 'google.png'});
  	var pageTitle = await page.title();
  	if (pageTitle === 'Deckbox') {
  		console.log('user not logged in on deckbox.')
  	}
  	else {
  		console.log('logged in on deckbox.')
  	}
  	await browser.close();
};

module.exports.addElf = login;