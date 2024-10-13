import React from "react";
import { Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";

export default function NoListFollowed() {
    return (
        <div className="text-center">
            <p>Vous ne suivez pas encore de liste.</p>

            <Link
                href={route("lists.listsToFollow")}
                active={route().current("lists.listsToFollow")}
            >
                <PrimaryButton className="mt-3">
                    Chercher une liste
                </PrimaryButton>
            </Link>
        </div>
    );
}
