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


test('Login User with correct email and password', async ({page}) => {
    const loginRegisterPage = new LoginRegisterPage(page);
    await loginRegisterPage.logIntoAccount('mallen@test.com', 'Betfred1');
    await loginRegisterPage.verifyAccountLoggedIn();

})