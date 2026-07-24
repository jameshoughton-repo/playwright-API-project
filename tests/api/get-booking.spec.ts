import { test, expect } from '@playwright/test';
import bookings from '../../test-data/bookings.json';

interface Booking {
  testCase: string;
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
}

const bookingData: Booking[] = bookings;

bookingData.forEach((booking) => {
  test(`Get booking - ${booking.testCase}`, async ({ request }) => {

    // Arrange - create booking first
    const createResponse = await request.post('/booking', {
      data: booking
    });

    expect(createResponse.status()).toBe(200);

    const createBody = await createResponse.json();
    const bookingId = createBody.bookingid;

    // Act - retrieve booking
    const getResponse = await request.get(`/booking/${bookingId}`);

    expect(getResponse.status()).toBe(200);

    const getBody = await getResponse.json();

    // Assert
    expect(getBody).toMatchObject({
      firstname: booking.firstname,
      lastname: booking.lastname,
      totalprice: booking.totalprice,
      depositpaid: booking.depositpaid,
      bookingdates: booking.bookingdates
    });
  });
});