// (C) 2007-2019 GoodData Corporation
import { isEmpty } from "lodash";

/**
 * This exception is thrown when a fatal error occurs during the export processing - be it during interfacing with
 * the backend or other unexpected errors. The exception contains 'rc' field - this specifies the exit code
 * for the catalog export process.
 *
 * The CatalogExportError is produced in 'log-and-throw' fashion. Code that raises the exception SHOULD do all the
 * necessary logging and cleanup and then throw the CatalogExportError. The top-level error handler then emits
 * message included in the error and exits process with exit code equal to the included `rc` field.
 */
export class CatalogExportError extends Error {
    constructor(message: string, public readonly rc: number) {
        super(message);
    }
}

/*
 * Defines types used across catalog exporter
 */

/**
 * Exporter configuration
 */
export type CatalogExportConfig = {
    /**
     * Hostname where project lives
     */
    hostname: string | null;

    /**
     * Identifier of the project
     */
    projectId: string | null;

    /**
     * Name of the project - if project ID is not specified, then name must be specified and
     * will be used to find projects that match (fully) this name.
     */
    projectName: string | null;

    /**
     * User to authenticate as.
     */
    username: string | null;

    /**
     * Password to use for authentication
     */
    password: string | null;

    /**
     * File to write output to.
     */
    output: string | null;
};

/**
 * Subset of object meta used in exporter
 */
export type ObjectMeta = {
    /**
     * Object's title
     */
    title: string;

    /**
     * Object's identifier
     */
    identifier: string;

    /**
     * Object's tags
     */
    tags: string;
};

export type Attribute = {
    attribute: {
        meta: ObjectMeta;
        content: {
            displayForms: DisplayForm[];
        };
    };
};

export type DisplayForm = {
    meta: ObjectMeta;
};

export type Metric = {
    metric: {
        meta: ObjectMeta;
    };
};

export type Fact = {
    fact: {
        meta: ObjectMeta;
    };
};

export type DateDataSet = {
    dateDataSet: {
        meta: ObjectMeta;
        content: {
            attributes: Attribute[];
        };
    };
};

export type Catalog = {
    attributes: Attribute[];
    metrics: Metric[];
    facts: Fact[];
};

export type ProjectMetadata = {
    projectId: string;
    catalog: Catalog;
    dateDataSets: DateDataSet[];
    insights: ObjectMeta[];
};

//
// Type Guards
//

export function isAttribute(obj: any): obj is Attribute {
    return !isEmpty(obj) && (obj as Attribute).attribute !== undefined;
}

export function isMetric(obj: any): obj is Metric {
    return !isEmpty(obj) && (obj as Metric).metric !== undefined;
}

export function isFact(obj: any): obj is Fact {
    return !isEmpty(obj) && (obj as Fact).fact !== undefined;
}

export function isCatalogExportError(obj: any): obj is CatalogExportError {
    return !isEmpty(obj) && (obj as CatalogExportError).rc !== undefined;
}
