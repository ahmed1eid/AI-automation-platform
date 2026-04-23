import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: [true, "Name is required"],},
    email: { type: String, required: [true, "Email is required"], unique: true,},
    password: { type: String, select: false },
    image: { type: String },
    credits: { type: Number, default: 20 },
    usedCredits: { type: Number, default: 0 },
    plan: { type: String, enum: ["free", "pro","enterprise"], default: "free" },
}, { timestamps: true });

const User = models.User || model("User", userSchema);
export default User;