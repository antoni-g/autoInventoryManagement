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
  await Promise.all([
    page.click('#nav > ul > li:nth-child(2) > a'),
    page.waitForNavigation(),
  ]);
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
  await Promise.all([
    page.click('#submit_button'),
    page.waitForNavigation(),
  ]);
  await add(page);
}

async function add(page) {
  console.log('navigating to home page');
  await page.screenshot({path: 'deckbox_home.png'});
  console.log('navigating to inventory page');
  await Promise.all([
    page.waitForSelector('#section_mtg > li:nth-child(1) > a'),
    page.click('#section_mtg > li:nth-child(1) > a'),
  ]);
  await page.screenshot({path: 'deckbox_inventory.png'});
  await page.waitForSelector('#tab_import_list > a');
  await page.click('#tab_import_list > a'),
  await page.$eval('#new_card_list_txt_advanced', el => el.value = 'llanowar elves');
  await page.click('#submit_add_list');
  console.log('added llanowar elf to deckbox');
  // // 
  // 
  // await page.waitForNavigation({timeout:0});
  // 
  // await page.screenshot({path: 'deckbox_inventory_elf_typed.png'});
  // console.log('attempting to adjust card settings');
  // await page.waitForSelector('#_button_default_edition_single');
  // await page.click('#_button_default_edition_single');
  // await page.waitForSelector('body > div:nth-child(23) > div > ul > li:nth-child(1) > div > input[type="text"]'),
  // await page.$eval('body > div:nth-child(23) > div > ul > li:nth-child(1) > div > input[type="text"]', el => el.value = 'alpha');
  // // await page.click('#tab_import_list > a').then(() => page.waitForNavigation({waitUntil: 'load'}));
  // // await page.$eval('#new_card_list_txt_advanced', el => el.value = 'llanowar elves');
  // // await page.screenshot({path: 'deckbox_elf_pre_add.png'});
  // // console.log('attempting to add card');
  // // 
  // // await page.waitForNavigation(0);
  // // await page.screenshot({path: 'deckbox_elf_added.png'});
  // // console.log('added card');
}


module.exports.addElf = init;