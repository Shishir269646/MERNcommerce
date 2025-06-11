"use client";

import {  useState } from "react";

function FilterButton({ onFilterChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState({
        brands: [],
        minPrice: 0,
        maxPrice: 7000,
        minDeliveryTime: 3,
    });
    const [activeTab, setActiveTab] = useState('brand');
    const [priceRange, setPriceRange] = useState({ min: 300, max: 3500 });
    const [deliveryTime, setDeliveryTime] = useState(30);

    const brandOptions = [
        { id: 'apple', name: 'Apple (56)', letter: 'A' },
        { id: 'asus', name: 'Asus (97)', letter: 'A' },
        { id: 'acer', name: 'Acer (234)', letter: 'A' },
        { id: 'allview', name: 'Allview (45)', letter: 'A' },
        { id: 'atari', name: 'Atari (176)', letter: 'A' },
        { id: 'amd', name: 'AMD (49)', letter: 'A' },
        { id: 'aruba', name: 'Aruba (16)', letter: 'A' },
        { id: 'beats', name: 'Beats (56)', letter: 'B' },
        { id: 'bose', name: 'Bose (97)', letter: 'B' },
        { id: 'benq', name: 'BenQ (45)', letter: 'B' },
        { id: 'bosch', name: 'Bosch (176)', letter: 'B' },
        { id: 'brother', name: 'Brother (176)', letter: 'B' },
        { id: 'biostar', name: 'Biostar (49)', letter: 'B' },
        { id: 'braun', name: 'Braun (16)', letter: 'B' },
        { id: 'blaupunkt', name: 'Blaupunkt (45)', letter: 'B' },
        { id: 'benq2', name: 'BenQ (23)', letter: 'B' },
        { id: 'canon', name: 'Canon (49)', letter: 'C' },
        { id: 'cisco', name: 'Cisco (97)', letter: 'C' },
        { id: 'cowon', name: 'Cowon (234)', letter: 'C' },
        { id: 'clevo', name: 'Clevo (45)', letter: 'C' },
        { id: 'corsair', name: 'Corsair (15)', letter: 'C' },
        { id: 'csl', name: 'CSL (49)', letter: 'C' },
        { id: 'dell', name: 'Dell (56)', letter: 'D' },
        { id: 'dogfish', name: 'Dogfish (24)', letter: 'D' },
        { id: 'dyson', name: 'Dyson (234)', letter: 'D' },
        { id: 'dobe', name: 'Dobe (5)', letter: 'D' },
        { id: 'digitus', name: 'Digitus (1)', letter: 'D' },
        { id: 'emetec', name: 'Emetec (56)', letter: 'E' },
        { id: 'extreme', name: 'Extreme (10)', letter: 'E' },
        { id: 'elgato', name: 'Elgato (234)', letter: 'E' },
        { id: 'emerson', name: 'Emerson (45)', letter: 'E' },
        { id: 'emi', name: 'EMI (176)', letter: 'E' },
        { id: 'fugoo', name: 'Fugoo (49)', letter: 'F' },
        { id: 'fujitsu', name: 'Fujitsu (97)', letter: 'F' },
        { id: 'fitbit', name: 'Fitbit (56)', letter: 'F' },
        { id: 'foxconn', name: 'Foxconn (234)', letter: 'F' },
        { id: 'floston', name: 'Floston (45)', letter: 'F' },
    ];

    const groupedBrands = brandOptions.reduce((acc, brand) => {
        if (!acc[brand.letter]) {
            acc[brand.letter] = [];
        }
        acc[brand.letter].push(brand);
        return acc;
    }, {});

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setFilters((prevFilters) => {
            const updatedBrands = checked
                ? [...prevFilters.brands, value]
                : prevFilters.brands.filter((brand) => brand !== value);
            return { ...prevFilters, brands: updatedBrands };
        });
    };

    const handlePriceRangeChange = (event) => {
        const { id, value } = event.target;
        const newValue = parseInt(value, 10);
        setPriceRange((prevRange) => ({
            ...prevRange,
            [id.split('-')[0]]: newValue,
        }));
        setFilters((prevFilters) => ({
            ...prevFilters,
            minPrice: id === 'min-price' ? newValue : prevFilters.minPrice,
            maxPrice: id === 'max-price' ? newValue : prevFilters.maxPrice,
        }));
    };

    const handlePriceInputChange = (event) => {
        const { id, value } = event.target;
        const newValue = parseInt(value, 10) || 0;
        setPriceRange((prevRange) => ({ ...prevRange, [id]: newValue }));
        setFilters((prevFilters) => ({
            ...prevFilters,
            minPrice: id === 'min-price-input' ? newValue : prevFilters.minPrice,
            maxPrice: id === 'max-price-input' ? newValue : prevFilters.maxPrice,
        }));
    };

    const handleDeliveryTimeChange = (event) => {
        const newValue = parseInt(event.target.value, 10);
        setDeliveryTime(newValue);
        setFilters((prevFilters) => ({ ...prevFilters, minDeliveryTime: newValue }));
    };

    const handleApplyFilters = () => {
        onFilterChange(filters);
        setIsOpen(false);
    };

    const handleClearFilters = () => {
        setFilters({ brands: [], minPrice: 0, maxPrice: 7000, minDeliveryTime: 3 });
        setPriceRange({ min: 0, max: 7000 });
        setDeliveryTime(3);
        onFilterChange({ brands: [], minPrice: 0, maxPrice: 7000, minDeliveryTime: 3 });
        setIsOpen(false);
    };

    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M12 10.5h7.5M13.5 15H6.75" />
                </svg>
                Filters
            </button>

            {isOpen && (
                <div
                    id="filterModal"
                    className="fixed left-0 right-0 top-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full bg-black bg-opacity-50"
                    onClick={(e) => {
                        if (e.target.id === 'filterModal') {
                            setIsOpen(false);
                        }
                    }}
                >
                    <div className="relative h-full w-full max-w-xl md:h-auto">
                        {/* Modal content */}
                        <div className="relative rounded-lg bg-white shadow dark:bg-gray-800">
                            {/* Modal header */}
                            <div className="flex items-start justify-between rounded-t p-4 md:p-5">
                                <h3 className="text-lg font-normal text-gray-500 dark:text-gray-400">Filters</h3>
                                <button
                                    type="button"
                                    className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M6 18 17.94 6M18 18 6.06 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Modal body */}
                            <div className="px-4 md:px-5">
                                <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                                    <ul className="-mb-px flex flex-wrap text-center text-sm font-medium" id="myTab"
                                        data-tabs-toggle="#myTabContent" role="tablist">
                                        <li className="mr-1" role="presentation">
                                            <button
                                                className={`inline-block pb-2 pr-4 ${activeTab === 'brand' ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-500' : 'hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'}`}
                                                id="brand-tab"
                                                onClick={() => setActiveTab('brand')}
                                                type="button"
                                                role="tab"
                                                aria-controls="brand"
                                                aria-selected={activeTab === 'brand'}
                                            >
                                                Brand
                                            </button>
                                        </li>
                                        <li className="mr-1" role="presentation">
                                            <button
                                                className={`inline-block px-4 pb-2 ${activeTab === 'advanced-filters' ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-500' : 'hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'}`}
                                                id="advanced-filers-tab"
                                                onClick={() => setActiveTab('advanced-filters')}
                                                type="button"
                                                role="tab"
                                                aria-controls="advanced-filters"
                                                aria-selected={activeTab === 'advanced-filters'}
                                            >
                                                Advanced Filters
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div id="myTabContent">
                                    {activeTab === 'brand' && (
                                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3" id="brand" role="tabpanel"
                                            aria-labelledby="brand-tab">
                                            {Object.keys(groupedBrands).map((letter) => (
                                                <div key={letter} className="space-y-2">
                                                    <h5 className="text-lg font-medium uppercase text-black dark:text-white">{letter}</h5>
                                                    {groupedBrands[letter].map((brand) => (
                                                        <div key={brand.id} className="flex items-center">
                                                            <input
                                                                id={brand.id}
                                                                type="checkbox"
                                                                value={brand.id}
                                                                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                                                                checked={filters.brands.includes(brand.id)}
                                                                onChange={handleCheckboxChange}
                                                            />
                                                            <label
                                                                htmlFor={brand.id}
                                                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                            >
                                                                {brand.name}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {activeTab === 'advanced-filters' && (
                                        <div className="space-y-4" id="advanced-filters" role="tabpanel" aria-labelledby="advanced-filters-tab">
                                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <label htmlFor="min-price"
                                                            className="block text-sm font-medium text-gray-900 dark:text-white"> Min Price
                                                        </label>
                                                        <input
                                                            id="min-price"
                                                            type="range"
                                                            min="0"
                                                            max="7000"
                                                            value={priceRange.min}
                                                            step="1"
                                                            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
                                                            onChange={handlePriceRangeChange}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label htmlFor="max-price"
                                                            className="block text-sm font-medium text-gray-900 dark:text-white"> Max Price
                                                        </label>
                                                        <input
                                                            id="max-price"
                                                            type="range"
                                                            min="0"
                                                            max="7000"
                                                            value={priceRange.max}
                                                            step="1"
                                                            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
                                                            onChange={handlePriceRangeChange}
                                                        />
                                                    </div>

                                                    <div className="col-span-2 flex items-center justify-between space-x-2">
                                                        <input
                                                            type="number"
                                                            id="min-price-input"
                                                            value={priceRange.min}
                                                            min="0"
                                                            max="7000"
                                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 "
                                                            placeholder=""
                                                            required
                                                            onChange={handlePriceInputChange}
                                                        />

                                                        <div className="shrink-0 text-sm font-medium dark:text-gray-300">to</div>

                                                        <input
                                                            type="number"
                                                            id="max-price-input"
                                                            value={priceRange.max}
                                                            min="0"
                                                            max="7000"
                                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                                            placeholder=""
                                                            required
                                                            onChange={handlePriceInputChange}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    <div>
                                                        <label htmlFor="min-delivery-time"
                                                            className="block text-sm font-medium text-gray-900 dark:text-white"> Min Delivery
                                                            Time (Days) </label>

                                                        <input
                                                            id="min-delivery-time"
                                                            type="range"
                                                            min="3"
                                                            max="50"
                                                            value={deliveryTime}
                                                            step="1"
                                                            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
                                                            onChange={handleDeliveryTime}

                                                        />
                                                    </div>

                                                    <input
                                                        type="number"
                                                        id="min-delivery-time-input"
                                                        value={deliveryTime}
                                                        min="3"
                                                        max="50"
                                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 "
                                                        placeholder=""
                                                        required
                                                        onChange={handleDeliveryTimeChange}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <h6 className="mb-2 text-sm font-medium text-black dark:text-white">Condition</h6>

                                                <ul
                                                    className="flex w-full items-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                >
                                                    <li className="w-full border-b border-r border-gray-200 dark:border-gray-600">
                                                        <div className="flex items-center pl-3">
                                                            <input
                                                                id="condition-new"
                                                                type="checkbox"
                                                                value="new"
                                                                className="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                                                            />
                                                            <label htmlFor="condition-new" className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">
                                                                New
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li className="w-full border-b border-gray-200 dark:border-gray-600">
                                                        <div className="flex items-center pl-3">
                                                            <input
                                                                id="condition-used"
                                                                type="checkbox"
                                                                value="used"
                                                                className="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                                                            />
                                                            <label htmlFor="condition-used" className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">
                                                                Used
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Modal footer */}
                            <div className="flex items-center justify-end space-x-2 rounded-b border-t border-gray-200 p-4 md:p-5 dark:border-gray-600">
                                <button
                                    type="button"
                                    className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                                    onClick={handleClearFilters}
                                >
                                    Clear Filters
                                </button>
                                <button
                                    type="button"
                                    className="rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    onClick={handleApplyFilters}
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FilterButton;
