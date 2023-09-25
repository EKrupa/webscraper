const puppeteer = require('puppeteer')
const mongoose = require('mongoose')
const express = require('express')
const app = express();



async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
     await page.goto(url);
    
    const [el] = await page.$x('//*[@id="landingImage"]');
    const src = await el.getProperty('src');
    const imgURL = await src.jsonValue();

    const [el2] = await page.$x('//*[@id="productTitle"]');
    const txt = await el2.getProperty('textContent');
    const title = await txt.jsonValue();

    const [el3] = await page.$x('//*[@id="corePrice_feature_div"]/div/span[1]/span[2]/span[2]');
    const txt2 = await el3.getProperty('textContent');
    const price = await txt2.jsonValue();
    console.log({imgURL, title, price});

    return {imgURL, title, price};



browser.close();

}

scrapeProduct('https://www.amazon.com/FIFTY-FIFTY-Mountain-Handlebar-Aluminum-Diameter/dp/B08JCFX6QB/ref=sr_1_5?crid=1PWPK9D1NBQXV&keywords=wide%2Briser%2Bhandlebar&qid=1693528853&sprefix=wide%2Briser%2Bhandlebar%2Caps%2C219&sr=8-5&th=1')



