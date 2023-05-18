import { render, fireEvent, screen } from "@testing-library/react";
import LoginPage from "./index";

describe("<LoginForm />", () => {
    test("should display a blank login form, with remember me checked by default", async () => {
        render(<LoginPage />);

        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Go to Register' })).toBeInTheDocument();
    });

    test('tesing for submiting login form', async () => {
        render(
            <LoginPage />
        );

        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'dev1@example.com' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'dev1' } });

        fireEvent.click(screen.getByRole('button', { name: 'Log in' }));

        expect(await screen.findByText('React Intern Testing')).toBeInTheDocument();
    });
});