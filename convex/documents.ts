import { QueryCtx, mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { v } from "convex/values";
import { useId } from "react";

// export const getAllData = query({
//   handler: async (ctx) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       throw new Error("Not authenticated");
//     }
//     const documents = await ctx.db.query("documents").collect();
//     return documents;
//   },
// });
const getUser = async (ctx: QueryCtx): Promise<string> => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Not authenticated");
  }
  const userId = identity.subject;
  return userId;
};
const checkExist = async (
  ctx: QueryCtx,
  id: Id<"documents">,
  userId: String
): Promise<Doc<"documents">> => {
  const exist = await ctx.db.get(id);
  if (!exist) throw new Error("Not found");
  if (exist.userId !== userId) throw new Error("Unauthorized");
  return exist;
};
export const archive = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;
    const exist = await checkExist(ctx, args.id, userId);

    const recurs = async (docId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", docId)
        )
        .collect();
      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: true,
        });
        await recurs(child._id);
      }
    };
    const doc = await ctx.db.patch(args.id, { isArchived: true });
    recurs(args.id);
    return doc;
  },
});

export const getSidebar = query({
  args: {
    pareentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocument", args.pareentDocument)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();
    return documents;
  },
});

export const getTrash = query({
  handler: async (ctx) => {
    const userId = await getUser(ctx);
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();
    return documents;
  },
});

export const restore = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const userId = await getUser(ctx);
    const exist = await checkExist(ctx, args.id, userId);

    const recursive = async (docId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", docId)
        )
        .collect();
      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: false,
        });
        await recursive(child._id);
      }
    };

    const options: Partial<Doc<"documents">> = {
      isArchived: false,
    };
    if (exist.parentDocument) {
      const parent = await ctx.db.get(exist.parentDocument);
      if (parent?.isArchived) options.parentDocument = undefined;
    }

    const doucment = await ctx.db.patch(args.id, options);
    recursive(args.id);
    return doucment;
  },
});

export const remove = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const userId = await getUser(ctx);
    const exist = await checkExist(ctx, args.id, userId);

    const document = await ctx.db.delete(args.id);
    return document;
  },
});
export const getSearch = query({
  handler: async (ctx) => {
    const userId = await getUser(ctx);

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;
    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    });
    return document;
  },
});
export const getById = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const document = await ctx.db.get(args.documentId);

    if (!document) {
      throw new Error("Not found");
    }

    if (document.isPublished && !document.isArchived) {
      return document;
    }

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    if (document.userId !== userId) {
      throw new Error("Unauthorized");
    }

    return document;
  },
});

export const update = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = await getUser(ctx);
    const { id, ...rest } = args;
    const exist = checkExist(ctx, args.id, userId);
    const document = await ctx.db.patch(args.id, { ...rest });
    return document;
  },
});
export const removeIcon = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const userId = await getUser(ctx);
    const { id, ...rest } = args;
    const exist = checkExist(ctx, args.id, userId);
    const document = await ctx.db.patch(args.id, { icon: undefined });
    return document;
  },
});
export const removeCoverImage = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const userId = await getUser(ctx);
    const { id, ...rest } = args;
    const exist = checkExist(ctx, args.id, userId);
    const document = await ctx.db.patch(args.id, { coverImage: undefined });
    return document;
  },
});
