import useCurrentUser from "@/hooks/useCurrentUser";
import useNotification from "@/hooks/useNotification";
import { useEffect } from "react";
import { BsBellFill } from "react-icons/bs";

const NotificationFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotification(currentUser?.id);
  console.log("Fetched notifications in hook:", fetchedNotifications)
  useEffect(() => {
    // Refresh the current user's data when notifications are fetched
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No notifications yet.
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div
          key={notification.id}
          className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800"
        >
          <BsBellFill color="white" size={32}/>
          <p className="text-white ">
            {notification.body}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NotificationFeed;
