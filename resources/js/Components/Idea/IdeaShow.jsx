import React from "react";
import Linkify from "linkify-react"; //rendre les liens cliquables

export default function IdeaShow({ idea }) {
    return (
        <div className="flex flex-col">
            <div className="flex justify-between">
                <div className="flex flex-col mr-10">
                    <div className="flex items-center">
                        {idea.idea && (
                            <p className="text-sm uppercase font-semibold text-gray-900 mr-4">
                                {idea.idea}
                            </p>
                        )}
                        {idea.brand && (
                            <small className="text-sm text-gray-600">
                                {idea.brand}
                            </small>
                        )}
                    </div>
                    {idea.link && (
                        <p className="text-sm italic text-indigo-800 hover:text-indigo-500 max-w-lg overflow-ellipsis overflow-hidden">
                            <Linkify options={{ target: "blank" }}>
                                {idea.link}
                            </Linkify>
                        </p>
                    )}
                </div>
                {idea.details && (
                    <div className="w-2/12">
                        <p className="text-xs text-gray-900 bg-indigo-200 rounded-lg p-1 text-center">
                            {idea.details}
                        </p>
                    </div>
                )}
            </div>
            {idea.promo === 0 && (
                <div className="flex items-center mt-4">
                    <div className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4 mr-1"
                        >
                            <path d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" />
                        </svg>

                        <p className="text-sm text-gray-900 mr-2">en promo</p>
                    </div>
                    {idea.promo_details && (
                        <p className="text-xs italic text-gray-900 mt-1 bg-indigo-50 rounded-lg p-1 ml-2">
                            {idea.promo_details}
                        </p>
                    )}
                </div>
            )}
            {idea.membership && (
                <div className="flex bg-indigo-50 rounded-md p-1 mt-3">
                    <p className="text-xs italic text-gray-900">
                        Lien à utiliser pour bénéficier de la réduction de
                        parainnage ({idea.membership_reduction}) :&nbsp;
                    </p>
                    <p className="text-xs italic text-indigo-800 hover:text-indigo-500">
                        <Linkify options={{ target: "blank" }}>
                            {idea.membership}
                        </Linkify>
                    </p>
                </div>
            )}
        </div>
    );
}
