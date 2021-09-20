module.exports = {
    verificationMail: (id) => {
        const data = `
Hi,

Greetings.

Thanks for register with iLearn. You need to verify you account before logging in. Please click the following link to verify.

http://localhost:8080/verifyUser/${id}`
        return data
    }, 

    newPassword: (id) => {
        const data = `
Hi,

Greetings.

Your iLearn Password was successfully reseted. You can use the following password to login to your account.

password: ${id}`

        return data
    }
}