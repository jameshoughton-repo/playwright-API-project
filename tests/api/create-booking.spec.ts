import { test, expect } from '@playwright/test';

test('Create a new booking', async ({ request }) => {
    const response = await request.post('/booking', {
        data: {
            firstname: 'Test',
            lastname: 'User',
            totalprice: 500,
            depositpaid: true,
            bookingdates: {
                checkin: '2023-01-01',
                checkout: '2023-01-02'
            }
        }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
    expect(body.bookingid).toBeDefined();
    expect(body.booking.firstname).toBe('Test');
});
