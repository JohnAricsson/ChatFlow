import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Camera,
  Mail,
  User,
  ShieldCheck,
  Calendar,
  Sparkles,
} from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-base-300 relative overflow-hidden transition-all duration-500">
      {/* SHARED MESH GRADIENTS */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px] animate-pulse" />

      <div className="max-w-2xl mx-auto p-4 py-24 relative z-10">
        <div className="bg-base-100/60 backdrop-blur-2xl rounded-3xl p-8 space-y-8 border border-white/5 shadow-2xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="size-3" /> User Profile
            </div>
            <h1 className="text-3xl font-black tracking-tight">
              Personal Workspace
            </h1>
            <p className="text-base-content/60 mt-1 font-medium">
              Manage your identity and account settings
            </p>
          </div>

          {/* AVATAR UPLOAD SECTION */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="size-32 rounded-full p-1 bg-gradient-to-tr from-primary to-secondary shadow-xl">
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="size-full rounded-full object-cover border-4 border-base-100"
                />
              </div>

              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-primary hover:bg-primary-focus
                  p-2.5 rounded-2xl cursor-pointer 
                  shadow-lg transition-all duration-300
                  border-4 border-base-100
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : "hover:scale-110 active:scale-95"}
                `}
              >
                <Camera className="size-5 text-primary-content" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-base-content/70">
                {isUpdatingProfile
                  ? "Syncing with cloud..."
                  : "Change Profile Photo"}
              </p>
              <p className="text-xs text-base-content/40 mt-1">
                JPG, PNG or GIF. Max 10MB
              </p>
            </div>
          </div>

          {/* USER INFO FIELDS */}
          <div className="grid gap-5">
            <div className="space-y-2">
              <div className="text-xs font-bold text-base-content/50 uppercase tracking-widest flex items-center gap-2 ml-1">
                <User className="size-3" /> Full Name
              </div>
              <div className="px-4 py-3.5 bg-base-200/50 rounded-2xl border border-white/5 font-medium transition-all focus-within:border-primary/50">
                {authUser?.fullName}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-base-content/50 uppercase tracking-widest flex items-center gap-2 ml-1">
                <Mail className="size-3" /> Email Address
              </div>
              <div className="px-4 py-3.5 bg-base-200/50 rounded-2xl border border-white/5 font-medium transition-all focus-within:border-primary/50">
                {authUser?.email}
              </div>
            </div>
          </div>

          {/* ACCOUNT STATUS BENTO BOX */}
          <div className="pt-4">
            <div className="bg-base-200/50 rounded-3xl p-6 border border-white/5">
              <h2 className="text-sm font-bold uppercase tracking-widest text-base-content/50 mb-4">
                Security & Status
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-base-300 flex items-center justify-center">
                      <Calendar className="size-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">Member Since</span>
                  </div>
                  <span className="text-sm font-bold">
                    {authUser.createdAt?.split("T")[0]}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-base-300 flex items-center justify-center">
                      <ShieldCheck className="size-4 text-success" />
                    </div>
                    <span className="text-sm font-medium">Account Status</span>
                  </div>
                  <div className="badge badge-success badge-outline font-bold text-[10px] py-3">
                    VERIFIED ACTIVE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
