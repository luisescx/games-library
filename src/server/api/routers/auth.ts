import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { cookies } from "next/headers";
import {
  compareHashPassword,
  generateHashHex,
  generatePasswordHash,
} from "@/utils/cryptAuth";
import { getDateFromTodayIsoString, getExpiryTimestamp } from "@/utils/date";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import nodemailer from "nodemailer";
import { env } from "@/env";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: env.MY_EMAIL,
    pass: env.MY_EMAIL_APP_PASSWORD,
  },
});

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

        if (e instanceof TRPCError) {
          throw new TRPCError({
            code: e.code,
            message: e.message,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred",
        });
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
      try {
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
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `${e.code}-${e.message}`,
          });
        }

        if (e instanceof TRPCError) {
          throw new TRPCError({
            code: e.code,
            message: e.message,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred",
        });
      }
    }),
  sendEmailRecoverAccount: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.db.user.findUnique({
          where: { email: input.email },
          select: {
            email: true,
          },
        });

        if (user) {
          const isUpdated = await ctx.db.user.update({
            where: {
              email: user.email,
            },
            data: {
              emailResetPasswordToken: generateHashHex(),
              passwordResetTokenExpired: getExpiryTimestamp(1),
            },
          });

          if (isUpdated) {
            const mailOptions = {
              from: '"Games library" <' + env.MY_EMAIL + ">",
              to: input.email,
              subject: "Password reset request",
              html: `We received a request to reset your password for our app. Please click on the following link to reset your password: .If you did not request a password reset, please ignore this email.`,
            };

            await transporter.sendMail(mailOptions);
          }

          return;
        }

        throw new TRPCError({
          code: "UNAUTHORIZED",
          message:
            "The email provided was not found in our records. Please ensure you have entered the correct email or register to create a new account.",
        });
      } catch (e) {
        if (e instanceof TRPCError) {
          throw new TRPCError({
            code: e.code,
            message: e.message,
          });
        }

        if (e instanceof Error) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: e.message,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred",
        });
      }
    }),
});
