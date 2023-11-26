import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Button from "@/Components/GiftList/Ideas/Purchased/Button";
import Linkify from "linkify-react"; //rendre les liens cliquables

dayjs.extend(relativeTime);

export default function Ideas_purchased({ auth, ideas }) {
    // console.log("listOfIdeas : ", listOfIdeas);

    return (
        <div className="w-full">
            {ideas.map((idea) => (
                <div key={idea.id}>
                    <div className="my-2 flex justify-between">
                        {/* BUTTON */}
                        <div className="flex items-center mr-2">
                            <Button auth={auth} idea={idea} />
                        </div>

                        {/* IDEA */}
                        <div className="p-3 flex flex-1 flex-col bg-gray-200 shadow-sm rounded-lg">
                            <div className="flex flex-col">
                                <div className="flex flex-col">
                                    <div className="flex justify-between">
                                        <div className="flex flex-col mr-10">
                                            <div className="flex items-center">
                                                {idea.idea && (
                                                    <p className="text-sm uppercase font-semibold text-gray-400 mr-4 line-through">
                                                        {idea.idea}
                                                    </p>
                                                )}
                                                {idea.brand && (
                                                    <small className="text-sm text-gray-400 mr-4 line-through">
                                                        {idea.brand}
                                                    </small>
                                                )}
                                            </div>
                                            {idea.link && (
                                                <p className="text-sm italic text-gray-400 hover:text-gray-700 max-w-lg overflow-ellipsis overflow-hidden line-through">
                                                    <Linkify
                                                        options={{
                                                            target: "blank",
                                                        }}
                                                    >
                                                        {idea.link}
                                                    </Linkify>
                                                </p>
                                            )}
                                        </div>
                                        {idea.details && (
                                            <div className="w-2/12">
                                                <p className="text-xs text-gray-400 bg-gray-200 rounded-lg p-1 text-center line-through">
                                                    {idea.details}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <small className="text-xs italic text-gray-700">
                                            Purchased by {idea.status_user}{" "}
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
    ideas: PropTypes.array,
};
