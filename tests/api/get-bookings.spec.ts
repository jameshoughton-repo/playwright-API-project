import { test, expect } from '@playwright/test';

test('Get all bookings', async ({ request }) => {
  const response = await request.get('/booking');

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.length).toBeGreaterThan(0);

  expect(body[0]).toHaveProperty('bookingid');

  console.log(await response.json());
});

test('Get booking by ID', async ({ request }) => {
  const response = await request.get('/booking/1');

  expect(response.status()).toBe(200);

  console.log(await response.json());

  const booking = await response.json();

  expect(booking.firstname).toBeDefined();

  expect(booking.lastname).toBeDefined();

});
