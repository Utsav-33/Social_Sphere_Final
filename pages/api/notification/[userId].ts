import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const { userId } = req.query;
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid User ID");
    }
    const notifications = await prisma.notification.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hasNotification: false,
      },
    });
    res.status(200).json(notifications);
  } catch (err) {
    console.error(err);
    return res.status(400).end();
  }
}
