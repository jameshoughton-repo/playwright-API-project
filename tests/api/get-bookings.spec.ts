import { test, expect } from '@playwright/test';

test('Get all bookings', async ({ request }) => {
  const response = await request.get('/booking');

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.length).toBeGreaterThan(0);
});