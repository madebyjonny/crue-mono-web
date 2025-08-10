import User from '#models/user'
import { LoginValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  async show({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  async store({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(LoginValidator)
    const user = await User.verifyCredentials(data.email, data.password)

    await auth.use('web').login(user)

    return response.redirect().toPath('/')
  }
}
