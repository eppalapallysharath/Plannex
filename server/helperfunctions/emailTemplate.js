exports.signupTemplateForOrganizer = (name) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to Plannex</title>
  </head>
  <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f6f8;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px 0;">
      <tr>
        <td align="center">
          
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="background:#4f46e5; padding:20px; text-align:center; color:#ffffff; font-size:24px; font-weight:bold;">
                Plannex
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px;">
                <h2 style="margin-top:0; color:#333;">Welcome, ${name} 👋</h2>
                
                <p style="color:#555; line-height:1.6;">
                  Thank you for signing up for <strong>Plannex</strong> – your all-in-one event management platform.
                </p>

                <p style="color:#555; line-height:1.6;">
                  You can now:
                </p>

                <ul style="color:#555; line-height:1.6; padding-left:20px;">
                  <li>Create and manage events</li>
                  <li>Register for exciting events</li>
                  <li>Explore organizers and activities</li>
                </ul>

                <!-- CTA Button -->
                <div style="text-align:center; margin:30px 0;">
                  <a href="https://your-frontend-url.com"
                     style="background:#4f46e5; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:5px; display:inline-block;">
                    Get Started
                  </a>
                </div>

                <p style="color:#555; line-height:1.6;">
                  If you have any questions, feel free to reach out to our support team.
                </p>

                <p style="color:#555;">
                  Cheers,<br/>
                  <strong>Plannex Team</strong>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f4f6f8; padding:15px; text-align:center; font-size:12px; color:#888;">
                © ${new Date().getFullYear()} Plannex. All rights reserved.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};


exports.signupTemplateForParticipants = (name) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to Plannex</title>
  </head>
  <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f6f8;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px 0;">
      <tr>
        <td align="center">
          
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="background:#4f46e5; padding:20px; text-align:center; color:#ffffff; font-size:24px; font-weight:bold;">
                Plannex
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px;">
                <h2 style="margin-top:0; color:#333;">Welcome, ${name} 👋</h2>
                
                <p style="color:#555; line-height:1.6;">
                  Thank you for signing up for <strong>Plannex</strong> – your all-in-one event management platform.
                </p>

                <p style="color:#555; line-height:1.6;">
                  You can now:
                </p>

                <ul style="color:#555; line-height:1.6; padding-left:20px;">
                <li>Explore organizers and events</li>
                  <li>Register for exciting events</li>
                </ul>

                <!-- CTA Button -->
                <div style="text-align:center; margin:30px 0;">
                  <a href="https://your-frontend-url.com"
                     style="background:#4f46e5; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:5px; display:inline-block;">
                    Get Started
                  </a>
                </div>

                <p style="color:#555; line-height:1.6;">
                  If you have any questions, feel free to reach out to our support team.
                </p>

                <p style="color:#555;">
                  Cheers,<br/>
                  <strong>Plannex Team</strong>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f4f6f8; padding:15px; text-align:center; font-size:12px; color:#888;">
                © ${new Date().getFullYear()} Plannex. All rights reserved.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};


exports.eventRegistrationTemplate = ( name, eventTitle, eventDate, eventLocation ) => {
  return `
  <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
    
    <div style="max-width:600px; margin:auto; background:#ffffff; padding:20px; border-radius:6px;">
      
      <h2 style="margin-top:0; color:#333;">Registration Confirmed 🎉</h2>
      
      <p style="color:#555;">
        Hi ${name},
      </p>

      <p style="color:#555;">
        You have successfully registered for the event:
      </p>

      <div style="background:#f9fafb; padding:15px; border-radius:5px; margin:15px 0;">
        <p style="margin:5px 0;"><strong>Event:</strong> ${eventTitle}</p>
        <p style="margin:5px 0;"><strong>Date:</strong> ${eventDate}</p>
        <p style="margin:5px 0;"><strong>Location:</strong> ${eventLocation}</p>
      </div>

      <p style="color:#555;">
        We look forward to seeing you there!
      </p>

      <p style="color:#555;">
        — Plannex Team
      </p>

    </div>

  </div>
  `;
};