import { test } from '@playwright/test';
import { ContactUsPage } from '../saasPages/contactUsPage';

test.beforeEach( async ({page}) => {
    await page.goto('/')
    const cookiesPopUP =  page.getByRole('button', {name:'consent'})
    if(await cookiesPopUP.isVisible()){
        await cookiesPopUP.click();
    }else {
        console.log('Element not visible skipping click')
    await page.waitForLoadState('networkidle')
    } 

});

test.describe('Tests for the Contact Us page', () => {

    test('Submit Contact Us Form', async ({ page }) => {

        const contactUs = new ContactUsPage(page);

        // Step 1: Navigate to and verify the Contact Us page
        await contactUs.navigateAndVerifyContactUsPage();
        await contactUs.enterMessaqgeInContactUs('matt', 'mallen@test.com');
        
        
    });

});