import { prisma } from "../../lib/prisma";
import { Status } from "../../../generated/prisma/enums";

const getAllUsersFromDB = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
};

const updateUserStatusIntoDB = async (
  userId: string,
  status: Status
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      status,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
  });

  return updatedUser;
};

export const UserService = {
  getAllUsersFromDB,
  updateUserStatusIntoDB,
};
