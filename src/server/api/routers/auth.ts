import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import bcrypt from "bcrypt";

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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const hashPassword = (await bcrypt.hash(input.password, 8)) as string;

      await ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashPassword,
        },
      });
    }),
});
