import {
	Button,
	FormControl,
	FormHelperText,
	InputLabel,
	Link,
	OutlinedInput,
	Paper,
	Stack,
} from "@mui/material";
import { Link as RouterLink } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LoginRequest } from "@/features/auth/types";
import { loginSchema, type LoginFormValues } from "./login-form.schema";

interface LoginFormProps {
	onSubmit: (data: LoginRequest) => void;
	isLoading?: boolean;
}

export function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
	const { t } = useTranslation();
	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: "", password: "" },
	});

	const submitting = isSubmitting || isLoading;

	return (
		<Paper elevation={3} sx={{ p: 2 }}>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<Stack spacing={2} maxWidth={320}>
					<Controller
						name="email"
						control={control}
						render={({ field, fieldState: { error } }) => (
							<FormControl fullWidth error={!!error} required>
								<InputLabel htmlFor="login-email">
									{t("auth.loginForm.email")}
								</InputLabel>
								<OutlinedInput
									{...field}
									id="login-email"
									label={t("auth.loginForm.email")}
									type="email"
									autoComplete="email"
								/>
								{error && (
									<FormHelperText>{error.message}</FormHelperText>
								)}
							</FormControl>
						)}
					/>
					<Controller
						name="password"
						control={control}
						render={({ field, fieldState: { error } }) => (
							<FormControl fullWidth error={!!error} required>
								<InputLabel htmlFor="login-password">
									{t("auth.loginForm.password")}
								</InputLabel>
								<OutlinedInput
									{...field}
									id="login-password"
									label={t("auth.loginForm.password")}
									type="password"
									autoComplete="current-password"
								/>
								{error && (
									<FormHelperText>{error.message}</FormHelperText>
								)}
							</FormControl>
						)}
					/>
					<Link
						component={RouterLink}
						to="/auth/forgot-password"
						variant="body2"
						sx={{ alignSelf: "flex-end" }}
					>
						{t("auth.loginForm.forgotPassword")}
					</Link>
					<Button
						type="submit"
						variant="contained"
						disabled={submitting}
						loading={submitting}
					>
						{t("auth.loginForm.signIn")}
					</Button>
				</Stack>
			</form>
		</Paper>
	);
}
