import mongoose, { Schema, Document } from "mongoose";

// Define the interface for TypeScript
export interface IProduct extends Document {
  name: string;
  description: string;
  images: string[];
  video: string;
  company: string;
  price: number;
  oldprice: number;
  newprice: number;
  category: string;
  color: string;
  seller: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

// Create the schema
const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    images: { type: [String], required: true },
    video: { type: String, required: false, trim: true },
    company: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    oldprice: { type: Number, required: false, min: 0 },
    newprice: { type: Number, required: false, min: 0 },
    category: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    seller: { type: String, required: true, trim: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the model
const Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
