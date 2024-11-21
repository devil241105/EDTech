import userModel from '../models/user.js';

// Get User Profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);  // Assuming req.user.id is set by a middleware after authentication
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Error fetching user profile:", error.message);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Update User Preferences
export const updateUserPreferences = async (req, res) => {
    try {
        const { preferences } = req.body;  // Assuming the user sends their preferences in the request body
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user.id,
            { preferences },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        console.error("Error updating preferences:", error.message);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
