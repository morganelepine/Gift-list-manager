export default function Intro() {
    return (
        <div className="px-8 flex flex-col items-center">
            <div className="text-center">
                <h1 className="sm:text-6xl text-4xl font-yeseva mb-2 p-1 bg-gradient-to-r from-orange-500 to-bordeaux-500 inline-block text-transparent bg-clip-text">
                    MerryMate
                </h1>
                <h2
                    className="text-sm tracking-wide text-orange-500"
                    style={{ textWrap: "balance" }}
                >
                    Un <span className="italic">joyeux compagnon</span> pour les
                    moments de fêtes
                </h2>
            </div>

            <div className="mt-16 space-y-3">
                <div className="flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 mr-2 hidden sm:block"
                    >
                        <path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>

                    <p className="">
                        <span className="text-orange-600 font-bold">
                            Complétez
                        </span>{" "}
                        vos listes d'envies tout au long de l'année pour ne plus
                        être à court d'idées
                    </p>
                </div>

                <div className="flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 mr-2 hidden sm:block"
                    >
                        <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                    <p>
                        <span className="text-orange-600 font-bold">
                            Suivez
                        </span>{" "}
                        celles de vos ami·es et de votre famille pour trouver de
                        l'inspiration
                    </p>
                </div>

                <div className="flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 mr-2 hidden sm:block"
                    >
                        <path d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                    </svg>
                    <p>
                        <span className="text-orange-600 font-bold">
                            Communiquez
                        </span>{" "}
                        en un clic les cadeaux que vous souhaitez réserver ou
                        acheter
                    </p>
                </div>

                <div className="flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 mr-2 hidden sm:block"
                    >
                        <path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <p>
                        <span className="text-orange-600 font-bold">
                            Gagnez du temps
                        </span>{" "}
                        : fini le temps perdu à se coordonner pour savoir qui
                        offre quoi à qui
                    </p>
                </div>
            </div>
        </div>
    );
}
