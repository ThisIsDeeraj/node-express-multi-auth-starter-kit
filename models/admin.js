import mongoose from "mongoose";
import slug from 'mongoose-slug-updater';

mongoose.plugin(slug);

// Define a function to strip HTML tags (example function)
function stripHtmlTags(input) {
    // Implement the logic to remove HTML tags here
    // This is just a placeholder example
    return input.replace(/<[^>]*>?/gm, '');
}

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        slug: "name",
        unique: true,
        transform: v => stripHtmlTags(v)
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    dob: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    lastLoginAt: {
        type: Date,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isSuper: {
        type: Boolean,
        default: false,
    },
    profilePicture: {
        type: String,
        default: '/default-profile-picture.jpg',
    },


}, { timestamps: true }
)


const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
