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
      await add(page);
  	}
  	await browser.close();
};

async function login(page) {
	console.log('attempting to hit login button');
  await page.click('#nav > ul > li:nth-child(2) > a');
  await page.screenshot({path: 'deckbox_login.png'});
  // var email;
  // var password;
  // var flag;
  // prompt.get(['email', 'password'], function (err, result) {
  //   //
  //   // akgdevelopment@gmail.com, TestPass1
  //   //
  //   console.log('Command-line input received:');
  //   email = result.email;
  //   password = result.password;
  // });
  await page.$eval('#login', el => el.value = 'akgdevelopment@gmail.com');
  await page.$eval('#password', el => el.value = 'TestPass1');
  await page.screenshot({path: 'deckbox_login_form.png'});
  await page.click('#submit_button');
  await page.waitForNavigation(0);
  await add(page);
}

async function add(page) {
  console.log('navigating to home page');
  await page.screenshot({path: 'deckbox_home.png'});
  console.log('navigating to inventory page');
  await page.click('#section_mtg > li:nth-child(1) > a');
  await page.waitForNavigation(0);
  await page.screenshot({path: 'deckbox_inventory.png'});
  // console.log('attempting to adjust card settings');
  // await page.click('#_button_default_edition_single');
  // await page.waitForNavigation(0);
  // await page.$eval('body > div:nth-child(23) > div > ul > li:nth-child(1) > div > input[type="text"]', el => el.value = 'alpha');
  // await page.click('#tab_import_list > a');
  // await page.waitForNavigation(0);
  // await page.$eval('#new_card_list_txt_advanced', el => el.value = 'llanowar elves');
  // await page.screenshot({path: 'deckbox_elf_pre_add.png'});
  // console.log('attempting to add card');
  // await page.click('#submit_add_list');
  // await page.waitForNavigation(0);
  // await page.screenshot({path: 'deckbox_elf_added.png'});
  // console.log('added card');
}


module.exports.addElf = init;