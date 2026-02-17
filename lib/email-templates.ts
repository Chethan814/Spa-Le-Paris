export const getBookingEmailHtml = (data: any) => {
    const { fullName, service, duration, location, date, timeSlot, pricing } = data;
    const total = pricing?.total?.toLocaleString('en-IN') || '0';

    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Reservation Confirmed - Spa Le Paris</title>
        <style>
          body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9f6f2; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
          .header { background-color: #1a1a1a; padding: 40px; text-align: center; }
          .logo { color: #C5A059; font-size: 24px; letter-spacing: 4px; text-transform: uppercase; font-weight: 300; margin: 0; }
          .content { padding: 40px; color: #333333; line-height: 1.6; }
          .greeting { font-size: 20px; color: #1a1a1a; margin-bottom: 24px; }
          .details-box { background-color: #fdfaf7; border: 1px solid #eee1d1; padding: 25px; border-radius: 4px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px solid #f0e6da; padding-bottom: 8px; }
          .detail-label { color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }
          .detail-value { color: #1a1a1a; font-weight: 500; text-align: right; }
          .total-row { display: flex; justify-content: space-between; margin-top: 20px; padding-top: 15px; border-top: 2px solid #C5A059; }
          .total-label { font-weight: bold; color: #1a1a1a; }
          .total-value { font-size: 22px; color: #C5A059; font-weight: bold; }
          .footer { padding: 30px; text-align: center; font-size: 12px; color: #888; background-color: #f9f6f2; }
          .button { display: inline-block; padding: 15px 30px; background-color: #C5A059; color: #ffffff; text-decoration: none; border-radius: 2px; text-transform: uppercase; letter-spacing: 2px; font-size: 14px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="logo">SPA LE PARIS</h1>
          </div>
          <div class="content">
            <div class="greeting">Dear ${fullName},</div>
            <p>Your sanctuary is waiting. We are delighted to confirm your upcoming reservation at Spa Le Paris.</p>
            
            <div class="details-box">
              <div class="detail-row">
                <span class="detail-label">Service</span>
                <span class="detail-value">${service}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Duration</span>
                <span class="detail-value">${duration}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Location</span>
                <span class="detail-value">${location}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Date & Time</span>
                <span class="detail-value">${date} at ${timeSlot}</span>
              </div>
              <div class="total-row">
                <span class="total-label">Estimated Total</span>
                <span class="total-value">₹${total}</span>
              </div>
            </div>

            <p>We look forward to providing you with an unforgettable experience of relaxation and rejuvenation.</p>
            
            <p style="margin-top: 30px;">Warm regards,<br>The Spa Le Paris Team</p>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} Spa Le Paris - Luxury Wellness Sanctuary<br>
            Bangalore | Mangalore
          </div>
        </div>
      </body>
    </html>
  `;
};

export const getFranchiseEmailHtml = (data: any) => {
    const { fullName, email, phone, city, background, interest } = data;

    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Franchise Inquiry - Spa Le Paris</title>
        <style>
          body { font-family: 'Segoe UI', sans-serif; background-color: #f9f6f2; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-top: 4px solid #C5A059; }
          .padding { padding: 40px; }
          .logo { color: #1a1a1a; font-size: 20px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 30px; }
          .details { width: 100%; border-collapse: collapse; margin-top: 20px; }
          .details td { padding: 12px; border-bottom: 1px solid #eee; }
          .label { color: #888; width: 150px; font-size: 12px; text-transform: uppercase; }
          .value { color: #333; font-weight: 500; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="padding">
            <div class="logo">Spa Le Paris</div>
            <h2 style="color: #1a1a1a;">New Franchise Inquiry</h2>
            <p>A new application has been submitted via the website.</p>
            
            <table class="details">
              <tr><td class="label">Full Name</td><td class="value">${fullName}</td></tr>
              <tr><td class="label">Email</td><td class="value">${email}</td></tr>
              <tr><td class="label">Phone</td><td class="value">${phone}</td></tr>
              <tr><td class="label">City</td><td class="value">${city}</td></tr>
              <tr><td class="label">Background</td><td class="value">${background}</td></tr>
            </table>

            <h3 style="margin-top: 30px; font-size: 14px; color: #888; text-transform: uppercase;">Experience & Vision</h3>
            <p style="color: #444; font-style: italic;">"${interest}"</p>
          </div>
        </div>
      </body>
    </html>
  `;
};
