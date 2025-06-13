import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

// Simpan hasil analisis baru
export const createAnalysis = mutation({
  args: {
    userId: v.string(),
    inputType: v.string(),
    inputValue: v.string(),
    reviewsCount: v.number(),
    sentimentResult: v.any(),
    spamResult: v.any(),
    sentimentFileUrl: v.string(),
    spamFileUrl: v.string(),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('analysis', args);
  },
});

// Ambil riwayat analisis milik user
export const getUserAnalyses = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('analysis')
      .withIndex('by_userId', (q) => q.eq('userId', args.userId))
      .order('desc')
      .collect();
  },
});

// Update summary analisis
export const updateAnalysisSummary = mutation({
  args: {
    analysisId: v.id('analysis'),
    summary: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.analysisId, { summary: args.summary });
  },
});
