import React from 'react';

const BoilingVerdict = (props) => {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>
    }
    return <p>The water would not boil.</p>
}

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
}

const toCelsius = (fahrenheit) => {
    return (fahrenheit-32) * 5 / 9;
}

const toFahrenheit = (celsius) => {
    return (celsius * 9 / 5) + 32;
}

const tryConvert = (temperature, convert) => {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return "";
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

class TemmperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        //Before: this.setState({temperature: e.target.value});
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        // Before: const temperature = this.state.temperature;
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return(
            <fieldset>
                <legend>
                    Enter temperature in {scaleNames[scale]}:
                </legend>
                <input
                    value = {temperature}
                    onChange={this.handleChange}
                />
            </fieldset>
        );
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {temperature: "", scale: 'c'};
    }

    handleCelsiusChange(temperature) {
        this.setState({scale: 'c', temperature});
    }

    handleFahrenheitChange(temperature) {
        this.setState({scale: 'f', temperature});
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
        return (
            <div>
                <TemmperatureInput 
                    scale="c" 
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange}
                />
                <TemmperatureInput
                    scale='f'
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange}
                />
                <BoilingVerdict
                    celsius={parseFloat(celsius)}
                />
            </div>
        )
    }
}

export default Calculator;