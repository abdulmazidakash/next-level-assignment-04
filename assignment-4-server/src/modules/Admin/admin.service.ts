import { prisma } from "../../lib/prisma";

const getAllOrdersFromDB = async () => {
  return prisma.order.findMany({
    include: {
      customer: true,
      provider: true,
      items: {
        include: {
          meal: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const AdminService = {
  getAllOrdersFromDB,
};