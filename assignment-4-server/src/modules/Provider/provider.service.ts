import { OrderStatus, Role } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const createProviderIntoDB = async (payload: any, userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
  });

  if (!user) {
    throw new Error("Invalid user");
  }

  if (user.role !== "PROVIDER") {
    throw new Error("Only providers can create provider profile");
  }

  const existingProfile = await prisma.providerProfiles.findUnique({
    where: { providerId: userId },
  });

  if (existingProfile) {
    throw new Error("Provider profile already exists");
  }

  const result = await prisma.providerProfiles.create({
    data: {
      ...payload,
      providerId: userId,
    },
  });

  return result;
};

// get own provider profile with meals count
const getOwnProvidersIntoDB = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found!!");
  }

  const result = await prisma.providerProfiles.findUniqueOrThrow({
    where: {
      providerId: user.id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },

      meals: true, // all meals

      _count: {
        select: {
          meals: true, // meal count
        },
      },
    },
  });

  return result;
};

// all providers with meals count
const getAllProvidersIntoDB = async () => {
  const result = await prisma.providerProfiles.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      meals: true,
    },
  });

  return result;
};

// single provider with meals
const getSingleProviderIntoDB = async (providerId: string) => {
  const result = await prisma.providerProfiles.findUnique({
    where: {
      id: providerId,
    },
    include: {
      user: true,
      meals: true, // all meals here
    },
  });

  return result;
};


// public providers with meals count
const getPublicProvidersIntoDB = async () => {
  const result = await prisma.providerProfiles.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          meals: true,
        },
      },
    },
  });

  return result;
};

// Provider can update order status ready, preparing, delivered, etc
const updateOrderStatusIntoDB = async (
  orderId: string,
  status: OrderStatus,
  userId: string
) => {
  // 1️⃣ Check user exists
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.role !== Role.PROVIDER) {
    throw new Error("Only providers can update order status");
  }

  // 2️⃣ Get provider profile
  const providerProfile = await prisma.providerProfiles.findUnique({
    where: { providerId: userId },
  });

  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }

  // 3️⃣ Check order exists and belongs to this provider
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.providerId !== providerProfile.id) {
    throw new Error("You are not authorized to update this order");
  }

  // 4️⃣ Update status
  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });

  return updatedOrder;
};


// get provider incoming orders
const getProviderOrders = async (userId: string) => {
  const providerProfile = await prisma.providerProfiles.findUnique({
    where: { providerId: userId },
  })

  return prisma.order.findMany({
    where: {
      providerId: providerProfile!.id,
    },
    include: {
      customer: true,
      items: {
        include: {
          meal: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

export const ProviderService = {
  // Add service methods here
  createProviderIntoDB,
  getAllProvidersIntoDB,
  getSingleProviderIntoDB,
  updateOrderStatusIntoDB,
  getPublicProvidersIntoDB,
  getProviderOrders,
  getOwnProvidersIntoDB,
};