import { prisma } from "../../lib/prisma";

const createProviderIntoDB = async (payload: any, userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
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

const getAllProvidersIntoDB = async () => {
  const result = await prisma.providerProfiles.findMany({
    where: {
      isApproved: true,
    },
    include: {
      user: true,
      meals: true,
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

export const ProviderService = {
    // Add service methods here
    createProviderIntoDB,
    getAllProvidersIntoDB,
    getSingleProviderIntoDB,
};