import { UserData } from '@/entities'
import { UserRepository } from '@/usecases/register-user-on-mailing-list/ports/user-repository'
import { MongoHelper } from './helper/mongo-helper'

export class MongodbUserRepository implements UserRepository {
  async add (user: UserData): Promise<void> {
    const userCollection = MongoHelper.getCollection('users')
    const exists = await this.exists(user)
    if (!exists) {
      await userCollection.insertOne(user)
    }
  }

  async findUserByEmail (email: string): Promise<UserData> {
    const userCollection = MongoHelper.getCollection('users')
    const result = await userCollection.findOne({ email: email })
    return result
  }

  async findAllUsers (): Promise<UserData[]> {
    const userCollection = MongoHelper.getCollection('users')
    return await userCollection.find().toArray()
  }

  async exists (user: UserData): Promise<Boolean> {
    const result = await this.findUserByEmail(user.email)
    if (result != null) {
      if (result.email === user.email) {
        return true
      }
    }
    return false
  }
}
