import React from 'react';

const LoginButton = (props) => {
    return(
        <button onClick={props.onClick} id="loginBtn">
            Login
        </button>
    );
}

const LogoutButton = (props) => {
    return(
        <button onClick={props.onClick} id="logoutBtn">
            Logout
        </button>
    );
}

const UserGreeting = () => {
    return <h1>Welcome back!</h1>
}

const GuestGreeting = () => {
    return <h1>Please sign up.</h1>
}

const Greeting = (props) => {
    const isLoggedIn = props.isLoggedIn;
    if(isLoggedIn) {
        return <UserGreeting />
    }

    return <GuestGreeting />
}

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLoggedIn: false};
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLoginClick() {
        this.setState({isLoggedIn: true});
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;

        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
        }

        return(
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        )
    }
}

export default LoginControl;