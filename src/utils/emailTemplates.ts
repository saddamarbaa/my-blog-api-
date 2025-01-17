export const sendEmailVerificationTemplate = (link: string, userName: string) => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>email verification</title>
    <meta name="description" content="Reset Password Email ." />
    <style type="text/css">
      a:hover {
        text-decoration: underline !important;
      }
    </style>
  </head>
  <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table
      cellspacing="0"
      border="0"
      cellpadding="0"
      width="100%"
      bgcolor="#f2f3f8"
      style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;"
    >
      <tr>
        <td>
          <table
            style="background-color: #f2f3f8; max-width:670px;  margin:0 auto; margin:auto; font-size: 110%;"
            width="100%"
            border="0"
            align="center"
            cellpadding="0"
            cellspacing="0"
          >
            <tr>
              <td style="height:80px;">&nbsp;</td>
            </tr>
            <tr>
              <td style="text-align:center;">
                <a href="https://rakeshmandal.com" title="logo" target="_blank">
                  <img width="60" src="https://i.ibb.co/hL4XZp2/android-chrome-192x192.png" title="logo" alt="logo" />
                </a>
              </td>
            </tr>
            <tr>
              <td style="height:20px;">&nbsp;</td>
            </tr>
            <tr>
              <td>
                <table
                  width="95%"
                  border="0"
                  align="center"
                  cellpadding="0"
                  cellspacing="0"
                  style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"
                >
                  <tr>
                    <td
                      style="height:40px; text-align: center; text-transform: uppercase;color: teal; padding: 1.3rem; font-weight:500; margin:0;font-size:23px;font-family:'Rubik',sans-serif;"
                    >
                      HI ${userName}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 35px;">
                      <h1
                        style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;"
                      >
                        Confirm Your Email Address
                      </h1>
                      <span
                        style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"
                      ></span>
                      <p style="color:#455056; font-size:15px;">
                        Kindly verify your email to complete your account registration.
                      </p>
                      <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        You are just one step away please click the button below to verify your email. and If you
                        received this email by mistake, simply delete it. You won't be subscribed if you don't click the
                        confirmation link blow.
                      </p>
                      <a
                        href="${link}"
                        style="background:  #1a82e2; text-decoration: none; color: white; padding: 10px 30px; margin: 20px 0; display: inline-block;  border-radius: 6px;"
                      >
                        Confirm email
                      </a>
                      <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        If that doesn't work, copy and paste the following link in your browser:
                      </p>
                      <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        <a href="${link}" target="_blank" style="color: #4A35EA;">${link}</a>
                      </p>
                      <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        If you have any questions, just reply to this email
                        <span style="color: #4A35EA;">
                          saddamarbaa@gmail.com
                        </span>
                        we're always happy to help out.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="height:40px;">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="height:20px;">&nbsp;</td>
            </tr>
            <tr>
              <td style="text-align:center;">
                <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">
                  &copy; <strong>www.saddamarabbaa.com</strong>
                </p>
              </td>
            </tr>
            <tr>
              <td style="height:80px;">&nbsp;</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <!--/100% body table-->
  </body>
