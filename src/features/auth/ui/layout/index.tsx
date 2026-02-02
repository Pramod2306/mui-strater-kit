import { Box } from "@mui/material";
import { Outlet } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export function AuthLayout() {
    const { t } = useTranslation();
    return <Box display="flex" justifyContent="center" alignItems="center" height="100dvh" >
        <Box sx={{ flex: 1, height: '100%' }} >
            <p>{t("auth.layout.title")}</p>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ flex: 1, height: '100%' }} >

            <Outlet />
        </Box>

    </Box>;
}