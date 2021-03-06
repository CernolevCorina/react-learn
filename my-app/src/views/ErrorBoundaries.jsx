import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    render() {
        if(this.state.errorInfo) {
            // Error path
            return(
                <div>
                    <h2>Samething went wrong.</h2>
                    <details style={{witeSpace: 'pre-wrap'}}>
                        {this.state.error && this.state.error.toString()}
                        <br/>
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }
        return this.props.children;
    }
}

class BuggyCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { counter:0 };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(({counter}) => ({
            counter: counter + 1
        }));
    }

    render() {
        if (this.state.counter === 5) {
            // Simulate a JS error
            throw new Error('I crashed!');
        }
        return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
    }
}

const App = () => {
    return (
        <div>
            <p>
                <b>
                    This is an example of error boundaries in React.
                    <br/> <br/>
                    Click on the numbers to increase the countres.
                    <br/>
                    The counter is programmed to throw when it reaches 5. This simulates a JavaScript error in a Component.
                </b>
            </p>
            <hr/>
            <ErrorBoundary>
                <p>These two counters are inside the same error boundary. If one crashed, the error boundary will replace both of them</p>
                <BuggyCounter />
                <BuggyCounter />
            </ErrorBoundary>
            <hr/>
            <p>This two counters are each inside of their own error boundary. So if one crashes, the other is not affected.</p>
            <ErrorBoundary><BuggyCounter/></ErrorBoundary>
            <ErrorBoundary><BuggyCounter/></ErrorBoundary>
        </div>
    );
};

export default App;