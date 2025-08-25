const { expect } = require("@playwright/test");

exports.ContactPage = class ContactPage {
    constructor(page){
        this.page = page;
        this.addContact = '//button[@id="add-contact"]';
        this.firstName ='#firstName';
        this.lastName = '#lastName';
        this.dob = '//input[@placeholder="yyyy-MM-dd"]';
        this.email = '//input[@id="email"]';
        this.phone = '//input[@id="phone"]';
        this.address = '//input[@placeholder="Address 1"]';
        this.city = '//input[@placeholder="City"]';
        this.state = '//input[@placeholder="State or Province"]';
        this.postal ='//input[@placeholder="Postal Code"]';
        this.country='//input[@placeholder="Country"]';
        this.Save='button[@id="submit"]';
        this.savedFirstName='//span[@id="firstName"]';
        this,savedLastName='//span[@id="lasttName"]';
        this.savedDOB='//span[@id="dateOfBirth"]';
        this.savedEmail='//span[@id="email"]';
        this.savedPhone='//span[@id="phone"]';
        this.savedAddress='//span[@id="address"]';
        this.savedCity='//span[@id="city"]';
        this.savedState='//span[@id="stateProvince"]';
        this.savedPostal='//span[@id="postalCode"]';
        this.savedCountry='//span[@id="country"]';
        this.viewCreatedContact='//th[contains(text()."Name")]//following::td[2]';
        this.editContact='button[@id="edit-contact"]';
        this.deleteContact= 'button[@id="delete"]';
    }
        async contactAdd(firstName,lastName,dateOfBirth,email,phone,address,city,state,postal,country){
            await this.page.locator(this.addContact).click();
            await this.page.locator(firstName).fill(firstName);
            await this.page.locator(lastName).fill(lastName);
            await this.page.locator(dateOfBirth).fill(dateOfBirth);//similarly for all the variable(ig.)
            await this.page.locator(email).fill(email);
            await this.page.locator(phone).fill(phone);
            await this.page.locator(address).fill(address);
            await this.page.locator(city).fill(city);
            await this.page.locator(state).fill(state);
            await this.page.locator(postal).fill(postal);
            await this.page.locator(country).fill(country);
        }

        async validateContactCreated(fName,lName,dob,email,phone,address,city,state,postal,country){
            const fNameValidation= await this.page.locator(this.savedFirstName);
            const lNameValidation= await this.page.locator(this.savedLastName);
            const dobValidation= await this.page.locator(this.savedDOB);
            const emailValidation= await this.page.locator(this.savedEmail);
            await expect(fNameValidation).toHaveText(fName);
        }

        async viewContact() {
            await this.page.locator(this.viewCreatedContact.click());
        }
        
        async contactEdit(firstName){
            await this.page.locator(this.editContact).click();
            await this.page.waitForTimeout(2000);
            await this.page.locator(this.firstName).clear();
            await this.page.locator(this.firstName).fill(firstName);
            await this.page.waitForTimeout(2000);
            await this.page.locator(this.save).click();
        }

        async contactDelete(){
            await this.page.waitForTimeout(2000);
            this.page.once('dialog',async dialog =>{
                console.log('Dialog message: ${dialog.message()}');
                await dialog.accept();//Use dialog.dismiss() if you want to cancel instead
            });
        }

}