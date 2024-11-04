
import { LoginRegisterPage } from '../saasPages/loginRegisterPage'
import {test} from '../test-options'




test.beforeEach( async ({page, }) => {
    await page.goto('/')
    const cookiesPopUP =  page.getByRole('button', {name:'consent'})
    if(await cookiesPopUP.isVisible()){
        await cookiesPopUP.click();
    }else {
        console.log('Element not visible skipping click')
    } 
    await page.getByText('Login').click()

});

test.describe('Registration From tests found on the signup/register page @regression ', () => {
    test.only('Enter valid credentials and sign up @smoke', async ({page}) => {
        const loginRegisterPage = new LoginRegisterPage(page);
        await loginRegisterPage.enterNewAccountDetails(process.env.NAME);
        await loginRegisterPage.enterAccountDetailsAndCreateAccount(process.env.PASSWORD);
        await loginRegisterPage.deleteAccount();
    })
    test('Login User with correct email and password', async ({page}) => {
        const loginRegisterPage = new LoginRegisterPage(page);
        await loginRegisterPage.logIntoAccount('mallen@test.com', 'Betfred1');
        await loginRegisterPage.verifyAccountLoggedIn();

    })
    test('Log user out', async ({page}) => {
        const loginRegisterPage = new LoginRegisterPage(page);
        await loginRegisterPage.logIntoAccount('mallen@test.com', 'Betfred1'); 
        
        await loginRegisterPage.logUserOut();

    })

    test('Login with incorrect credentials', async ({page}) => {
        const loginRegisterPage = new LoginRegisterPage(page);
        await loginRegisterPage.logIntoAccount('broken@test.com', 'Betfred11');
        await loginRegisterPage.verifyLoginError();
    
    })
    test('Signup with existing email', async ({page}) => {
        const loginRegisterPage = new LoginRegisterPage(page);
        await loginRegisterPage.signUpWithExistingEmail('matt', 'mallen@test.com');

    });
});