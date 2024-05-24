import { Head } from "@inertiajs/react";
import PropTypes from "prop-types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";

dayjs.extend(relativeTime);
dayjs.locale("fr");

export default function Notifications({ auth }) {
    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = async () => {
        try {
            const response = await fetch("/notifications");
            const data = await response.json();
            setNotifications(data.notifications);
        } catch (error) {
            console.error("Error fetching notifications: ", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Mes notifications
                    </h2>
                </div>
            }
        >
            <Head title="Mes notifications" />

            <div className="max-w-4xl mx-auto pb-14 px-4 mt-6 space-y-5">
                {notifications.map((notification) => (
                    <div className="flex sm:flex-row flex-col items-center space-x-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 my-2 fill-orange-500"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                            />
                        </svg>
                        <p>{notification.data.notif}</p>
                        <p className="text-sm italic ml-3 text-gray-400">
                            {dayjs(notification.formatted_created_at).fromNow()}
                        </p>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}

Notifications.propTypes = {
    auth: PropTypes.object.isRequired,
};
