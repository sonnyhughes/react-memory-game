import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar.js';
import Modal from './components/Modal/Modal.js';
import Cards from './components/Cards/Cards.js';
import Footer from './components/Footer/Footer.js';
import cards from './cards.json';

import './index.css';

//APP COMPONENT
class App extends Component {
    state = {
        cards: cards,
        score: 0,
        topScore: 0,
        clickedCards: [],
        footerText: ""
    }

    clickedCharacter = (id) => {
        const [pageBody] = document.getElementsByTagName('body');

        if (this.state.clickedCards.includes(id)) {
            this.setState({ score: 0, clickedCards: [] })

            pageBody.classList.add('shakeWrapper')
            this.setState({ footerText: 'You already clicked that image! You lose.' })
            setTimeout(() => {
                pageBody.classList.remove('shakeWrapper');
            }, 500);
            setTimeout(() => {
                this.setState({ footerText: "" })
            }, 2000)

        } else {
            this.setState({ clickedCards: [...this.state.clickedCards, id] })
            this.setState({ score: this.state.score + 1 })
            if (this.state.score >= this.state.topScore) {
                this.setState({ topScore: this.state.score + 1 })

            }
            if (this.state.score === 11) {
                this.setState({ footerText: 'You Won!' })
                this.setState({ score: 0, clickedCards: [], cards: cards })
                setTimeout(() => {
                    this.setState({ footerText: '' })
                }, 1800)
            }
        }
    }

    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    reArrangeCards = (array) => {
        let currentIndex = array.length;

        while (0 !== currentIndex) {
            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            let temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        this.setState({ cards: cards });
    }

    renderCards = (array) => {
        return this.state.cards.map(card => (
            <section className='col s4 m3 l3' key={card.id} id={card.id}>
                <Cards
                    name={card.name}
                    image={card.image}
                    reArrangeCards={() => { this.reArrangeCards(this.state.cards) }}
                    clickedCharacter={() => { this.clickedCharacter(card.id) }} />
            </section>
        )
        )
    }

    render() {
        return (
            <div className="container-fluid">
                <Navbar score={this.state.score} topScore={this.state.topScore} />
                <Modal />
                <br />
                <div className="container row cardWrapper">
                    {this.renderCards(this.state.cards)}
                </div>
                <Footer text={this.state.footerText} />
            </div>
        );
    }
}

export default App;




