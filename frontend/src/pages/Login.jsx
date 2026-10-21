import { useState } from "react";
import { loginUser } from "../api";
import "./Login.css";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (event) => {

        event.preventDefault();

        try {

            setError("");

            const data = await loginUser(
                email,
                password
            );

            localStorage.setItem(
                "token",
                data.token
            );

            alert("Login successful");

        } catch (error) {

            setError(error.message);

        }
    };

    return (

        <div className="login-page">

            <div className="login-card">

                <h1>Login</h1>

                <form
                    className="login-form"
                    onSubmit={handleLogin}
                >

                    <div>
                        <label>Email</label>

                        <input
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label>Password</label>

                        <input
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button type="submit">
                        Login
                    </button>

                </form>

                {error && (
                    <p className="login-error">
                        {error}
                    </p>
                )}

            </div>

        </div>

    );
}

export default Login;