import { OrderStatus, Role } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

interface OrderPayload {
  items: {
    mealId: string;
    quantity: number;
  }[];
  address: string;
}

const createOrderIntoDB = async (
  payload: OrderPayload,
  userId: string
) => {

  //1. user exists
  //2. user is customer
  //3. address is provided
  //4. items are provided
  //5. quantity > 0
  //6. meal exists and is available
  //7. all meals are from same provider
  //8. calculate total price
  //9. create order and order items in transaction

  // 1️⃣ Validate user
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.role !== Role.CUSTOMER) {
    throw new Error("Only customers can place orders");
  }

  // 2️⃣ Validate address
  if (!payload.address || payload.address.trim() === "") {
    throw new Error("Delivery address is required");
  }

  // 3️⃣ Validate items
  if (!payload.items || payload.items.length === 0) {
    throw new Error("Order must contain at least one meal");
  }

  // Check quantity
  payload.items.forEach((item) => {
    if (item.quantity <= 0) {
      throw new Error("Quantity must be greater than zero");
    }
  });

  // Prevent duplicate mealId
  const mealIds = payload.items.map((item) => item.mealId);
  const uniqueMealIds = new Set(mealIds);

  if (uniqueMealIds.size !== mealIds.length) {
    throw new Error("Duplicate meals are not allowed");
  }

  // 4️⃣ Fetch meals
  const meals = await prisma.meal.findMany({
    where: {
      id: { in: mealIds },
      isAvailable: true,
    },
  });

  if (meals.length !== payload.items.length) {
    throw new Error("Some meals are invalid or unavailable");
  }

  // 5️⃣ Ensure same provider
  const providerId = meals[0].providerId;

  const allSameProvider = meals.every(
    (meal) => meal.providerId === providerId
  );

  if (!allSameProvider) {
    throw new Error("All meals must be from same provider");
  }

  // 6️⃣ Calculate total price
  let totalPrice = 0;

  const orderItemsData = payload.items.map((item) => {
    const meal = meals.find((m) => m.id === item.mealId)!;

    const itemTotal = meal.price * item.quantity;

    totalPrice += itemTotal;

    return {
      mealId: meal.id,
      quantity: item.quantity,
      price: meal.price, // snapshot price
    };
  });

  // 7️⃣ Create order using transaction
  const result = await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        totalPrice,
        address: payload.address,
        status: OrderStatus.PLACED,
        customerId: userId,
        providerId,
      },
    });

    await tx.orderItem.createMany({
      data: orderItemsData.map((item) => ({
        ...item,
        orderId: order.id,
      })),
    });

    return tx.order.findUnique({
      where: { id: order.id },
      include: {
        items: {
          include: {
            meal: true,
          },
        },
        provider: true,
      },
    });
  });

  return result;
};


const getMyOrdersFromDB = async (userId: string) => {
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.role !== Role.CUSTOMER) {
    throw new Error("Only customers can view their orders");
  }

  const orders = await prisma.order.findMany({
    where: {
      customerId: userId,
    },
    include: {
      items: {
        include: {
          meal: true,
        },
      },
      provider: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};

const getSingleOrderFromDB = async (
  orderId: string,
  userId: string
) => {
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          meal: true,
        },
      },
      provider: true,
      customer: true,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  // Ensure customer can only see their own order
  if (order.customerId !== userId) {
    throw new Error("You are not allowed to view this order");
  }

  return order;
};

const getAllOrdersFromDB = async () => {
  const orders = await prisma.order.findMany({
    include: {
      items: {
        include: {
          meal: true,
        },
      },
      provider: true,
      customer: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};

export const OrderService = {
  createOrderIntoDB,
  getMyOrdersFromDB,
  getSingleOrderFromDB,
  getAllOrdersFromDB
};