import { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (event) => {

        event.preventDefault();

        try {

            setError("");

            await registerUser(
                email,
                password
            );

            alert("Registration successful");

            navigate("/login");

        } catch (error) {

            setError(error.message);

        }
    };

    return (
        <div className="register-page">

            <div className="register-card">

                <h1>Register</h1>

                <form
                    className="register-form"
                    onSubmit={handleRegister}
                >

                    <div>
                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div>
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                        />
                    </div>

                    <button type="submit">
                        Register
                    </button>

                </form>

                {error && (
                    <p className="register-error">
                        {error}
                    </p>
                )}

            </div>

        </div>
    );
}

export default Register;