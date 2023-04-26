import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./e2e/features/register-form.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 50 });
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('The user is not registered in the site', ({given,when,then}) => {
    
    let username:string;
    let password:string;

    given('An unregistered user', () => {
      username = "newUser2"
      password = "12345A..."
    });

    when('I fill the data in the form and press submit', async () => {
      await page.setViewport({ width: 1400, height: 900 });
      await expect(page).toMatch("Descubre LoMap");
      await expect(page).toClick('button', {text:'Adelante'})

      await expect(page).toClick('a', {text:'Regístrate'})

      await expect(page).toFillForm('form', {
        username: username,
        password: password,
        confirmPasswordSU: password
      })
      await expect(page).toClick('button', { text: 'Crear cuenta' })
    });

    then('Switch to the Login form', async () => {
      await expect(page).toMatch('Cuenta creada')
    });
  })


  test('The user is registered in the site', ({given,when,then}) => {
    
    let username:string;
    let password:string;

    given('A registered user', () => {
      username = "newuser"
      password = "12345A..."
    });

    when('I fill the data in the form and press submit', async () => {

      await page
      .goto("http://localhost:3000", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});


      await page.setViewport({ width: 1400, height: 900 });
      await expect(page).toMatch("Descubre LoMap");
      await expect(page).toClick('button', {text:'Adelante'})

      await expect(page).toClick('a', {text:'Regístrate'})

      await expect(page).toFillForm('form', {
        username: username,
        password: password,
        confirmPasswordSU: password
      })
      await expect(page).toClick('button', { text: 'Crear cuenta' })
    });

    then('A message appear', async () => {
      await expect(page).toMatch('No se ha podido crear la cuenta')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});