</html>
`;

  const content = {
    subject: 'Verify Email Address',
    text: `Click on the link to verify your email address: ${link}`,
    html: htmlContent
  };

  return content;
};

export const sendResetPasswordEmailTemplate = (link: string, userName: string) => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Reset Password Email</title>
    <meta name="description" content="Reset Password Email ." />
    <style type="text/css">
      a:hover {
        text-decoration: underline !important;
      }
    </style>
  </head>
  <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table
      cellspacing="0"
      border="0"
      cellpadding="0"
      width="100%"
      bgcolor="#f2f3f8"
      style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;"
    >
      <tr>
        <td>
          <table
            style="background-color: #f2f3f8; max-width:670px;  margin:0 auto; margin:auto; font-size: 110%;"
            width="100%"
            border="0"
            align="center"
            cellpadding="0"
            cellspacing="0"
          >
            <tr>
              <td style="height:80px;">&nbsp;</td>
            </tr>
            <tr>
              <td style="text-align:center;">
                <a href="https://rakeshmandal.com" title="logo" target="_blank">
                  <img width="60" src="https://i.ibb.co/hL4XZp2/android-chrome-192x192.png" title="logo" alt="logo" />
                </a>
              </td>
            </tr>
            <tr>
              <td style="height:20px;">&nbsp;</td>
            </tr>
            <tr>
              <td>
                <table
                  width="95%"
                  border="0"
                  align="center"
                  cellpadding="0"
                  cellspacing="0"
                  style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"
                >
                  <tr>
                    <td
                      style="height:40px; text-align: center; text-transform: uppercase;color: teal; padding: 1.3rem; font-weight:500; margin:0;font-size:23px;font-family:'Rubik',sans-serif;"
                    >
                      HI ${userName}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 35px;">
                      <h1
                        style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;"
                      >
                        You have requested to reset your password
                      </h1>
                      <span
                        style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"
                      ></span>
                      <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        We cannot simply send you your old password. A unique link to reset your password has been
                        generated for you. To reset your password, Please click the following link and follow the
                        instructions. and If you did not request this, please ignore this email and your password will
                        remain unchanged.
                      </p>
                      <a
                        href=${link}
                        style="background: crimson; text-decoration: none; color: white; padding: 10px 30px; margin: 20px 0; display: inline-block;  border-radius: 6px;"
                      >
                        Reset Password
                      </a>
                       <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        If that doesn't work, copy and paste the following link in your browser:
                      </p>
                      <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        <a href="${link}" target="_blank" style="color: #4A35EA;"
                          >${link}</a
                        >
                      </p>
                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        If you have any questions, just reply to this email
                        <span style="color: #4A35EA;">
                          saddamarbaa@gmail.com
                        </span>
                        we're always happy to help out.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="height:40px;">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="height:20px;">&nbsp;</td>
            </tr>
            <tr>
              <td style="text-align:center;">
                <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">
                  &copy; <strong>www.saddamarabbaa.com</strong>
                </p>
              </td>
            </tr>
            <tr>
              <td style="height:80px;">&nbsp;</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <!--/100% body table-->
  </body>
</html>
`;

  const content = {
    subject: 'Password Change Request',
    text: `Click on the link to rest your password: ${link}`,
    html: htmlContent
  };

  return content;
};

export const sendConfirmResetPasswordEmailTemplate = (link: string, userName: string) => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Reset Password Email</title>
    <meta name="description" content="Reset Password Email ." />
    <style type="text/css">
      a:hover {
        text-decoration: underline !important;
      }
    </style>
  </head>
  <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table
      cellspacing="0"
      border="0"
      cellpadding="0"
      width="100%"
      bgcolor="#f2f3f8"
      style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;"
    >
      <tr>
        <td>
          <table
            style="background-color: #f2f3f8; max-width:670px;  margin:0 auto; margin:auto; font-size: 110%;"
            width="100%"
            border="0"
            align="center"
            cellpadding="0"
            cellspacing="0"
          >
            <tr>
              <td style="height:80px;">&nbsp;</td>
            </tr>
            <tr>
              <td style="text-align:center;">
                <a href="https://rakeshmandal.com" title="logo" target="_blank">
                  <img width="60" src="https://i.ibb.co/hL4XZp2/android-chrome-192x192.png" title="logo" alt="logo" />
                </a>
              </td>
            </tr>
            <tr>
              <td style="height:20px;">&nbsp;</td>
            </tr>
            <tr>
              <td>
                <table
                  width="95%"
                  border="0"
                  align="center"
                  cellpadding="0"
                  cellspacing="0"
                  style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"
                >
                  <tr>
                    <td
                      style="height:40px; text-align: center; text-transform: uppercase;color: teal; padding: 1.3rem; font-weight:500; margin:0;font-size:23px;font-family:'Rubik',sans-serif;"
                    >
                      HI ${userName}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 35px;">
                      <h1
                        style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;"
                      >
                        Password Reset Success
                      </h1>
                      <span
                        style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"
                      ></span>
                      <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        Your password has been Successfully updated
                      </p>
                      <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        We're excited to have you get started Just press the button below to login
                      </p>
                      <a
                        href="${link}"
                        style="background:  #3385ff; text-decoration: none; color: white; padding: 10px 30px; margin: 20px 0; display: inline-block;  border-radius: 6px;"
                      >
                        Login
                      </a>
                      <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        If that doesn't work, copy and paste the following link in your browser:
                      </p>
                      <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        <a href="${link}" target="_blank" style="color: #4A35EA;"
                          >${link}</a
                        >
                      </p>
                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        If you have any questions, just reply to this email
                        <span style="color: #4A35EA;">
                          saddamarbaa@gmail.com
                        </span>
                        we're always happy to help out.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="height:40px;">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="height:20px;">&nbsp;</td>
            </tr>
            <tr>
              <td style="text-align:center;">
                <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">
                  &copy; <strong>www.saddamarabbaa.com</strong>
                </p>

              </td>
            </tr>
            <tr>
              <td style="height:80px;">&nbsp;</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <!--/100% body table-->
  </body>
