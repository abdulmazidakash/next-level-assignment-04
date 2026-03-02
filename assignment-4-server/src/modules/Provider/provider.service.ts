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

const getAllProvidersIntoDB = async (userId: string) => {
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
      user: true,
    },
  });

  return result;
};

const getSingleProviderIntoDB = async (providerId: string) => {
  const result = await prisma.providerProfiles.findUnique({
    where: {
      id: providerId,
    },
    include: {
      user: true,
      meals: true,
    },
  });

  if (!result) {
    throw new Error("Provider not found");
  }

  return result;
};

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

export const ProviderService = {
  // Add service methods here
  createProviderIntoDB,
  getAllProvidersIntoDB,
  getSingleProviderIntoDB,
  updateOrderStatusIntoDB,
};