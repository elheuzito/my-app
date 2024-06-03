"use server"

import { CheckoutOrderParams, CreateOrderParams, GetOrdersByEventParams, GetOrdersByUserParams } from "@/types"
import { connectToDatabase } from "../mongodb/database";
import Order from "../mongodb/database/models/order.model";
import { ObjectId } from "mongodb";
import { handleError } from "../utils";
import User from "../mongodb/database/models/user.model";
import Event from "../mongodb/database/models/event.model";
import mongoose from "mongoose";
import { deleteEvent } from "./event.actions";

export const createOrder = async (order: CreateOrderParams) => {
    try {
        await connectToDatabase();
        const newOrder = await Order.create({
            ...order,
            event: order.eventId,
            buyer: order.buyerId,
        });

        return JSON.parse(JSON.stringify(newOrder));
    } catch (error) {
        throw error;
    }
}

export async function getOrderById(orderId: string) {
  try {
    await connectToDatabase();

    if (!orderId) throw new Error('Order ID is required');

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      throw new Error('Invalid Order ID');
    }

    const objectId = new mongoose.Types.ObjectId(orderId);
    const order = await Order.findOne({ _id: objectId }).sort({ createdAt: 'desc' });

    if (!order) throw new Error('Order not found');
    
    return { data: JSON.parse(JSON.stringify(order)) };
  } catch (error) {
    handleError(error);
  }
}

export async function getOrdersByEvent({ searchString, eventId }: GetOrdersByEventParams) {
    try {
      await connectToDatabase()
  
      if (!eventId) throw new Error('Event ID is required')
      const eventObjectId = new ObjectId(eventId)
  
      const orders = await Order.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'buyer',
            foreignField: '_id',
            as: 'buyer',
          },
        },
        {
          $unwind: '$buyer',
        },
        {
          $lookup: {
            from: 'events',
            localField: 'event',
            foreignField: '_id',
            as: 'event',
          },
        },
        {
          $unwind: '$event',
        },
        {
          $project: {
            _id: 1,
            totalAmount: 1,
            createdAt: 1,
            eventTitle: '$event.title',
            eventId: '$event._id',
            buyer: {
              $concat: ['$buyer.firstName', ' ', '$buyer.lastName'],
            },
          },
        },
        {
          $match: {
            $and: [{ eventId: eventObjectId }, { buyer: { $regex: RegExp(searchString, 'i') } }],
          },
        },
      ])
  
      return JSON.parse(JSON.stringify(orders))
    } catch (error) {
      handleError(error)
    }
  }
  
  // GET ORDERS BY USER
  export async function getOrdersByUser({ userId, limit = 3, page }: GetOrdersByUserParams) {
    try {
      await connectToDatabase()
  
      const skipAmount = (Number(page) - 1) * limit
      const conditions = { buyer: userId }
  
      const orders = await Order.distinct('event._id')
        .find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)
        .populate({
          path: 'event',
          model: Event,
          populate: {
            path: 'organizer',
            model: User,
            select: '_id firstName lastName',
          },
        })
  
      const ordersCount = await Order.distinct('event._id').countDocuments(conditions)
  
      return { data: JSON.parse(JSON.stringify(orders)), totalPages: Math.ceil(ordersCount / limit) }
    } catch (error) {
      handleError(error)
    }
  }

  // FUNÇÃO DE APAGAR

  interface DeleteEventParams {
    eventId: string;
    path?: string;
  }
  export async function deleteOrdersByEvent(eventId: string, session: mongoose.ClientSession | null = null) {
    try {
      await connectToDatabase()
      
      const conditions = { event: eventId }
      
      const result = await Order.deleteMany(conditions).session(session)
      
      return { success: true, deletedCount: result.deletedCount }
    } catch (error) {
      handleError(error)
      return { success: false}
    }
  }
  
export async function deleteOrdersAndEvent(eventId: string, path: string) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const deleteOrdersResult = await deleteOrdersByEvent(eventId, session);
    if (!deleteOrdersResult.success) {
      throw new Error(`Failed to delete orders for event ${eventId}`);
    }

    const deleteEventResult = await deleteEvent(eventId, session);

    await session.commitTransaction();
    return { success: true };
  } catch (error) {
    await session.abortTransaction();
    return { success: false };
  } finally {
    session.endSession();
  }
}
