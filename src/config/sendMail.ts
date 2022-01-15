import nodemailer from 'nodemailer'

const sendMail = async (to: string, url: string, txt: string) => {
  try {
    const testAccount = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    })

    // send mail with defined transport object
    const mailOptions = {
      from: '"BlogDemo 👻" <no-reply@blogdemo.com>', // sender address
      to, // list of receivers
      subject: 'BLog Demo', // Subject line
      html: `
    <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
    <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to Blog Demo</h2>
    <p>Congratulations! You're almost set to start using BlogDemo.
        Just click the button below to validate your email address.
    </p>
    
    <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>

    <p>If the button doesn't work for any reason, you can also click on the link below:</p>

    <div>${url}</div>
    </div>
  `,
    }

    const result = await transporter.sendMail(mailOptions)

    console.log('Message sent: %s', result.messageId)
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(result))
    return result
  } catch (error) {
    console.log(error)
  }
}

export default sendMail
