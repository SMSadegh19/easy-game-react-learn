// import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import React, { Component } from "react";
import ReactDOM from "react-dom";

function calculateWinner(sq, upperState) {
  console.log("calculateWinner", upperState);

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
  // console.log(sq);
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
      upperState.end = true;
      return sq[a];
    }
  }
  return null;
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sq: Array(9).fill(null),
      xIsNext: true,
      end: false,
    };
  }

  handleClick(i) {
    // console.log("in handle click", i);
    const sq = this.state.sq.slice();
    if (this.state.end || sq[i]) {
      return;
    }
    sq[i] = this.state.xIsNext ? "X" : "O";
    this.setState({ sq: sq, xIsNext: !this.state.xIsNext });
  }

  renderSquare(i) {
    return (
      <Square value={this.state.sq[i]} onClick={() => this.handleClick(i)} />
    );
  }

  render() {
    const winner = calculateWinner(this.state.sq, this.state);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
ReactDOM.render(<Game />, document.getElementById("root"));
