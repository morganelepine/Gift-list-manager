import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CancelPurchaseButton from "@/Components/Ideas/UserList/Purchased/CancelPurchaseButton";
import Linkify from "linkify-react"; //rendre les liens cliquables

dayjs.extend(relativeTime);

export default function Ideas_purchased({ auth, ideas }) {
    // console.log("listOfIdeas : ", listOfIdeas);

    return (
        <div className="w-full space-y-5 sm:space-y-0">
            {ideas.map((idea) => (
                <div key={idea.id}>
                    <div className="my-2 sm:flex items-center">
                        {/* CANCEL PURCHASE BUTTON */}
                        {idea.status_user === auth.user.name && (
                            <div className="flex sm:flex-col mr-2 mb-1 sm:mb-0">
                                <CancelPurchaseButton idea={idea} />
                            </div>
                        )}

                        {/* IDEA */}
                        <div className="p-3 flex flex-1 flex-col bg-white shadow rounded-lg">
                            <div className="flex justify-between">
                                <div className="flex flex-col mr-3 w-full">
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-wrap items-center">
                                            {(idea.favorite === 1 ||
                                                idea.idea) && (
                                                <p className="flex items-center text-sm sm:uppercase text-gray-400 mr-2 mb-1 sm:mb-0 sm:mr-4 line-through">
                                                    {idea.favorite === 1 && (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 16 16"
                                                            fill="currentColor"
                                                            className="w-4 h-4 mr-1 fill-gray-400"
                                                        >
                                                            <path d="M2 6.342a3.375 3.375 0 0 1 6-2.088 3.375 3.375 0 0 1 5.997 2.26c-.063 2.134-1.618 3.76-2.955 4.784a14.437 14.437 0 0 1-2.676 1.61c-.02.01-.038.017-.05.022l-.014.006-.004.002h-.002a.75.75 0 0 1-.592.001h-.002l-.004-.003-.015-.006a5.528 5.528 0 0 1-.232-.107 14.395 14.395 0 0 1-2.535-1.557C3.564 10.22 1.999 8.558 1.999 6.38L2 6.342Z" />
                                                        </svg>
                                                    )}
                                                    {idea.idea}
                                                </p>
                                            )}
                                            {idea.brand && (
                                                <small className="text-sm text-center text-gray-400 mb-1 sm:mb-0 mr-4 line-through">
                                                    {idea.brand}
                                                </small>
                                            )}
                                        </div>
                                    </div>
                                    {idea.link && (
                                        <p className="text-sm italic text-gray-400 hover:text-indigo-500 max-h-5 text-ellipsis overflow-hidden break-all line-through">
                                            <Linkify
                                                options={{
                                                    target: "blank",
                                                }}
                                            >
                                                {idea.link}
                                            </Linkify>
                                        </p>
                                    )}
                                    <div className="flex justify-end items-center text-right">
                                        <small className="text-xs italic text-gray-700">
                                            Acheté
                                            {idea.status_user === auth.user.name
                                                ? " "
                                                : ` par ${idea.status_user} `}
                                            {dayjs(idea.updated_at).fromNow()}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

Ideas_purchased.propTypes = {
    auth: PropTypes.object.isRequired,
    ideas: PropTypes.array,
};
