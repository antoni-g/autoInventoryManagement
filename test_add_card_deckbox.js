const puppeteer = require('puppeteer');
var prompt = require('prompt');
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
      await add();
  	}
  	await browser.close();
};

async function login(page) {
	console.log('attempting to hit login button');
  await page.click('#nav > ul > li:nth-child(2) > a');
  await page.screenshot({path: 'deckbox_login.png'});
  var email;
  var password;
  (async () => {
    await prompt.get(['email', 'password'], function (err, result) {
      //
      // akgdevelopment@gmail.com, TestPass1
      //
      console.log('Command-line input received:');
      email = result.email;
      password = result.password;

      await page.$eval('#login', el => el.value = email);
      await page.$eval('#password', el => el.value = password);
      await page.screenshot({path: 'deckbox_login_form.png'});
      await page.click('#submit_button');
      await add();
    });
  })
}

async function add() {
  console.log('navigating to home page');
  await page.screenshot({path: 'deckbox_home.png'});
}

module.exports.addElf = init;