</html>
`;

  const content = {
    subject: 'Password Reset Success',
    text: `Click on the link to login: ${link}`,
    html: htmlContent
  };

  return content;
};

export const sendNewsletterConfirmationTemplate = (verifyEmailLink: string) => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Newsletter Subscription Confirmation</title>
    <meta name="description" content="Confirm your newsletter subscription." />
    <style type="text/css">
      a:hover {
        text-decoration: underline !important;
      }
    </style>
  </head>
  <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table
      cellspacing="0"
      border="0"
      cellpadding="0"
      width="100%"
      bgcolor="#f2f3f8"
      style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;"
    >
      <tr>
        <td>
          <table
            style="background-color: #f2f3f8; max-width:670px;  margin:0 auto; margin:auto; font-size: 110%;"
            width="100%"
            border="0"
            align="center"
            cellpadding="0"
            cellspacing="0"
          >
            <tr>
              <td style="height:80px;">&nbsp;</td>
            </tr>
            <tr>
              <td style="text-align:center;">
                <a href="https://yourwebsite.com" title="logo" target="_blank">
                  <img width="60" src="https://i.ibb.co/hL4XZp2/android-chrome-192x192.png" title="logo" alt="logo" />
                </a>
              </td>
            </tr>
            <tr>
              <td style="height:20px;">&nbsp;</td>
            </tr>
            <tr>
              <td>
                <table
                  width="95%"
                  border="0"
                  align="center"
                  cellpadding="0"
                  cellspacing="0"
                  style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"
                >
                  <tr>
                    <td
                      style="height:40px; text-align: center; text-transform: uppercase;color: teal; padding: 1.3rem; font-weight:500; margin:0;font-size:23px;font-family:'Rubik',sans-serif;"
                    >
                      Welcome to our Newsletter!
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 35px;">
                      <h1
                        style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;"
                      >
                        Confirm Your Subscription
                      </h1>
                      <span
                        style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"
                      ></span>
                      <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        Thank you for subscribing to our newsletter. Please confirm your subscription by clicking the button below.
                      </p>
                      <a
                        href="${verifyEmailLink}"
                        style="background:  #3385ff; text-decoration: none; color: white; padding: 10px 30px; margin: 20px 0; display: inline-block;  border-radius: 6px;"
                      >
                        Confirm Subscription
                      </a>
                      <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        If the button doesn't work, copy and paste the following link in your browser:
                      </p>
                      <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        <a href="${verifyEmailLink}" target="_blank" style="color: #4A35EA;">${verifyEmailLink}</a>
                      </p>
                      <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        If you have any questions, feel free to reply to this email at <span style="color: #4A35EA;">your-email@example.com</span>.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="height:40px;">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="height:20px;">&nbsp;</td>
            </tr>
            <tr>
              <td style="text-align:center;">
                <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">
                  &copy; <strong>www.yourwebsite.com</strong>
                </p>
              </td>
            </tr>
            <tr>
              <td style="height:80px;">&nbsp;</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <!--/100% body table-->
  </body>
</html>
`;

  const content = {
    subject: 'Confirm Your Newsletter Subscription',
    text: `Please confirm your subscription by clicking the link: ${verifyEmailLink}`,
    html: htmlContent
  };

  return content;
};
