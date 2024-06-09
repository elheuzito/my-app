import { Schema, model, models, Document } from 'mongoose'

export interface IOrder extends Document {
  _id: string
  eventTitle: string
  description: string
  event: {
    _id: string
    title: string
    imageUrl: string
    location: string
  }
  buyer: {
    _id: string
    firstName: string
    lastName: string
  }
  present: boolean
}

export type IOrderItem = {
  _id: string
  createdAt: Date
  eventTitle: string
  eventId: string
  buyer: string
  present: boolean
}

const OrderSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  eventTitle: {
    type: String,
    required: true,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  present:{
    type: Boolean,
    required: true,
    default: true
  }
})

const Order = models.Order || model('Order', OrderSchema)

export default Order