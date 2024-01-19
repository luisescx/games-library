import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const gameRouter = createTRPCRouter({
  getGames: publicProcedure
    .input(
      z
        .object({
          search: z.string(),
          cursor: z.number().nullish(),
        })
        .partial({
          search: true,
        }),
    )
    .query(async ({ ctx, input }) => {
      const res = await ctx.apiGames.getGames(input.cursor!, input.search);

      return {
        ...res,
        nextCursor: input.cursor! + 1,
      };
    }),
});
