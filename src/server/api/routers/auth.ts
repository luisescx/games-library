import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { cookies } from "next/headers";
import {
  compareHashPassword,
  generateHashHex,
  generatePasswordHash,
} from "@/utils/cryptAuth";
import { getDateFromTodayIsoString } from "@/utils/date";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";

export const authRouter = createTRPCRouter({
  createAccount: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hashPassword = await generatePasswordHash(input.password);

      try {
        await ctx.db.user.create({
          data: {
            name: input.name,
            email: input.email,
            password: hashPassword,
          },
        });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            throw new TRPCError({
              code: "UNAUTHORIZED",
              message: "Email is Already in use",
            });
          }

          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `${e.code}-${e.message}`,
          });
        }
      }
    }),

  signIn: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { email: input.email },
        select: {
          name: true,
          password: true,
          email: true,
          id: true,
          image: true,
        },
      });

      if (user?.password) {
        const passwordMatch = await compareHashPassword(
          input.password,
          user.password,
        );

        if (passwordMatch) {
          const sessionToken = generateHashHex();
          const tomorrowIsoDate = getDateFromTodayIsoString(1);

          const createdSession = await ctx.db.session.create({
            data: {
              sessionToken,
              userId: user.id,
              expires: tomorrowIsoDate,
            },
            select: {
              sessionToken: true,
              expires: true,
            },
          });

          if (createdSession) {
            cookies().set({
              name: "next-auth.session-token",
              value: createdSession.sessionToken,
              maxAge: 24 * 60 * 60,
              path: "/",
              httpOnly: true,
            });

            return;
          }
        }
      }

      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid credentials",
      });
    }),
});
