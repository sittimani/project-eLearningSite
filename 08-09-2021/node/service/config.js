module.exports = {
    statusCode: {
        ok: 200,
        notFound: 404,
        unauthorized: 401,
        serverIssue: 500,
        alreadyExists: 409
    },
    message: {
        success: "Operation successfully completed",
        notFound: "Item Not Found !!!",
        serverIssue: "Internal Server Problem !!!",
        alreadyExists: "Data Already Exists",
        denied: "Your request to become professor is rejected by our admin team !!!",
        pending: "Your request is not accepted yet!!!",
        misMatch: "Invalid password !!!",
        emailNotVerifed: "Your email is not verified yet",
        updated: "Successfully Updated !!!",
        noQuestion: "No Data Found"
    }
}