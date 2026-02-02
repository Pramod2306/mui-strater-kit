import { useAppStartup } from "@/shared/hooks/use-AppStartup";

export function AppStartupProvider({ children }: { children: React.ReactNode }) {
    useAppStartup();
    return <>{children}</>;
}