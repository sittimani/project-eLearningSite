import Auth from '../service/auth.service'
const authService = new Auth();

describe('Auth Service', () => {
    it('For denied professor status code should be 401', async() => {
        const result = await authService.professorLogin({ verified: 'pending' })
        expect(result).toEqual({ statusCode: 401, message: 'Your request is not accepted yet!!!' })
    })
})