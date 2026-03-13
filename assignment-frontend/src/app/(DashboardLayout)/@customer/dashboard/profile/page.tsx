import { getProfile } from "@/services/profile";

export default async function ProfilePage() {
  const profileRes = await getProfile();

  if (!profileRes?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Not Logged In
      </div>
    );
  }

  const user = profileRes.data;

  const initials = user.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg relative overflow-hidden">
        
        {/* Decorative background circle */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-indigo-200 rounded-full opacity-40 blur-2xl"></div>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-indigo-600 text-white text-3xl font-bold shadow-lg">
            {initials}
          </div>
        </div>

        {/* Name */}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          {user.name}
        </h1>

        {/* Email */}
        <p className="text-center text-gray-500 mt-2">{user.email}</p>

        {/* Role & Status */}
        <div className="flex justify-center gap-4 mt-6">
          <span className="px-4 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700">
            {user.role}
          </span>

          <span
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              user.status === "ACTIVE"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {user.status}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t my-6"></div>

        {/* Extra Info */}
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex justify-between">
            <span className="font-medium">User ID</span>
            <span className="truncate max-w-[200px]">{user.id}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Joined</span>
            <span>
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}