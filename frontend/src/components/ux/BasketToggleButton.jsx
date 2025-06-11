import { FaShoppingBasket } from "react-icons/fa";

export default function BasketToggleButton({ basketCount, onClick }) {
    return (
        <button
            onClick={onClick}
            className="relative p-2 text-white bg-gray-800 rounded-full hover:bg-gray-700"
        >
            <FaShoppingBasket size={20} />
            {basketCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {basketCount}
                </span>
            )}
        </button>
    );
}
