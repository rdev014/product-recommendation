import mongoose, { Schema, Document } from "mongoose";

// Define the interface for RecommendedProduct
export interface IRecommendedProduct extends Document {
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  createdAt: Date;
}

// Define the schema for RecommendedProduct
const RecommendedProductSchema = new Schema<IRecommendedProduct>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  rating: {
    rate: { type: Number, required: true, min: 0, max: 5 },
    count: { type: Number, required: true },
  },
  createdAt: { type: Date, default: Date.now },
});

// Export the model for the recommended products
const RecommendedProduct = mongoose.model<IRecommendedProduct>(
  "RecommendedProduct",
  RecommendedProductSchema
);
export default RecommendedProduct;
