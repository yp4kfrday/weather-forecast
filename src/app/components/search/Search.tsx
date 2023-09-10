import { useState } from "react";
import { OptionsOrGroups, GroupBase } from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";

interface SearchProps {
    searchData: string | null;
    onSearchChange: (searchData: string | null) => void;
}

export const Search: React.FC<SearchProps> = ({ searchData, onSearchChange }) => {
    const [search, setSearch] = useState<string | null>(searchData);

    const handleOnChange = (searchData: string | null) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };

    const loadOptions = async (inputValue: string) => {
        try {
            const response = await fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions);

            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }

            const responseJSON = await response.json();

            console.log(responseJSON);

            return {
                options: responseJSON.data.map((city: { latitude: string; longitude: string; name: string; countryCode: string; }) => {
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`,
                    };
                }),
                hasMore: responseJSON.has_more,
            };
        } catch (error) {
            console.error("An error occurred:", error);
            // здесь будет компонент ошибки
            return {
                options: [],
                hasMore: false,
            };
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
