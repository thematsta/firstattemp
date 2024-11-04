import {test} from "@playwright/test";
import { faker } from '@faker-js/faker';


export class AccountCreationHelper{
    generateRandomEmail(): string {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        const usernameLength = 10;
        let username = '';
        
        for (let i = 0; i < usernameLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            username += characters[randomIndex];
        }

        const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'example.com'];
        const randomDomain = domains[Math.floor(Math.random() * domains.length)];

        return `${username}@${randomDomain}`;
    }

    async createRandomUsers() {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email()
            
        }
    }
}