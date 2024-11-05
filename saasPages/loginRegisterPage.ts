import { expect, Page } from '@playwright/test'
import { AccountCreationHelper } from '../helpers /accountCreation'
import { argosScreenshot } from "@argos-ci/playwright";



export class LoginRegisterPage{

    readonly page: Page 

    constructor(page:Page){
        this.page = page 
    }
    
    

    async enterNewAccountDetails(name: string){
        const accountHelper = new AccountCreationHelper()
        const user = await accountHelper.createRandomUsers()
        const email = user.email
        await this.page.getByRole('textbox', {name: 'Name'}).fill(name)
        await this.page.locator('.signup-form').getByRole('textbox', {name: 'Email Address'}).fill(email)
        await this.page.getByRole('button', {name: 'Signup'}).click()


    }
    async enterAccountDetailsAndCreateAccount(password: string){

        const radioButtons =  this.page.getByRole('radio')

        for( const radioButton of await radioButtons.all()){
            await radioButton.click()
            await expect(radioButton).toBeChecked()
        }
        await this.page.getByRole('textbox', {name: 'Password'}).fill(password)
        // handle drop downs for D.O.B
        await this.page.selectOption('#days', '12')
        await this.page.selectOption('#months', 'January')
        await this.page.selectOption('#years', '2000')

    
        // loop through check boxes check them and confirm checked

        const registerCheckBox = this.page.getByRole('checkbox')

        for(const checkbox of await registerCheckBox.all()){
            await checkbox.click()
            await expect(checkbox).toBeChecked()
        }

        await this.page.getByRole('textbox', {name: 'First name'}).fill('Matt')
        await this.page.getByRole('textbox', {name: 'Last name'}).fill('Mallen')
        await this.page.getByRole('textbox', {name: 'Company'}).first().fill('Test Company')
        await this.page.getByRole('textbox', {name: 'address'}).first().fill('123 Main St')
        await this.page.getByRole('textbox', {name: 'address'}).last().fill('123 Main St')
        await this.page.selectOption('#country', 'United States')
        await this.page.locator('#state').fill('California')
        await this.page.locator('#city').fill('Los Angeles')
        await this.page.locator('#zipcode').fill('12345')
        await this.page.getByRole('textbox', {name: 'mobile number'}).fill('123-456-7890')
        await this.page.getByRole('button', {name: 'Create Account'}).click()
        await expect(this.page).toHaveURL('/account_created')
        await expect(this.page.getByText('Account Created!')).toBeVisible()
        await expect(this.page.getByText('Congratulations!')).toBeVisible()
        await this.page.getByText('Continue').click()
        await expect(this.page.getByText('Logout')).toBeVisible()
        await expect(this.page.getByText('Logged in as Matt')).toBeVisible()

        

    }
    async deleteAccount(){
        await this.page.getByText('Delete Account').click()
        await expect(this.page.getByText('Account Delete')).toBeVisible()
        await expect(this.page.getByText('Your account has been permanently deleted!')).toBeVisible()
        await this.page.getByText('Continue').click()

    }

    async logIntoAccount(email: string, password: string){
        await this.page.getByText('Signup / Login').click()
        await argosScreenshot(this.page, "Login Page");
        // await expect(this.page.locator('.login-form')).toHaveScreenshot()
        await expect(this.page.getByText('Login to your account')).toBeVisible()
        await this.page.locator('.login-form').getByRole('textbox', {name: 'Email Address'}).fill(email)
        await this.page.getByRole('textbox', {name: 'Password'}).fill(password)
        // await this.page.locator('.login-form').screenshot({path: 'screenshots/logon.png'})
        // const buffer = await this.page.screenshot()
        // console.log(buffer.toString('base64'))
        await this.page.getByRole('button', {name: 'Login'}).click()
    }
    async verifyAccountLoggedIn(){
        await expect(this.page.getByText('Logged in as Matt')).toBeVisible()
        await argosScreenshot(this.page, "Verify Logged in page");
    }
    async verifyLoginError(){
        await expect(this.page.getByText('Your email or password is incorrect')).toHaveAttribute('style', 'color: red;')
    }
    async logUserOut(){
        await this.page.getByText('Logout').click()
        await expect(this.page.getByAltText('Logouit')).not.toBeVisible()
        await argosScreenshot(this.page, "log out page");
        expect(this.page.url()).toMatch('/')

    }
    async signUpWithExistingEmail(name: string, email: string){
    
        await this.page.getByRole('textbox', {name: 'Name'}).fill(name)
        await this.page.locator('.signup-form').getByRole('textbox', {name: 'Email Address'}).fill(email)
        await this.page.getByRole('button', {name: 'Signup'}).click()
        await expect(this.page.getByText('Email Address already exist!')).toHaveAttribute('style', 'color: red;')
    }


    
}