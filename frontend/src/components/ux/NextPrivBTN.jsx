"use client";

function NextPrivBTN({ onPrev, onNext }) {
    return (
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-10">
            <button
                onClick={onPrev}
                className="btn h-16 w-16 text-6xl opacity-65 btn-circle"
            >
                ❮
            </button>
            <button
                onClick={onNext}
                className="btn h-16 w-16 text-6xl opacity-65 btn-circle"
            >
                ❯
            </button>
        </div>
    );
}

export default NextPrivBTN;
