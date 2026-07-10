import { test, expect } from '@playwright/test';

test('update an existing booking', async ({ request }) => {

  // Generate token
  const authResponse = await request.post('/auth', {
    data: {
      username: 'admin',
      password: 'password123'
    }
  });

  const authBody = await authResponse.json();
  const token = authBody.token;

  // Create booking
  const createResponse = await request.post('/booking', {
    data: {
      firstname: 'Jim',
      lastname: 'Brown',
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: '2025-07-10',
        checkout: '2025-07-15'
      },
      additionalneeds: 'Breakfast'
    }
  });

  const createBody = await createResponse.json();
  const bookingId = createBody.bookingid;

  // Update booking
  const updateResponse = await request.put(`/booking/${bookingId}`, {
    headers: {
      Cookie: `token=${token}`
    },
    data: {
      firstname: 'James',
      lastname: 'Houghton',
      totalprice: 999,
      depositpaid: false,
      bookingdates: {
        checkin: '2025-08-01',
        checkout: '2025-08-10'
      },
      additionalneeds: 'Lunch'
    }
  });

  expect(updateResponse.status()).toBe(200);

  // Verify persisted data
  const getResponse = await request.get(`/booking/${bookingId}`);
  const booking = await getResponse.json();

  expect(booking.firstname).toBe('James');
  expect(booking.lastname).toBe('Houghton');
  expect(booking.totalprice).toBe(999);
});