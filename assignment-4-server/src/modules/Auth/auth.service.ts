import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const secret = "lsdngkdsbfgbkdf";

const createUserIntoDB = async (payload: any) => {
    const hashPassword = await bcrypt.hash(payload.password, 8);

    const result = await prisma.user.create({
        data: {
            ...payload,
            password: hashPassword
        },
    });
    const { password, ...newResult } = result;
    return newResult;
};


const loginUserIntoDB = async (payload: any) => {
    const user = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    });

    if (!user) {
        throw new Error("user not found!")
    }

    const isPasswordValid = await bcrypt.compare(payload.password, user.password);

    if(!isPasswordValid){
        throw new Error("Invalid password!")
    }

    const userData = {
        id: user.id,
        name: user.name,
        role: user.role,
        status: user.status,
        email: user.email,
    };

    const token = jwt.sign(userData, secret, { expiresIn: "1d" });

    return {
        token,
        user
    }
};

const getMeIntoDB = async (userId: string) => {

    const result = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    return result;
};


export const AuthService = {
    // Add service methods here
    createUserIntoDB,
    loginUserIntoDB,
    getMeIntoDB,
};