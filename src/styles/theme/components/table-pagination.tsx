import type * as React from "react";
import type { Components } from "@mui/material/styles";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

import type { Theme } from "../types";

function PreviousButtonIcon(): React.JSX.Element {
	return <CaretLeftIcon size="var(--fontSize-md)" />;
}

function NextButtonIcon(): React.JSX.Element {
	return <CaretRightIcon size="var(--fontSize-md)" />;
}

export const MuiTablePagination = {
	defaultProps: {
		slotProps: {
			actions: { nextButtonIcon: { component: NextButtonIcon }, previousButtonIcon: { component: PreviousButtonIcon } },
			select: { size: "small", variant: "outlined" },
		},
	},
	styleOverrides: { input: { marginRight: "16px", padding: 0 } },
} satisfies Components<Theme>["MuiTablePagination"];
