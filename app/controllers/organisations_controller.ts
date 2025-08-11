// import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class OrganisationsController {
  async store({ request, response, auth }: HttpContext) {
    const { name } = request.only(['name'])

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    const authCheck = await auth.check()

    if (!authCheck) {
      return response.redirect().toPath('/?bad')
    }

    const userData = await User.findOrFail(auth.user?.id)

    if (!userData) {
      return response.status(404).send('User not found')
    }

    const organisation = await userData.related('organisations').create({
      name,
      userId: userData.id,
      slug: slug,
    })

    await organisation.save()
    return response.redirect().toPath('/?good')
  }
}
