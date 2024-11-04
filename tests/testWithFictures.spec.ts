import { test } from '../test-options'




test.describe('Registration From tests found on the signup/register page ', () => {
    test('Enter valid credentials and sign up', async ({loginPageManager}) => {
        await loginPageManager.enterNewAccountDetails(process.env.NAME);
        await loginPageManager.enterAccountDetailsAndCreateAccount(process.env.PASSWORD);
        await loginPageManager.deleteAccount();
    });
});