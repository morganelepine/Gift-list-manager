import React from "react";
import { Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";

export default function NoListCreated() {
    return (
        <div className="text-center">
            <p>
                Vous n’avez pas encore créé de liste. <br></br>
                Cliquez sur ce bouton pour créer votre première liste&nbsp;!
            </p>

            <Link
                href={route("lists.create")}
                active={route().current("lists.create")}
            >
                <PrimaryButton className="mt-3">Créer une liste</PrimaryButton>
            </Link>
        </div>
    );
}
