import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const gameRouter = createTRPCRouter({
  getGames: publicProcedure
    .input(
      z.object({
        search: z.string(),
        cursor: z.number().nullish(),
        genres: z.number().array(),
        platforms: z.number().array(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const res = await ctx.apiGames.getGames({
        page: input.cursor!,
        search: input.search,
        genres: input.genres,
        platforms: input.platforms,
      });

      return {
        ...res,
        nextCursor: input.cursor! + 1,
      };
    }),
});
