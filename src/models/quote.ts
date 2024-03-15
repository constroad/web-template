import { z } from 'zod';
import mongoose, { Document, Schema, Model } from 'mongoose';

// Schema validation
export const quoteValidationSchema = z.object({
  _id: z.string().optional(),
  clientId: z.string().min(1),
  nro: z.number(),
  date: z.date(),
  items: z.array(z.object({
    description: z.string().min(1),
    alias: z.string().optional(),
    unit: z.string().optional(),
    quantity: z.number(),
    unitPrice: z.number(),
    total: z.number(),
  })),
  notes: z.string(),
  subTotal: z.number(),
  igv: z.number(),
  total: z.number(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
});
export type IQuoteValidationSchema = z.infer<typeof quoteValidationSchema>


// DB model + schema
export interface QuoteModel extends Document {
  clientId: string;
  date: Date;
  nro: number;
  items: {
    description: string;
    alias: string;
    unit: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[],
  notes: string;
  subTotal: number
  igv: number
  total: number
}

let Quote: Model<QuoteModel>;

try {
  Quote = mongoose.model('Quote') as Model<QuoteModel>;
} catch (e) {
  const quoteDBSchema = new Schema({
    clientId: { type: String, required: true },
    nro: { type: Number, required: true },
    date: { type: Date, required: true },
    items: [{
      description: { type: String, required: true },
      alias: { type: String, optional: true },
      unit: { type: String, optional: true },
      quantity: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
      total: { type: Number, required: true },
    }],
    notes: { type: String, optional: true },
    subTotal: { type: Number, required: true },
    igv: { type: Number, required: true },
    total: { type: Number, required: true },
  }, {
    timestamps: true, // this will add both createdAt y updatedAt automatically
  });
  Quote = mongoose.model<QuoteModel>('Quote', quoteDBSchema);
}

export default Quote;