import { test as base, expect, request } from '@playwright/test';

type ApiFixtures = {
    authToken: string;
};

export const test = base.extend<ApiFixtures>({
    authToken: async ({ }, use) => {
        const apiContext = await request.newContext();

        const loginResponse = await apiContext.post(
            '/auth',
            {
                data: {
                    username: 'admin',
                    password: 'password123'
                },
            }
        );

        const responseBody = await loginResponse.json();

        const token = responseBody.token;

        await use(token);
    },
});

export { expect };