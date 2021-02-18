import { Router } from 'express'
import { makeRegisterUserController } from '@/main/factories'
import { adaptRout } from '../adapters'

export default (router: Router): void => {
  router.post('/register', adaptRout(makeRegisterUserController()))
}
