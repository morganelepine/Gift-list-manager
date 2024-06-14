import PropTypes from "prop-types";
import NotifDate from "@/Components/Profile/Notifications/Utils/NotifDate";

export default function RequestDeclined({ notification }) {
    return (
        <div className="flex items-center">
            <div className="my-2 mr-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-orange-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
            </div>
            <p>
                <span>{notification.data.listOwner}</span> a refusé votre
                demande de suivre sa liste{" "}
                <span className="font-semibold">{notification.data.list}</span>
                <NotifDate notification={notification} />
            </p>
        </div>
    );
}

RequestDeclined.propTypes = {
    notification: PropTypes.object.isRequired,
};
