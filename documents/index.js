
module.exports = ({ jobId, title, description, duration, location, date, assignedVolunteer }) => {
    const today = new Date().toLocaleString();
    return `
      <html>
          <head>
              <style>
                  body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: auto; border: 2px solid #000; text-align: center; }
                  .header img { width: 120px; height: auto; margin-top: 20px; }
                  .title { font-size: 28px; font-weight: bold; margin: 20px 0; text-decoration: underline; }
                  .content { font-size: 18px; line-height: 1.6; margin: 20px 40px; text-align: left; }
                  .footer { margin-top: 30px; font-size: 14px; color: gray; }
                  .signature { margin-top: 50px; font-size: 16px; font-style: italic; }
              </style>
          </head>
          <body>
              <div class="header">
                  <img src="https://img.freepik.com/free-vector/gradient-ss-logo-template_23-2149245206.jpg" alt="Company Logo">
              </div>
              <div class="title">Certificate of Completion</div>
              <div class="content">
                  <p>This is to certify that <strong>${assignedVolunteer}</strong> has successfully completed the volunteer job titled <strong>"${title}"</strong>.</p>
                  <p><strong>Description:</strong> ${description}</p>
                  <p><strong>Duration:</strong> ${duration}</p>
                  <p><strong>Location:</strong> ${location}</p>
                  <p><strong>Date:</strong> ${date}</p>
                  <p><strong>Job ID:</strong> ${jobId}</p>
                  <p><strong>Issued on:</strong> ${today}</p>
              </div>
              <div class="signature">Authorized Signature: ___________________</div>
              <div class="footer">
                  Thank you for your service! <br>
                  © 2025 Volunteer Organization. All Rights Reserved.
              </div>
          </body>
      </html>
      `;
};



// module.exports = ({jobId,title,description}) => {
//     const today = new Date().toLocaleString();
//     return `
//       <html>
//           <head>
//               <style>
//                   body { font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; }
//                   .header { text-align: center; margin-bottom: 20px; }
//                   .header img { width: 100px; height: auto; }
//                   .title { text-align: center; font-size: 24px; font-weight: bold; margin-top: 10px; }
//                   .content { margin-top: 20px; font-size: 16px; }
//                   .content p { margin: 8px 0; }
//                   .footer { text-align: center; margin-top: 30px; font-size: 12px; color: gray; }
//               </style>
//           </head>
//           <body>
//               <div class="header">
//                   <img src="https://img.freepik.com/free-vector/gradient-ss-logo-template_23-2149245206.jpg" alt="Company Logo">
//               </div>
//               <div class="title">Receipt</div>
//               <div class="content">
//                   <p><strong>Name:</strong> ${name}</p>
//                   <p><strong>Age:</strong> ${age}</p>
//                   <p><strong>Price:</strong> $${price}</p>
//                   <p><strong>Receipt ID:</strong> ${receiptId}</p>
//                   <p><strong>Date & Time:</strong> ${today}</p>
//               </div>
//               <div class="footer">
//                   Thank you for your purchase! <br>
//                   © 2025 MNZ. All Rights Reserved.
//               </div>
//           </body>
//       </html>
//       `;
//   };
  