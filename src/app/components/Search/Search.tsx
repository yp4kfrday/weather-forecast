import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";
import { error } from "console";

interface SearchProps {
    searchData: string | null;
    onSearchChange: (searchData: string | null) => void;
}

export const Search: React.FC<SearchProps> = ({ onSearchChange }) => {
    const [search, setSearch] = useState<string | null>(null);

    const handleOnChange = (searchData: string) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };

    const loadOptions = async (inputValue: string) => {
        try {
            const response = await fetch(
                `${GEO_API_URL}/cities?languageCode=ru&minPopulation=1000000&namePrefix=${inputValue}`,
                geoApiOptions
            );

            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }

            const responseData = await response.json();

            return {
                options: responseData.data.map((city: { latitude: number; longitude: number; name: string; countryCode: string; }) => ({
                    value: `${city.latitude}, ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode}`,
                })),

            };


        } catch (error) {
            console.error("An error occurred:", error);
            // Здесь можно обработать ошибку
            return { options: [] }; // Важно вернуть объект с полем options
        }
    };
    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions} />
    );
};
