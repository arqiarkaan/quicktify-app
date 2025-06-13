import { v } from 'convex/values';
import {
  MutationCtx,
  QueryCtx,
  internalMutation,
  query,
} from './_generated/server';
import { getUserId } from './utils';

export const getUser = query({
  args: {},
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    if (!userId) {
      return undefined;
    }

    return getFullUser(ctx, userId);
  },
});

// New function to get user usage counts for the current month
export const getUserUsageCounts = query({
  args: {},
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    if (!userId) {
      return { analysisCount: 0, estimationCount: 0 };
    }

    // Get start of current month timestamp
    const now = new Date();
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    ).getTime();

    // Count analysis records from this month
    const analysisRecords = await ctx.db
      .query('analysis')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .filter((q) => q.gte(q.field('createdAt'), startOfMonth))
      .collect();

    // Count rating estimation records from this month
    const estimationRecords = await ctx.db
      .query('ratingEstimations')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .filter((q) => q.gte(q.field('createdAt'), startOfMonth))
      .collect();

    return {
      analysisCount: analysisRecords.length,
      estimationCount: estimationRecords.length,
    };
  },
});

// Helper function to check if user has reached analysis limit
export const checkAnalysisLimit = query({
  args: { limit: v.number() },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    if (!userId) {
      return { hasReachedLimit: false, currentCount: 0 };
    }

    // Get start of current month timestamp
    const now = new Date();
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    ).getTime();

    // Count analysis records from this month
    const analysisRecords = await ctx.db
      .query('analysis')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .filter((q) => q.gte(q.field('createdAt'), startOfMonth))
      .collect();

    return {
      hasReachedLimit: analysisRecords.length >= args.limit,
      currentCount: analysisRecords.length,
    };
  },
});

// Helper function to check if user has reached estimation limit
export const checkEstimationLimit = query({
  args: { limit: v.number() },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    if (!userId) {
      return { hasReachedLimit: false, currentCount: 0 };
    }

    // Get start of current month timestamp
    const now = new Date();
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    ).getTime();

    // Count rating estimation records from this month
    const estimationRecords = await ctx.db
      .query('ratingEstimations')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .filter((q) => q.gte(q.field('createdAt'), startOfMonth))
      .collect();

    return {
      hasReachedLimit: estimationRecords.length >= args.limit,
      currentCount: estimationRecords.length,
    };
  },
});

// export const isUserSubscribed = async (ctx: QueryCtx | MutationCtx) => {
//   const userId = await getUserId(ctx);

//   if (!userId) {
//     return false;
//   }

//   const userToCheck = await getFullUser(ctx, userId);

//   return (userToCheck?.endsOn ?? 0) > Date.now();
// };

export const createUser = internalMutation({
  args: { email: v.string(), userId: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert('users', {
      email: args.email,
      userId: args.userId,
    });
  },
});

export const deleteUser = internalMutation({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    // Delete user record
    const user = await getFullUser(ctx, args.userId);
    if (user) {
      await ctx.db.delete(user._id);
    }

    // Delete all analysis records for this user
    const analysisRecords = await ctx.db
      .query('analysis')
      .withIndex('by_userId', (q) => q.eq('userId', args.userId))
      .collect();

    for (const record of analysisRecords) {
      await ctx.db.delete(record._id);
    }

    // Delete all rating estimation records for this user
    const ratingEstimationRecords = await ctx.db
      .query('ratingEstimations')
      .withIndex('by_userId', (q) => q.eq('userId', args.userId))
      .collect();

    for (const record of ratingEstimationRecords) {
      await ctx.db.delete(record._id);
    }

    console.log(`Deleted user ${args.userId} and all associated data`);
  },
});

// export const updateSubscription = internalMutation({
//   args: { subscriptionId: v.string(), userId: v.string(), endsOn: v.number() },
//   handler: async (ctx, args) => {
//     const user = await getFullUser(ctx, args.userId);

//     if (!user) {
//       throw new Error('no user found with that user id');
//     }

//     await ctx.db.patch(user._id, {
//       subscriptionId: args.subscriptionId,
//       endsOn: args.endsOn,
//     });
//   },
// });

// export const updateSubscriptionBySubId = internalMutation({
//   args: { subscriptionId: v.string(), endsOn: v.number() },
//   handler: async (ctx, args) => {
//     const user = await ctx.db
//       .query('users')
//       .withIndex('by_subscriptionId', (q) =>
//         q.eq('subscriptionId', args.subscriptionId)
//       )
//       .first();

//     if (!user) {
//       throw new Error('no user found with that user id');
//     }

//     await ctx.db.patch(user._id, {
//       endsOn: args.endsOn,
//     });
//   },
// });

export function getFullUser(ctx: QueryCtx | MutationCtx, userId: string) {
  return ctx.db
    .query('users')
    .withIndex('by_userId', (q) => q.eq('userId', userId))
    .first();
}
