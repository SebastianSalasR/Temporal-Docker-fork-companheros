const { Builder, By, until } = require("selenium-webdriver");

async function testScrapper() {
	let driver = await new Builder().forBrowser("firefox").build();

	try {
		// Go to the login page
		await driver.get("http://localhost:3002/dashboard");

		// Wait until the login field is visible
		await driver.wait(until.elementLocated(By.name("email")), 5000);

		// Enter email
		const emailInput = await driver.wait(until.elementIsVisible(driver.findElement(By.name("email"))), 5000);
		await emailInput.sendKeys("admin@gmail.com");

		// Wait the password field
		await driver.wait(until.elementLocated(By.name("password")), 5000);

		// Put the password
		await driver.findElement(By.name("password")).sendKeys("Admin12345");

		// Make click in the login button
		await driver.findElement(By.css("button[type='submit']")).click();

		// Wait fot the dashboard redirect
		await driver.wait(until.urlContains("/dashboard"), 5000);

		// Go to the publications site
		await driver.get("http://localhost:3002/dashboard/Publications");

		// Find the input and paste the URL of Google Scholar
		const scholarInput = await driver.findElement(By.xpath("//input[@placeholder='Enter Google Scholar URL']"));
		await scholarInput.sendKeys("https://scholar.google.cl/citations?user=RNYDdjEAAAAJ&hl=en");

		// Find the second input and type * * * * *
		const maskedInput = await driver.findElement(By.xpath("//input[@placeholder='* * * * *']"));
		await maskedInput.sendKeys("* * * * *");

		// Click the add URL button
		const addUrlButton = await driver.findElement(By.xpath("//button[contains(text(), 'Add URL')]"));
		await addUrlButton.click();

		// Click the "Start Scraping" button
		const startButton = await driver.findElement(By.xpath("//button[contains(text(), 'Start Scraping')]"));
		await startButton.click();

		// Wait 13 seconds for the scrapping script to finish
		await driver.sleep(13000);

		// Go to the publications site
		await driver.get("http://localhost:3002/Publications");

		// Check if the publications exists
		const publicationLink = await driver.wait(
			until.elementLocated(By.xpath("//a[contains(@href, 'RNYDdjEAAAAJ:iH-uZ7U-co4C')]")),
			5000
		);

		if (publicationLink) {
			console.log("[+] Test successful.");
		} else {
			console.log("[!] Test not successful.");
		}

	} catch (error) {
		console.error("[!] Error in the scrapper:", error);
	} finally {
		// Cerrar el navegador
		await driver.quit();
	}
}

// Ejecutar el script
testScrapper();
