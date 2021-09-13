module.exports = {
    statusCode: {
        ok: 200,
        badRequest: 400,
        notFound: 404,
        unauthorized: 401,
        serverIssue: 500,
        alreadyExists: 409
    },
    message: {
        success: "successfully request Completed !!!",
        notFound: "Item Not Found !!!",
        noUserFound: "No user Found",
        resetPassword: "Password reseted successfully, check mail for new password",
        samePassword: "Both old and new password is same, try some other password !!!",
        passwordChanged: "Successfully Password Changed",
        unauthorized: "Unauthorized access !!!",
        invalidToken: "Invalid token",
        serverIssue: "Internal Server Problem !!!",
        alreadyExists: "Data Already Exists",
        denied: "Your request to become professor is rejected by our admin team !!!",
        pending: "Your request is not accepted yet!!!",
        misMatch: "Invalid password !!!",
        emailNotVerifed: "Your email is not verified yet",
        updated: "Successfully Updated !!!",
        noQuestion: "No Data Found",
        courseCreated: "Successfully Course Created !!!",
        deleted: "Deleted Successfully !!!",
        dbError: "Our DB seams to be unreachable, try after sometime !!!"
    },
    dbError: {statusCode: 500, message: "Our DB seams to be unreachable, try after sometime !!!"}
}