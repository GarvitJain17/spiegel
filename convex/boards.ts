import { v } from "convex/values";
import {getAllOrThrow} from "convex-helpers/server/relationships"
import { query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const get = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favorites:v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not Authorized");
    }
    if(args.favorites)
    {
        const favoriteBoards = await ctx.db
          .query("userFavorites")
          .withIndex("by_user_org", (q) =>
            q.eq("userId", identity.subject).eq("orgId", args.orgId)
          )
          .order("desc")
          .collect()

          const ids = favoriteBoards.map((favorite) => favorite.boardId as Id<"boards">);
          const boards =await getAllOrThrow(ctx.db,ids);
          return boards.map((board) => ({
              
              ...board,
              isFavorite: true,// Convert favorite to a boolean
          }))
    }
    const title=args.search as string;
    let boards :any[];
    if(title){
       boards = await ctx.db
      .query("boards")
      .withSearchIndex("search_title", 
        (q) =>q
            .search("title", title)
            .eq("orgId", args.orgId)
      )
      .collect();
    }
    else{
    boards = await ctx.db
      .query("boards")
      .withIndex("byOrg", (q) => q.eq("orgId", args.orgId))
      .order("desc")
      .collect();
    }

    const boardsWithFavoriteRelation = await Promise.all(
      boards.map(async (board) => {
        const favorite = await ctx.db
          .query("userFavorites")
          .withIndex("by_user_board", (q) =>
            q.eq("userId", identity.subject).eq("boardId", board._id)
          )
          .unique();
        return {
          ...board,
          isFavorite: !!favorite,// Convert favorite to a boolean
        };
      })
    );
    const boardswithFavoriteboolean=await Promise.all(boardsWithFavoriteRelation);
    return boardswithFavoriteboolean;
  },
});
