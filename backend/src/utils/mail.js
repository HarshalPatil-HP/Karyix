import Mailgen from "mailgen";

const emailVerificationContend=(username,verifyUrl)=>{
    return{
        body: {
        name: username,
        intro: 'Welcome to our Website! Were very excited to have you on board.',
        action: {
            instructions: 'To get started with Verify, please click here:',
            button: {
                color: '#22BC66', 
                text: 'Verify your account',
                link: verifyUrl
            }
        },
        outro: 'Need help, or have questions? Just reply to this email, we love to help.'
       }
    }
}

const forgotPasswordContend=(username,passwordUrl)=>{
    return{
        body: {
        name: username,
        intro: 'Welcome to our Website!',
        action: {
            instructions: 'To change Your Password, please click here:',
            button: {
                color: '#22BC66', 
                text: 'Change  your  password',
                link: passwordUrl
            }
        },
        outro: 'Need help, or have questions? Just reply to this email, we love to help.'
       }
    }
}

export {
    emailVerificationContend,
    forgotPasswordContend
}
