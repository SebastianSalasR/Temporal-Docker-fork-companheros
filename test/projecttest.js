const { Builder, By, until, Actions} = require("selenium-webdriver");

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

		// Go to the project site
		await driver.get("http://localhost:3002/dashboard/");

		// Click on "Landing Projects"
		const landingProjects = await driver.wait(
			until.elementLocated(By.xpath("//div[h1[text()='Landing Projects']]")),
			5000
		);
		await landingProjects.click();

		// Click checkboxes
		const checkboxes = await driver.wait(until.elementsLocated(By.css("input[type='checkbox']")), 5000);
		for (let checkbox of checkboxes) {
			const value = await checkbox.getAttribute("value");
			if (value === "3" || value === "4") {
				await checkbox.click();
			}
		}

		// Move "Fondecyt 3160182" on top of "Fondecyt 11180881"
		const item1 = await driver.wait(
			until.elementLocated(By.xpath("//div[h1[text()='Fondecyt 11180881']]")),
			5000
		);
		const item2 = await driver.wait(
			until.elementLocated(By.xpath("//div[h1[text()='Fondecyt 3160182']]")),
			5000
		);

		const actions = driver.actions({ async: true });
		await actions.dragAndDrop(item2, item1).perform();

		// Click Save button
		const saveButton = await driver.wait(
			until.elementLocated(By.css(".bg-sky-600.flex.justify-center.items-center.rounded-lg.h-12.w-24.cursor-pointer.text-lg")),
			5000
		);
		await saveButton.click();
	
		// Go to the "Publications" page
		await driver.get("http://localhost:3002/Projects");

			await new Promise(resolve => setTimeout(resolve, 5000)); // Sleep for 5 seconds

		console.log("[+] Test successful.");
	} catch (error) {
		console.error("[!] Error in the test:", error);
	} finally {
		// Cerrar el navegador
		await driver.quit();
	}
}

// Ejecutar el script
testScrapper();
