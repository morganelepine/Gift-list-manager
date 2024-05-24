import { Head } from "@inertiajs/react";
import PropTypes from "prop-types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import Ideas from "@/Components/GiftList/Auth/Ideas/Ideas";

export default function Notifications({ auth }) {
    const [notif, setNotif] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/notifications`);
            const data = await response.json();
            setResults(data.notifications);
        } catch (error) {
            console.error("Error fetching notifications: ", error);
        }
    };

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
                <div className="flex sm:flex-row flex-col items-center space-x-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 my-2 fill-bordeaux-800"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" />
                    </svg>
                    <p>
                        Arthur a ajouté une nouvelle idée à sa liste{" "}
                        <span className="font-semibold">nom de la liste</span>
                    </p>
                    <p className="text-sm italic ml-3 text-gray-400">
                        Il y a 2 minutes
                    </p>
                </div>

                <div className="flex sm:flex-row flex-col items-center space-x-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 my-2 fill-indigo-500"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                    </svg>
                    <p>
                        Catherine souhaite accéder à votre liste{" "}
                        <span className="font-semibold">nom de la liste</span> :
                    </p>
                    <div className="flex items-center">
                        <button className="">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 hover:text-orange-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                        <button>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 hover:text-orange-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-sm italic text-gray-400">
                        Il y a 3 jours
                    </p>
                </div>

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
                    <p>
                        Bruno a commencé à suivre votre liste{" "}
                        <span className="font-semibold">nom de la liste</span>
                    </p>
                    <p className="text-sm italic ml-3 text-gray-400">
                        Il y a 3 jours
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

Notifications.propTypes = {
    auth: PropTypes.object.isRequired,
};
