// (C) 2022 GoodData Corporation

import React, { useCallback } from "react";
import { useToastMessage } from "@gooddata/sdk-ui-kit";
import {
    selectDashboardRef,
    selectEnableInsightExportScheduling,
    selectIsScheduleEmailDialogOpen,
    selectIsScheduleEmailManagementDialogOpen,
    uiActions,
    useDashboardDispatch,
    useDashboardSelector,
} from "../../../model";
import { ScheduledEmailDialog, ScheduledEmailManagementDialog } from "../../scheduledEmail";

export const useScheduledEmailDialogProvider = () => {
    const dispatch = useDashboardDispatch();
    const dashboardRef = useDashboardSelector(selectDashboardRef);
    const isInsightExportSchedulingEnabled = useDashboardSelector(selectEnableInsightExportScheduling);

    const openScheduleEmailingDialog = () => dispatch(uiActions.openScheduleEmailDialog());
    const closeScheduleEmailingDialog = () => dispatch(uiActions.closeScheduleEmailDialog());
    const openScheduleEmailingManagementDialog = () =>
        isInsightExportSchedulingEnabled && dispatch(uiActions.openScheduleEmailManagementDialog());
    const closeScheduleEmailingManagementDialog = () =>
        isInsightExportSchedulingEnabled && dispatch(uiActions.closeScheduleEmailManagementDialog());

    /*
     * exports and scheduling are not available when rendering a dashboard that is not persisted.
     * this can happen when a new dashboard is created and is being edited.
     *
     * the setup of menu items available in the menu needs to reflect this.
     */
    const defaultOnScheduleEmailing = useCallback(() => {
        if (!dashboardRef) {
            return;
        }

        if (isInsightExportSchedulingEnabled) {
            openScheduleEmailingManagementDialog();
        } else {
            openScheduleEmailingDialog();
        }
    }, [dashboardRef, isInsightExportSchedulingEnabled]);

    return {
        defaultOnScheduleEmailing,
        openScheduleEmailingDialog,
        closeScheduleEmailingDialog,
        openScheduleEmailingManagementDialog,
        closeScheduleEmailingManagementDialog,
    };
};

export const ScheduledEmailDialogProvider = () => {
    const {
        openScheduleEmailingDialog,
        closeScheduleEmailingDialog,
        openScheduleEmailingManagementDialog,
        closeScheduleEmailingManagementDialog,
    } = useScheduledEmailDialogProvider();
    const { addSuccess, addError } = useToastMessage();
    const isScheduleEmailingDialogOpen = useDashboardSelector(selectIsScheduleEmailDialogOpen);
    const isScheduleEmailingManagementDialogOpen = useDashboardSelector(
        selectIsScheduleEmailManagementDialogOpen,
    );

    const onScheduleEmailingError = useCallback(() => {
        closeScheduleEmailingDialog();
        addError({ id: "dialogs.schedule.email.submit.error" });
    }, []);

    const onScheduleEmailingSuccess = useCallback(() => {
        closeScheduleEmailingDialog();
        addSuccess({ id: "dialogs.schedule.email.submit.success" });
    }, []);

    const onScheduleEmailingCancel = useCallback(() => {
        closeScheduleEmailingDialog();
        openScheduleEmailingManagementDialog();
    }, []);

    const onScheduleEmailingManagementDelete = useCallback(() => {
        addSuccess({ id: "dialogs.schedule.email.delete.success" });
    }, []);

    const onScheduleEmailingManagementAdd = useCallback(() => {
        closeScheduleEmailingManagementDialog();
        openScheduleEmailingDialog();
    }, []);

    const onScheduleEmailingManagementClose = useCallback(() => {
        closeScheduleEmailingManagementDialog();
    }, []);

    const onScheduleEmailingManagementLoadingError = useCallback(() => {
        closeScheduleEmailingManagementDialog();
        addError({ id: "dialogs.schedule.management.load.error" });
    }, []);

    const onScheduleEmailingManagementDeleteError = useCallback(() => {
        closeScheduleEmailingManagementDialog();
        addError({ id: "dialogs.schedule.management.delete.error" });
    }, []);

    return (
        <>
            {isScheduleEmailingManagementDialogOpen && (
                <ScheduledEmailManagementDialog
                    isVisible={isScheduleEmailingManagementDialogOpen}
                    onAdd={onScheduleEmailingManagementAdd}
                    onClose={onScheduleEmailingManagementClose}
                    onDeleteSuccess={onScheduleEmailingManagementDelete}
                    onLoadError={onScheduleEmailingManagementLoadingError}
                    onDeleteError={onScheduleEmailingManagementDeleteError}
                />
            )}
            {isScheduleEmailingDialogOpen && (
                <ScheduledEmailDialog
                    isVisible={isScheduleEmailingDialogOpen}
                    onCancel={onScheduleEmailingCancel}
                    onError={onScheduleEmailingError}
                    onSuccess={onScheduleEmailingSuccess}
                />
            )}
        </>
    );
};