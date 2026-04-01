export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Talketive</title>
  </head>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">

    <!-- Header -->
    <div style="background: linear-gradient(to right, #4f46e5, #6366f1); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
      <img src="https://cdn-icons-png.flaticon.com/512/134/134914.png" alt="Talketive Logo" style="width: 80px; height: 80px; margin-bottom: 20px; border-radius: 50%; background-color: white; padding: 10px;">
      <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 500;">Welcome to Talketive</h1>
    </div>

    <!-- Body -->
    <div style="background-color: #ffffff; padding: 35px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
      <p style="font-size: 18px; color: #4f46e5;"><strong>Hello ${name},</strong></p>

      <p>Welcome to Talketive. Your new space for real time conversations, clean UI, and smooth messaging. You can now chat with anyone instantly and enjoy a modern communication experience.</p>

      <div style="background-color: #f8f9fa; padding: 25px; border-radius: 10px; margin: 25px 0; border-left: 4px solid #4f46e5;">
        <p style="font-size: 16px; margin: 0 0 15px 0;"><strong>Here is what you can do:</strong></p>
        <ul style="padding-left: 20px; margin: 0;">
          <li style="margin-bottom: 10px;">Set your profile picture</li>
          <li style="margin-bottom: 10px;">Search and connect with people</li>
          <li style="margin-bottom: 10px;">Start real time conversations</li>
          <li style="margin-bottom: 0;">Share messages instantly</li>
        </ul>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${clientURL}" style="background: linear-gradient(to right, #4f46e5, #6366f1); color: white; text-decoration: none; padding: 12px 30px; border-radius: 50px; font-weight: 500; display: inline-block;">Open Talketive</a>
      </div>

      <p style="margin-bottom: 5px;">If you have any questions, feel free to reach out anytime.</p>
      <p style="margin-top: 0;">Enjoy chatting.</p>

      <p style="margin-top: 25px; margin-bottom: 0;">Best regards,<br>The Talketive Team</p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
      <p>© 2025 Talketive. All rights reserved.</p>
      <p>
        <a href="#" style="color: #4f46e5; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
        <a href="#" style="color: #4f46e5; text-decoration: none; margin: 0 10px;">Terms of Service</a>
        <a href="#" style="color: #4f46e5; text-decoration: none; margin: 0 10px;">Support</a>
      </p>
    </div>

  </body>
  </html>
  `;
}
