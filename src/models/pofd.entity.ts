// src/models/pofd.entity.ts

import mongoose, { Schema, Document, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IPofd extends Document {
  _id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  source: string;
  answer: string; 
  createdAt?: Date;
  date: string;
}

export const PofdSchema: Schema<IPofd> = new Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  source: { type: String, required: true },
  answer: { type: String ,required:true
  }, // <-- added this
  createdAt: {
    type: Date,
    default: Date.now,
  },
  date: {
    type: String,
    unique: true,
    required: true,
  },
});

export const PofdModel = model<IPofd>("Pofd", PofdSchema);
