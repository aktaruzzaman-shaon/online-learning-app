"use server"
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '../../../lib/prisma';


export const fetchUsers = async () => {
  try {
    const clerkuser = await currentUser()
    let mongoUser = null;
    mongoUser = await prisma.user.findUnique({
      where: {
        clerkUserId: clerkuser?.id
      }
    })

    if (!mongoUser) {
      let username = clerkuser?.username
      if (!username) {
        username = clerkuser?.firstName + "" + clerkuser?.lastName;
      }
      const newUser: any = {
        clerkuserId: clerkuser?.id,
        username,
        email: clerkuser?.emailAddresses[0].emailAddress,
        profilePic: clerkuser?.imageUrl
      }
      mongoUser = await prisma.user.create({
        data: newUser,
      })
    }

    const quizResults = await prisma.quizResult.findMany({
      where: {
        userId: mongoUser.id,
      }
    })

    return {
      data: {
        user: mongoUser,
        quizResults
      }
    }

  } catch (error) {
    console.log(error)
  }
}