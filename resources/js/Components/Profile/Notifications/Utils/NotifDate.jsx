import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";

dayjs.extend(relativeTime);
dayjs.locale("fr");

export default function NotifDate({ notification }) {
    return (
        <span className="text-sm italic ml-3 text-gray-400">
            {dayjs(notification.created_at).fromNow()}
        </span>
    );
}

NotifDate.propTypes = {
    notification: PropTypes.object.isRequired,
};
