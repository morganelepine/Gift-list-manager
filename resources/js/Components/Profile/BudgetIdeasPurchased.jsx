import PropTypes from "prop-types";
import Linkify from "linkify-react"; //rendre les liens cliquables

export default function BudgetIdeasPurchased({ idea }) {
    // console.log("listOfIdeas : ", listOfIdeas);

    return (
        <div className="p-3 flex flex-1 flex-col bg-white shadow-sm rounded-lg">
            <div className="flex justify-between">
                <div className="flex flex-col mr-3 w-full">
                    <div className="flex flex-wrap items-center">
                        {idea.idea && (
                            <p className="text-sm font-semibold text-gray-900 mr-2 mb-1 sm:mb-0 sm:mr-4">
                                {idea.idea}
                            </p>
                        )}
                        {idea.details && (
                            <p className="min-w-max text-xs text-center text-gray-900 bg-indigo-200 rounded-md px-2 mb-1 sm:mb-0 mr-4">
                                {idea.details}
                            </p>
                        )}
                        {idea.brand && (
                            <small className="text-sm text-center text-gray-600 mb-1 sm:mb-0 mr-4">
                                {idea.brand}
                            </small>
                        )}
                    </div>
                    {idea.link && (
                        <p className="text-sm italic text-indigo-800 hover:text-indigo-500 max-h-5 text-ellipsis overflow-hidden break-all">
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
                {idea.price && (
                    <div className="min-w-max">
                        <p className="text-xs text-gray-900 border border-indigo-500 rounded-lg p-1 text-center">
                            {idea.price} €
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

BudgetIdeasPurchased.propTypes = {
    idea: PropTypes.object,
};
