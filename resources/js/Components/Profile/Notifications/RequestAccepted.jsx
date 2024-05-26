import PropTypes from "prop-types";
import NotifDate from "@/Components/Profile/Notifications/Utils/NotifDate";

export default function RequestAccepted({ notification }) {
    return (
        <div className="flex items-center">
            <div className="my-2 mr-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 fill-indigo-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" />
                </svg>
            </div>
            <p>
                <span>{notification.data.listOwner}</span> a accepté votre
                demande de suivre sa liste{" "}
                <span className="font-semibold">{notification.data.list}</span>
                <NotifDate notification={notification} />
            </p>
        </div>
    );
}

RequestAccepted.propTypes = {
    notification: PropTypes.object.isRequired,
};
