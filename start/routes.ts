/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const LoginController = () => import('#controllers/auth/login_controller')
const RegistersController = () => import('#controllers/auth/register_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')
const OrganisationsController = () => import('#controllers/organisations_controller')

import User from '#models/user'
import router from '@adonisjs/core/services/router'

router.get('/', async ({ auth, view }) => {
  const authCheck = await auth.check()

  if (!authCheck) {
    return view.render('pages/home', { user: null })
  }

  const userData = await User.findOrFail(auth.user?.id)
  await userData.load('organisations')

  return view.render('pages/home', { user: userData })
})

router
  .group(() => {
    router.get('/register', [RegistersController, 'show']).as('register.show')
    router.post('/register', [RegistersController, 'store']).as('register.store')
    router.get('/login', [LoginController, 'show']).as('login.show')
    router.post('/login', [LoginController, 'store']).as('login.store')

    router.post('/logout', [LogoutController, 'handle']).as('logout')
  })
  .as('auth')

router
  .group(() => {
    router.post('/', [OrganisationsController, 'store']).as('store')
  })
  .as('organisations')
