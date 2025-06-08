
import mongoose from "mongoose";


interface UserInterface extends Document {
    name: string;
    email: string;
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});
export const User = mongoose.model<UserInterface>("User", userSchema);
