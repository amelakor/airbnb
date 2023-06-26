"use client";
import useCountries from "@/app/hooks/useCountries";
import Select from "react-select";

export type CountrySelectValues = {
    value: string;
    label: string;
    latlng: number[];
    region: string;
    flag: string;
};

interface CountrySelectProps {
    onChange: (value: CountrySelectValues) => void;
    value?: CountrySelectValues;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
    const { getAll } = useCountries();
    return (
        <div>
            <Select
                value={value}
                placeholder="Select a country"
                isClearable
                onChange={(value: any) =>
                    onChange(value as CountrySelectValues)
                }
                options={getAll()}
                formatOptionLabel={(option: any) => (
                    <div className="flex flex-row items-center gap-2">
                        <div>{option.flag}</div>
                        <div>
                            {option.label} -{" "}
                            <span className="text-neutral-500 gap-3">
                                {option.region}
                            </span>
                        </div>
                    </div>
                )}
                classNames={{
                    control: () => "p-3 border-2",
                    input: () => "text-lg",
                    option: () => "text-lg",
                }}
                theme={(theme: any) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: "black",
                        primary25: "#ffe4e6",
                    },
                })}
            />
        </div>
    );
};

export default CountrySelect;
