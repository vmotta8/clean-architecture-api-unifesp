import 'module-alias/register'
import { MongoHelper } from '@/external/repositories/mongodb/helper/mongo-helper'

MongoHelper.connect(process.env.MONGO_URL)
  .then(async () => {
    const app = (
      await import('./config/app')
    ).default
    app.listen(5000, () => {
      console.log('Server started.')
    })
  })
  .catch(console.error)
