import { prisma } from "../../lib/prisma";

const createProviderIntoDB = async (payload: any, userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new Error("Invalid user");
    }

    const result = await prisma.providerProfiles.create({
        data: {
            ...payload,
            providerId: user?.id,
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

const getSingleProviderIntoDB = async (mealId: string) => {
    const result = await prisma.meal.findUnique({
        where: {
            id: mealId,
        },
    });

    return result;
};

export const ProviderService = {
    // Add service methods here
    createProviderIntoDB,
    getAllProvidersIntoDB,
    getSingleProviderIntoDB,
};