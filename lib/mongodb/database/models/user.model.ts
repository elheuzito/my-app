import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String, required: true },
  access: { type: Boolean, default: false },
  sobre: { type: String , default: '' },
});

export interface IUser extends Document {
  _id: string;
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
  access: boolean;
  sobre: string;
}

const User = models.User || model('User', UserSchema);

export default User;