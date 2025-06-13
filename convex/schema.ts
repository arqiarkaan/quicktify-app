import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    userId: v.string(),
    email: v.string(),
    subscriptionId: v.optional(v.string()),
    endsOn: v.optional(v.number()),
  }).index('by_userId', ['userId']),
  analysis: defineTable({
    userId: v.string(),
    inputType: v.string(),
    inputValue: v.string(),
    reviewsCount: v.number(),
    sentimentResult: v.any(),
    spamResult: v.any(),
    sentimentFileUrl: v.string(),
    spamFileUrl: v.string(),
    createdAt: v.number(),
    summary: v.optional(v.string()),
  }).index('by_userId', ['userId']),
  ratingEstimations: defineTable({
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
  }).index('by_userId', ['userId']),
});
