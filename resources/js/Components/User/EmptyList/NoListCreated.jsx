import React from "react";
import { Link } from "@inertiajs/react";
import SmallButton from "@/Components/Buttons/SmallButton";

export default function NoListCreated({ listType }) {
    return (
        <div className="text-center">
            <p>
                Vous n’avez pas encore créé de liste {listType}. <br></br>
            </p>

            <Link href={route("lists.create")}>
                <SmallButton className="mt-3">
                    Créer une liste {listType}
                </SmallButton>
            </Link>
        </div>
    );
}
