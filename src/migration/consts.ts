import { v4 as uuidv4 } from 'uuid'
const bcrypt = require('bcryptjs')

export const admin = {
  username: 'administrator',
  email: 'liza.kor142001@gmail.com',
  password: bcrypt.hashSync('iamadmin', 5),
  activationKey: uuidv4(),
  is_activated: true,
  role_id: 3
}
