import React from 'react';

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

const Square = (props) => {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
  
class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square 
                value={this.props.squares[i]}
                onClick={()=> this.props.onClick(i)}
                key={i}
            />
        );
    }
  
    render() {
        const squares = [];
        for (let i = 0; i<this.props.row*this.props.col; i++) {
            squares.push(this.renderSquare(i));
        }
        return (
            <div style={{gridTemplateColumns: `repeat(${this.props.col}, 1fr)`}} id='gameBoard'>
                {squares}
            </div>
        );
    }
}
  
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(this.props.row*this.props.col).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if(calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? 
                `Go to move # ${move}`:
                `Go to game start`;
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if(winner) {
            status = `Winner: ${winner}`;
        } else {
            status = `Next player: ${(this.state.xIsNext ? 'X' : 'O')}`
        }

        return (
            <div className="game">
                <h1 className='gameName'>Tic-tac-toe</h1>
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        row={this.props.row}
                        col={this.props.col}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>          
        );
    }
}

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {row: '', col:'', isSubmitted: false}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        this.setState({isSubmitted: true})
    }
    
    render() {
        const isSubmitted = this.state.isSubmitted;

        let content;
        if (isSubmitted) {
            content = <Game row={this.state.row} col={this.state.col}/>;
        } else {
            content = (
                <div>
                    <h1 className='gameName'>Tic-tac-toe</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label>Rows: 
                            <input 
                                type='number'
                                name='row'
                                min='2'
                                value={this.state.row || ''}
                                onChange={this.handleChange}
                            />
                        </label>
                        <label>Columns: 
                            <input
                                type='number'
                                name='col'
                                min='2'
                                value={this.state.col || ''}
                                onChange={this.handleChange}
                            />
                        </label>
                        <input type='submit'/>
                    </form>
                </div>
            );
        }
        return(
            <div>
                {content}
            </div>
        );
    };
}

export default Form;