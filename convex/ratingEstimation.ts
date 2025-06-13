import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

// Create new rating estimation
export const create = mutation({
  args: {
    userId: v.string(),
    input: v.object({
      category: v.string(),
      rating_count: v.number(),
      installs: v.number(),
      size: v.number(),
      content_rating: v.string(),
      ad_supported: v.boolean(),
      in_app_purchases: v.boolean(),
      editors_choice: v.boolean(),
      app_type: v.string(),
    }),
    predicted_rating: v.number(),
    model_used: v.string(),
    confidence_interval: v.optional(v.any()),
    input_summary: v.any(),
    feature_importance: v.any(),
    shap_local: v.any(),
    shap_plots: v.object({
      bar_plot_url: v.string(),
      waterfall_plot_url: v.string(),
      force_plot_url: v.string(),
    }),
    summary: v.optional(v.string()),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('ratingEstimations', args);
  },
});

// Get last rating estimation for user
export const getLast = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const results = await ctx.db
      .query('ratingEstimations')
      .withIndex('by_userId', (q) => q.eq('userId', args.userId))
      .order('desc')
      .collect();
    return results[0] || null;
  },
});

// Get all rating estimations for user
export const getAll = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('ratingEstimations')
      .withIndex('by_userId', (q) => q.eq('userId', args.userId))
      .order('desc')
      .collect();
  },
});

// Get rating estimation by ID
export const getById = query({
  args: { id: v.id('ratingEstimations') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Update summary for a rating estimation
export const updateSummary = mutation({
  args: { id: v.id('ratingEstimations'), summary: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { summary: args.summary });
  },
});
