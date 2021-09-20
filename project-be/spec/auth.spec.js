const Auth = require('../service/auth.service');
const AuthService = new Auth();

describe("Auth Service", () => {
    it("For denied professor status code should be 401", async() => {
        const data = {
            accessToken: "123",
            user: {
                users: {
                    _id: "123",
                    name: "mani",
                    role: {
                        readDocument: false
                    }
                }
            }
        }
        spyOn(AuthService, 'getMyToken').and.callFake(() => {
            return of({ statusCode: 200, message: data })
        })
        const result = await AuthService.professorLogin({ verified: "pending" })
        expect(result).toEqual({ statusCode: 401, message: "Your request is not accepted yet!!!" })
    })
})