import React from 'react';

type ButtonProps = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

const LoginButton = (props:ButtonProps) => {
    return(
        <button onClick={props.onClick} id="loginBtn">
            Login
        </button>
    );
};

const LogoutButton = (props:ButtonProps) => {
    return(
        <button onClick={props.onClick} id="logoutBtn">
            Logout
        </button>
    );
};

const UserGreeting = () => {
    return <h1>Welcome back!</h1>;
};

const GuestGreeting = () => {
    return <h1>Please sign up.</h1>;
};

type isLoggedIn = {
    isLoggedIn: boolean,
}

const Greeting = (props:isLoggedIn) => {
    const isLoggedIn = props.isLoggedIn;
    if(isLoggedIn) {
        return <UserGreeting />;
    }

    return <GuestGreeting />;
};

// eslint-disable-next-line @typescript-eslint/ban-types
type MyProps = {};

class LoginControl extends React.Component {
    constructor(props:MyProps) {
        super(props);
    
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }
    state:isLoggedIn = {isLoggedIn: false};

    handleLoginClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        this.setState({isLoggedIn: true});
    }

    handleLogoutClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
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
        );
    }
}

export default LoginControl;