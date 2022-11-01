// (C) 2020-2022 GoodData Corporation
import { transformExecutionResult } from "../result";
import { defaultDateFormatter } from "../../dateFormatting/defaultDateFormatter";
import { mockResult, mockDimensions } from "./result.fixture";
import { getTransformDimensionHeaders } from "../DimensionHeaderConverter";

describe("transformExecutionResult", () => {
    const transformDimensionHeaders = getTransformDimensionHeaders(mockDimensions, defaultDateFormatter);
    it("should format date dimensions values", () => {
        const actual = transformExecutionResult(mockResult, transformDimensionHeaders);
        expect(actual).toMatchSnapshot();
    });
});
