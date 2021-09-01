// (C) 2021 GoodData Corporation
import { useState } from "react";
import { ObjRef } from "@gooddata/sdk-model";
import { IConfigurationParentItem } from "./configuration/ConfigurationParentItem";

export interface IParentItem {
    title: string;
    ref: ObjRef;
    connectingAttributeRefs: ObjRef[];
}

export type SetItems = (items: IConfigurationParentItem[]) => void;

/**
 * TODO complete useItems to enable configuration
 */
export const useItems = (): [IConfigurationParentItem[], SetItems] => {
    const [items, setItems] = useState<IConfigurationParentItem[]>([]);

    return [items, setItems];
};