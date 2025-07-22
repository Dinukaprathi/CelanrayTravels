import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const {
      fullName,
      email,
      phone,
      services,
      travelDates,
      numberOfTravelers,
      preferences,
      additionalDetails
    } = await request.json();

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      },
    });

    // Email content
    const mailOptions = {
      from: `"Travel Enquiry" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Travel Enquiry from ${fullName}`,
      html: `
        <h1>New Travel Enquiry</h1>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Services Required:</strong> ${services.join(', ')}</p>
        <p><strong>Travel Dates:</strong></p>
        <p>Arrival: ${travelDates.arrival}</p>
        <p>Departure: ${travelDates.departure}</p>
        <p><strong>Number of Travelers:</strong> ${numberOfTravelers}</p>
        <p><strong>Preferences:</strong> ${preferences}</p>
        <p><strong>Additional Details:</strong></p>
        <p>${additionalDetails}</p>
      `,
      replyTo: email
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'Enquiry successfully sent!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: unknown) {
    console.error('Error sending enquiry:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ message: 'Failed to send enquiry', error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 