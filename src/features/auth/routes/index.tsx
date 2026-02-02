import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/routes/__root";
import { AuthLayout } from "../ui";
import { LoginForm } from "../ui/forms";


const loginRoute = createRoute({
    path: '/',
    getParentRoute: () => authRoute,
    component: () => (
        <LoginForm onSubmit={() => { }} />
    )
})


const authRoute = createRoute({
    path: '/auth',
    getParentRoute: () => rootRoute,
    component: () => (
        <AuthLayout />
    ),
    loader: async () => {
        return {
            message: 'Hello, world!'
        }
    }
})

// Attach child routes so AuthLayout's <Outlet /> renders them
authRoute.addChildren([loginRoute])


export default authRoute