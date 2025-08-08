function emailTemplate({
  title,
  greeting,
  message,

}: {
  title: string;
  greeting: string;
  message: string;
  
}) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
      <img src="https://university-library-blue.vercel.apppublic/icons/logo.svg" alt="App Logo" style="height: 60px; margin-bottom: 24px;" />
      <h2>${title}</h2>
      <p>${greeting}</p>
      <p>${message}</p>
      
      <p style="margin-top: 32px;">Keep the pages turning,<br/>The BookWise Team</p>
    </div>
  `;
}
//D:\Ali\programming\backend\framework\Next-js\project\public\icons\logo.svg

const html = emailTemplate({
  title: "Your BookWise Account Has Been Approved!",
  greeting: "Hi John,",
  message: "Congratulations! Your BookWise account has been approved. You can now browse our library, borrow books, and enjoy all the features of your new account.:",
 
});