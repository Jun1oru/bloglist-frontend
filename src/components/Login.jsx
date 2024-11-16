import { useState, useEffect } from 'react';
import blogService from '../services/blogs';
import loginService from '../services/login';
import PropTypes from 'prop-types';

const Login = ({ setUser, handleNotificationMsg }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({
                username, password,
            });

            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
            blogService.setToken(user.token);
            setUser(user);
            setUsername('');
            setPassword('');

            handleNotificationMsg({
                text: `Logged in as ${user.name} successfully!`,
                type: 'success',
            });
        } catch (exception) {
            handleNotificationMsg({
                text: exception.response.data.error,
                type: 'error',
            });
        }
    }

    return (
        <>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        data-testid="inputUsername"
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        data-testid="inputPassword"
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button
                    type="submit"
                    data-testid="loginButton"
                >
                    login
                </button>
            </form>
        </>
    );
}
Login.propTypes = {
    setUser: PropTypes.func.isRequired,
    handleNotificationMsg: PropTypes.func.isRequired
};

export default Login;