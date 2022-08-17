// (C) 2007-2022 GoodData Corporation
import React from "react";
import { Dropdown, DropdownButton } from "@gooddata/sdk-ui-kit";
import { ObjRef, IInsight, isInsight, insightVisualizationUrl } from "@gooddata/sdk-model";
import { IntlShape, useIntl } from "react-intl";
import { IDrillConfigItem, isDrillToInsightConfig } from "../../../../drill/types";
import { InsightList } from "../../../../insightList";
import { selectInsightsMap, useDashboardSelector } from "../../../../../model";

export interface IInsightDropdownProps {
    insightConfig: IDrillConfigItem;
    onSelect: (targetItem: IInsight) => void;
}

const DROPDOWN_ALIGN_POINTS = [
    {
        align: "bl tl",
        offset: {
            x: 0,
            y: 4,
        },
    },
    {
        align: "tl bl",
        offset: {
            x: 0,
            y: -4,
        },
    },
];

function getButtonValue(title: string, intl: IntlShape, ref?: ObjRef) {
    if (!ref) {
        return intl.formatMessage({ id: "configurationPanel.drillConfig.selectInsight" });
    }

    return title || intl.formatMessage({ id: "loading" });
}

export const InsightDropdown: React.FC<IInsightDropdownProps> = ({ insightConfig, onSelect }) => {
    const intl = useIntl();

    const insights = useDashboardSelector(selectInsightsMap);

    let buttonText = "";
    let insightType: string | null = null;

    if (isDrillToInsightConfig(insightConfig) && insightConfig.insightRef) {
        const insight = insights.get(insightConfig.insightRef);

        if (isInsight(insight)) {
            buttonText = getButtonValue(insight.insight.title, intl, insightConfig.insightRef);
            const insightUrl = insightVisualizationUrl(insight);
            insightType = insightUrl?.split(":")[1];
        }
    }

    return (
        <Dropdown
            className="s-report_select report-select"
            closeOnMouseDrag
            alignPoints={DROPDOWN_ALIGN_POINTS}
            renderButton={({ isOpen, toggleDropdown }) => (
                <DropdownButton
                    value={buttonText}
                    onClick={toggleDropdown}
                    isOpen={isOpen}
                    isSmall={false}
                    iconLeft={insightType ? `gd-vis-type-${insightType}` : undefined}
                    className="gd-button-small s-visualization-button-target-insight"
                />
            )}
            renderBody={({ closeDropdown }) => {
                return (
                    <div className="open-visualizations s-open-visualizations">
                        <InsightList
                            selectedRef={
                                isDrillToInsightConfig(insightConfig) ? insightConfig.insightRef : undefined
                            }
                            height={200}
                            onSelect={(insight) => {
                                onSelect(insight);
                                closeDropdown();
                            }}
                        />
                    </div>
                );
            }}
        />
    );
};