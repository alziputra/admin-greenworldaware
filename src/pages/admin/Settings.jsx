import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Settings = () => {
  const { userData } = useContext(AuthContext);
  const [firstName, setFirstName] = useState(userData?.firstName || "");
  const [lastName, setLastName] = useState(userData?.lastName || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [gender, setGender] = useState(userData?.gender || "");
  const [newPassword, setNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null); // File selected from the computer
  const [previewImage, setPreviewImage] = useState(userData?.image || ""); // URL for preview
  const [statusMessage, setStatusMessage] = useState("");

  const handleCancel = () => {
    // Reset form fields to initial user data
    setFirstName(userData?.firstName || "");
    setLastName(userData?.lastName || "");
    setEmail(userData?.email || "");
    setGender(userData?.gender || "");
    setNewPassword("");
    setProfileImage(null);
    setPreviewImage(userData?.image || "");
    setStatusMessage("");
  };

  const handleProfileUpdate = async () => {
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("gender", gender);
    if (newPassword) formData.append("password", newPassword);
    if (profileImage) formData.append("image", profileImage);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/${userData.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        setStatusMessage("Profile updated successfully");
      } else {
        setStatusMessage(result.message || "Failed to update profile");
      }
    } catch (error) {
      setStatusMessage("Error updating profile");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleProfileUpdate();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Set temporary URL for preview
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-green-200 border-dashed rounded-lg dark:border-green-700 mt-14">
        <div className="flex items-center justify-center h-screen">
          <div className="max-w-2xl w-full mx-auto p-6 bg-white shadow-md rounded">
            <h2 className="text-2xl font-bold mb-6 text-center">Settings</h2>
            {statusMessage && <p className="text-green-500 text-center mb-4">{statusMessage}</p>}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-semibold">First Name</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full p-2 border rounded" placeholder="Enter first name" />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Last Name</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full p-2 border rounded" placeholder="Enter last name" />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" placeholder="Enter email" />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Gender</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-2 border rounded">
                  <option value="">Select</option>
                  <option value="male">laki-laki</option>
                  <option value="female">perempuan</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-semibold">New Password</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full p-2 border rounded" placeholder="Enter new password" />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Profile Image</label>
                {/* Display current or selected profile image */}
                {previewImage && (
                  <div className="mb-4">
                    <img src={previewImage} alt="Profile Preview" className="w-20 h-20 rounded-full mx-auto" />
                  </div>
                )}
                <input type="file" onChange={handleImageChange} className="w-full p-2 border rounded" accept="image/*" />
              </div>

              <div className="col-span-1 md:col-span-2 flex justify-end space-x-4 mt-4">
                <button type="button" onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;