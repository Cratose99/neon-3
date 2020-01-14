import React, { Component } from "react";
import deckJson from "../../cards.json";
import Cards from "../cards";
// import Modal, { closeStyle } from "simple-react-modal";
import Axios from "axios";
import EnemyModal from "../modalCombiner/ModalCombiner";
import Modal from "../Modal/Modal";
import style from "./style.css";
import Example from "../enemiesActionModul/enemyAction";
import Button from "react-bootstrap/Button";
// import EnemyAction from '../enemiesActionModul/enemyAction'
// var Modal = require('react-bootstrap-modal')
class DeckBrain extends Component {
  state = {
    deck: [],
    hand: [],
    discard: [],
    playArea: [],
    turnEnded: false,
    deckRecieved: false,
    isShowing: false,
    show: false
  };

  componentWillReceiveProps() {
    let newDeck = this.props.currentDeck;
    // console.log(newDeck);

    if (newDeck === undefined || newDeck.length == 0) {
      let basicDeck = deckJson;
      this.setState(
        {
          deck: basicDeck
        },
        () => {
          this.shuffleDeck();
        }
      );
    } else {
      this.setState(
        {
          deck: newDeck
        },
        () => {
          // console.log(this.state.deck);
          this.shuffleDeck();
        }
      );
    }
  }

  componentDidMount() {
    let newUserDeck = this.props.currentDeck;

    if (newUserDeck === undefined || newUserDeck.length == 0) {
      let basicDeck = deckJson;
      this.setState(
        {
          deck: basicDeck
        },
        () => {
          this.shuffleDeck();
        }
      );
    } else {
      this.setState(
        {
          deck: newUserDeck
        },
        () => {
          this.shuffleDeck();
        }
      );
    }
  }

  shuffleDeck = () => {
    let newestDeck = this.state.deck;
    const shuffledDeck = this.shuffleCards(newestDeck);
    this.setState(
      {
        deck: shuffledDeck
      },
      () => {
        this.drawCards();
      }
    );
  };

  componentDidUpdate(prevprops, prevState) {
    const turnEnded = this.state.turnEnded !== prevState.turnEnded;

    if (turnEnded) {
      this.props.readPlayed(this.state.playArea);
      this.discardPlayed();
    }
  }

  toPlay = index => {
    if (this.state.playArea.length < 2) {
      // console.log(this.state.hand);

      let card = this.state.hand[index];
      let tempHand = this.state.hand;
      let tempPlay = this.state.playArea;
      tempPlay.push(card);
      tempHand.splice(index, 1);

      this.setState({
        hand: tempHand,
        playArea: tempPlay
      });
    } else {
      alert("exceeded play limit");
    }
  };

  discardPlayed = () => {
    let tempDiscard = [...this.state.playArea, ...this.state.discard];
    // console.log("playArea", this.state.playArea);
    this.setState(
      {
        discard: tempDiscard,
        playArea: []
      },
      this.drawCards
    );
  };

  drawCards = () => {
    let tempDeck = [...this.state.deck];
    const tempHand = [...this.state.hand];
    let tempDiscard = [...this.state.discard];
    while (tempHand.length < 5) {
      if (tempDeck.length <= 1) {
        // When the deck is empty or near empty, shuffle the discard, and then add it to the deck
        let shuffled = this.shuffleCards(tempDiscard);
        tempDeck = [...tempDeck, ...shuffled.splice(0)];
        tempDiscard = shuffled;
        this.setState({
          discard: tempDiscard
        });
      }
      let tempCard = tempDeck.shift();
      tempHand.push(tempCard);
    }
    // console.log(tempHand);

    this.setState(
      {
        hand: tempHand,
        deck: tempDeck
      },
      () => {
        this.setState({
          deckRecieved: true
        });
      }
    );
  };

  // showModal = e => {
  //   this.setState({
  //     show: !this.state.show
  //   });
  // };

  endTurn = e => {
    // const [show, setShow] = useState(false);

    const handleClose = () => {
      this.setState({
        show: false
      });
    };
    const handleShow = () => {
      this.setState({
        show: true
      });
    };
    let turn = !this.state.turnEnded;
    this.setState(
      {
        turnEnded: turn
      },
      () => {}
    );
  };

  openModalHandler = () => {
    this.setState({
      isShowing: true
    });
  };

  closeModalHandler = () => {
    this.setState({
      isShowing: false
    });
  };

  toHand = index => {
    let tempHand = this.state.hand;
    let card = this.state.playArea[index];
    let tempPlay = this.state.playArea;
    tempHand.push(card);
    tempPlay.splice(index, 1);

    this.setState({
      hand: tempHand,
      playArea: tempPlay
    });
  };

  shuffleCards = cards => {
    let randomCardsArray = [];
    let originalCards = cards.slice(0);

    while (originalCards.length) {
      let randomNumber = Math.floor(Math.random() * originalCards.length);
      let card = originalCards.splice(randomNumber, 1)[0];
      randomCardsArray.push(card);
    }
    return randomCardsArray;
  };

  render() {
    const handleClose = () => {
      this.setState({
        show: false
      });
    };
    const handleShow = () => {
      this.setState({
        show: true
      });
    };

    const { deckRecieved } = this.state;
    if (deckRecieved) {
      let hand = this.state.hand.map((card, index) => {
        return (
          <div className="handCard row1 d-flex justify-content-center">
            <Cards
              name={card.name}
              image={card.image}
              text={card.text}
              handleClick={this.toPlay}
              currentIndex={index}
            />
          </div>
        );
      });

      let playArea = this.state.playArea.map((card, index) => {
        return (
          <div className="playCard row2 d-flex justify-content-center">
            <Cards
              name={card.name}
              image={card.image}
              text={card.text}
              handleClick={this.toHand}
              currentIndex={index}
            />
          </div>
        );
      });

      return (
        // <div className="nes-container decks is-rounded">

        <div id="gameArea stuffs">
          <div className="row d-flex justify-content-center">
            <div className="row d-flex justify-content-center">
              {this.state.isShowing ? (
                <div
                  onClick={this.closeModalHandler}
                  className="back-drop"
                ></div>
              ) : null}

              <button
                className="open-modal-btn nes-pointer buzz  endTurn neon4 mb-3 nes-btn"
                onClick={this.openModalHandler}
              >
                Open Modal
              </button>

              <Modal
                className="modal"
                show={this.state.isShowing}
                close={this.closeModalHandler}
              >
                Maybe aircrafts fly very high because they don't want to be seen
                in plane sight?
              </Modal>
            </div>

            {/* <button
              className="nes-pointer buzz  endTurn neon4 mb-3 nes-btn"
              onClick={this.endTurn}
            >
              End Turn
            </button> */}
          </div>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <br />

          <br />

          <br />

          <br />

          <br />
          <br />
          <div className="playArea">{playArea.length ? playArea : null}</div>
          <br />
          <br />
          <br />
          <br />
          <div className="handArea ">{hand.length ? hand : null}</div>
        </div>
        // </div>
      );
    } else {
      return null;
    }
  }
}

export default DeckBrain;
