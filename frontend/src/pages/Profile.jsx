import { useEffect, useState } from "react";
import { getCurrentUser } from "../api";

function Profile() {

    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadUser = async () => {

            try {

                const data = await getCurrentUser();

                setUser(data.user);

            } catch (error) {

                setError(error.message);

            }
        };

        loadUser();

    }, []);

    return (
        <section className="contact">

            <h1>My Profile</h1>

            {error && (
                <p>{error}</p>
            )}

            {user && (
                <div className="help-box">

                    <p>
                        <strong>Email:</strong>{" "}
                        {user.email}
                    </p>

                    <p>
                        <strong>User ID:</strong>{" "}
                        {user._id}
                    </p>

                </div>
            )}

        </section>
    );
}

export default Profile;