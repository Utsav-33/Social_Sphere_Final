import { useState, useEffect } from "react";
import useUsers from "@/hooks/useUsers";
import useCurrentUser from "@/hooks/useCurrentUser";
import Avatar from "../Avatar";

interface User {
  id: string;
  name: string;
  username: string;
}

const FollowBar = () => {
  const { data: users = [], error: usersError } = useUsers();
  const { data: currentUserData, error: currentUserError } = useCurrentUser();
  const [randomUsers, setRandomUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);

  useEffect(() => {
    if (!usersError && users.length && currentUserData) {
      const filteredUsers = users.filter(
        (user: User) => user.id !== currentUserData.id
      );
      const randomSelection = filteredUsers
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      setRandomUsers(randomSelection);
    }
  }, [users]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim()) {
      const filteredResults = users.filter(
        (user: User) =>
          user.name.toLowerCase().includes(query) ||
          user.username.toLowerCase().includes(query)
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  if (usersError || currentUserError) {
    console.error(
      "Error fetching users or current user:",
      usersError || currentUserError
    );
    return null;
  }

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-900 rounded-xl px-4 py-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        {/* Search Box */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-2 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Search Results */}
        {searchQuery && (
          <div className="mt-4">
            {searchResults.length > 0 ? (
              searchResults.map((user: User) => (
                <div key={user.id} className="flex flex-row gap-4 mt-4">
                  <Avatar userId={user.id} />
                  <div className="flex flex-col">
                    <p className="text-white text-sm font-semibold">
                      {user.name}
                    </p>
                    <p className="text-neutral-400 text-sm">
                      @{user.username}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-neutral-400 text-sm mt-2">No users found.</p>
            )}
          </div>
        )}
        {/* Suggested Users */}
        {!searchQuery && (
          <div className="mt-6">
            <div className="flex flex-col gap-6">
              {randomUsers.map((user: User) => (
                <div key={user.id} className="flex flex-row gap-4">
                  <Avatar userId={user.id} />
                  <div className="flex flex-col">
                    <p className="text-white text-sm font-semibold">
                      {user.name}
                    </p>
                    <p className="text-neutral-400 text-sm">
                      @{user.username}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowBar;
