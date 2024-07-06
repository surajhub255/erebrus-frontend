import React from "react";

interface IData {
    country: string;
    value: string | number;
}

interface IProps {
    data: IData[];
    title?: string;
    "value-prefix"?: string;
    "value-suffix"?: string;
    color?: string;
    tooltipBgColor?: string;
    tooltipTextColor?: string;
    size?: string;
}

export declare const ReactWorldCountriesMap: React.FC<IProps>;