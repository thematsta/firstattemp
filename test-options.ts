import {test as base} from '@playwright/test';
import { LoginRegisterPage } from './saasPages/loginRegisterPage';

export type TestOptions = {

    globalQaURL: string
    loginPage: string
    loginPageManager: LoginRegisterPage

}

export const test = base.extend<TestOptions>({
    globalQaURL: ['', {option: true}],

    loginPage: async ({page}, use) => {
        await page.goto('/');
        const cookiesPopUP =  page.getByRole('button', {name:'consent'})
        if(await cookiesPopUP.isVisible()){
            await cookiesPopUP.click();
        }else {
            console.log('Element not visible skipping click')
        } 
        await page.getByText('login').click();
        await use('')
        console.log('teardown')
    }, 

    loginPageManager: async ({page, loginPage}, use) =>{
        const loginPageManager = new LoginRegisterPage(page)
        await use(loginPageManager)
    }

});