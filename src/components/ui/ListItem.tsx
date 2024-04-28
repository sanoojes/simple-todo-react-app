import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

interface ListProps {
    id: number;
    text: string;
    completed?: boolean;
    onDelete(id: number): void;
    onComplete?(id: number): void;
}

const ListItem = ({ id, text, completed, onDelete, onComplete }: ListProps) => {
    const handleComplete = () => {
        if (onComplete) {
            onComplete(id);
        }
    };

    return (
        <li
            className={`flex justify-between items-center bg-neutral-50 bg-opacity-75 text-neutral-950 w-full rounded-full px-4 py-2 ${
                completed ? "line-through text-neutral-500" : ""
            }`}
        >
            {onComplete && (
                <Button onClick={handleComplete} aria-label="Complete task">
                    <FontAwesomeIcon
                        className="text-green-400"
                        icon={faCheck}
                    />
                </Button>
            )}
            <span className="flex-1 ml-4">{text}</span>
            <Button onClick={() => onDelete(id)} aria-label="Delete task">
                <FontAwesomeIcon icon={faXmark} className="text-red-400" />
            </Button>
        </li>
    );
};

export default ListItem;
