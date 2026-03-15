import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./SidebarSkeleton";
import { Users, Search, Circle } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-white/5 flex flex-col transition-all duration-200 bg-base-100/30 backdrop-blur-xl">
      <div className="border-b border-white/5 w-full p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Users className="size-5" />
            </div>
            <span className="md:text-lg font-bold tracking-tight hidden lg:block text-base-content/80">
              Contacts
            </span>
          </div>
        </div>

        <div className="hidden lg:flex flex-col gap-3">
          <label className="cursor-pointer group flex items-center justify-between p-2 rounded-xl hover:bg-base-content/5 transition-all">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="checkbox checkbox-primary checkbox-sm rounded-md"
              />
              <span className="text-xs font-semibold text-base-content/60 group-hover:text-base-content/90 transition-colors">
                Online Only
              </span>
            </div>
            <span className="text-[10px] font-bold bg-success/10 text-success px-2 py-0.5 rounded-full">
              {Math.max(0, onlineUsers.length - 1)}
            </span>
          </label>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-2 px-2 custom-scrollbar">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3 rounded-2xl mb-1
              transition-all duration-300 relative group
              ${
                selectedUser?._id === user._id
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "hover:bg-base-content/5 text-base-content/70 hover:text-base-content"
              }
            `}
          >
            {selectedUser?._id === user._id && (
              <div className="absolute left-0 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_10px_rgba(var(--p),0.5)]" />
            )}

            <div className="relative mx-auto lg:mx-0">
              <div
                className={`p-0.5 rounded-full transition-all duration-500 ${selectedUser?._id === user._id ? "bg-gradient-to-tr from-primary to-secondary shadow-md" : "bg-transparent"}`}
              >
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="size-11 object-cover rounded-full border-2 border-base-100"
                />
              </div>

              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-success rounded-full ring-2 ring-base-100 shadow-lg shadow-success/20 animate-in fade-in zoom-in duration-300" />
              )}
            </div>

            {/* USER INFO */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div
                className={`font-bold text-sm truncate transition-colors ${selectedUser?._id === user._id ? "text-primary" : ""}`}
              >
                {user.fullName}
              </div>
              <div className="text-[10px] font-bold flex items-center gap-1 uppercase tracking-wider opacity-60">
                {onlineUsers.includes(user._id) ? (
                  <span className="text-success flex items-center gap-1">
                    <Circle className="size-1.5 fill-current" /> Online
                  </span>
                ) : (
                  <span className="text-base-content/40">Offline</span>
                )}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center py-10 space-y-2">
            <Users className="size-8 text-base-content/20 mx-auto" />
            <p className="text-xs font-medium text-base-content/40">
              No one's around...
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
