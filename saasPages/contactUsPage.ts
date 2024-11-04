import { expect, Page } from '@playwright/test'
import path from 'path'


export class ContactUsPage{
    readonly page: Page
    constructor(page:Page){
        this.page = page 
    }

    async navigateAndVerifyContactUsPage(){
        await this.page.getByRole('link', {name: 'Contact Us'}).click()
        await expect(this.page.getByText(('GET IN TOUCH'))).toBeVisible()


    }

    async enterMessaqgeInContactUs(name: string, email: string){
        await this.page.getByRole('textbox', {name: 'Name'}).fill(name)
        await this.page.getByRole('textbox', {name: 'Email'}).first().fill(email)
        await this.page.getByRole('textbox', {name: 'Subject'}).fill('This is a test message')
        await this.page.getByRole('textbox', {name: 'Your Message Here'}).fill('This is a test message')
        const uploadButton = this.page.locator('input[type="file"]');
    
        this.page.on('dialog', dialog => {
            expect(dialog.message()).toEqual('Press OK to proceed!')
            dialog.accept()
        })
        // Upload the file
        await uploadButton.setInputFiles(path.join(__dirname, '..', 'testfile.txt'));

        await this.page.getByRole('button', {name: 'Submit'}).click()

        await expect(this.page.locator('.status.alert.alert-success')).toHaveText('Success! Your details have been submitted successfully.')
    
    };
};