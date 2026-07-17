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
  test(`Create booking - ${booking.testCase}`, async ({ request }) => {
    
    const response = await request.post('/booking', {
      data: booking
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.bookingid).toBeDefined();

    expect(body.booking.firstname).toBe(booking.firstname);
    expect(body.booking.lastname).toBe(booking.lastname);
    expect(body.booking.totalprice).toBe(booking.totalprice);
    expect(body.booking.depositpaid).toBe(booking.depositpaid);

    expect(body.booking.bookingdates.checkin)
      .toBe(booking.bookingdates.checkin);

    expect(body.booking.bookingdates.checkout)
      .toBe(booking.bookingdates.checkout);
  });
});