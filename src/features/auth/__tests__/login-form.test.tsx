import { render, screen, within } from "@/testing/test-utils";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { LoginForm } from "../ui/forms/login-form";

describe("LoginForm", () => {
	it("calls onSubmit with email and password when submitted", async () => {
		const user = userEvent.setup();
		const onSubmit = vi.fn();
		render(<LoginForm onSubmit={onSubmit} />);

		const form = screen.getByRole("form");
		await user.type(within(form).getByLabelText(/email/i), "test@example.com");
		await user.type(within(form).getByLabelText(/password/i), "secret123");
		await user.click(within(form).getByRole("button", { name: /sign in/i }));

		expect(onSubmit).toHaveBeenCalledTimes(1);
		expect(onSubmit).toHaveBeenCalledWith({
			email: "test@example.com",
			password: "secret123",
		});
	});

	it("disables submit button when isLoading is true", () => {
		render(<LoginForm onSubmit={vi.fn()} isLoading />);
		expect(screen.getByRole("button", { name: /signing in/i })).toBeDisabled();
	});
});
