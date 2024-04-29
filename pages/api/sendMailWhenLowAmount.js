import nodemailer from "nodemailer";
import dbConnect from "../../database/dbConnect";

export default async function sendEmail(req, res) {
  try {
    const { consumable } = req.body;
    await dbConnect();

    let transporter;

    if (req.method === "POST") {
      try {
        transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
          },
          secure: true,
        });
      } catch (error) {
        console.log("Error creating transport:", error);
        return res.status(500).json({ message: "Email transport error" });
      }
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: "Storage minimum amount alert",
      text: `Dear Hallcrew, the amount of item \n\ntitle: ${consumable.title} \n\narticle number: ${consumable.articelNumber} \n\nfrom supplier: ${consumable.supplier} \n\nlocation: ${consumable.location} \n\nhas reached or fallen below the minimum amount. Please take necessary actions.`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
}
