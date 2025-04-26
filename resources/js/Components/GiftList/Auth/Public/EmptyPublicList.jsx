import PropTypes from "prop-types";
import { Link } from "@inertiajs/react";
import SmallButton from "@/Components/Buttons/SmallButton";

export default function EmptyPublicList({ list }) {
    return (
        <div className="text-center">
            <p>
                Votre liste est vide. Cliquez sur ce bouton pour la compléter :
            </p>
            <Link
                as="button"
                href={route("ideas.create", list.id)}
                className="mt-2"
            >
                <SmallButton>Commencer la liste</SmallButton>
            </Link>
        </div>
    );
}

EmptyPublicList.propTypes = {
    list: PropTypes.object,
};
