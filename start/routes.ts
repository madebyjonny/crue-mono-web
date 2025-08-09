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
import router from '@adonisjs/core/services/router'

router.get('/', async ({ auth, view }) => {
  await auth.check()
  return view.render('pages/home')
})

router
  .group(() => {
    router.get('/register', [RegistersController, 'show']).as('register.show')
    router.post('/register', [RegistersController, 'store']).as('register.store')
    router.get('/login', [LoginController, 'show']).as('login.show')
    router.post('/login', [LoginController, 'store']).as('login.store')
  })
  .as('auth')
