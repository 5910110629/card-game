import React, { Component } from 'react';
import CharacterCard from "./CharacterCard";
import _ from 'lodash';
const prepareStateFromWord = (given_word) => {
    let word = given_word.toUpperCase()
    let chars = _.shuffle(Array.from(word))
    return {
        word,
        chars,
        attemt: 1,
        guess: [],
        completed: false,
        lose : false
    }
}
export default class WordCard extends Component {
    constructor(props){
        super(props)
        this.state = prepareStateFromWord(this.props.value)
    }
    activationHandler = (c) => {
        let guess = [this.state.guess]+c
        this.setState({guess})
        if(guess.length === this.state.chars.length){
            if(guess === this.state.word){
                this.setState({guess: [], completed: true, lose: false})
            }else{
                this.setState({guess: [], attemt: this.state.attemt + 1, lose: true})
            }
        }
    }

    render(){
        return(
            <div className="App">
                {
                    Array.from(this.state.chars).map(
                        (c, i) => <CharacterCard value = {c} key = {i} attemt={this.state.attemt}
                        activationHandler = {this.activationHandler}/>
                    )
                }
                <p>Hint : place in PUBG game</p>
                <p>Round : {this.state.attemt}</p>
                <p className = "winner">{this.state.completed? "WINNER WINNER CHICKEN DINNER!!" : ""}</p>
                <div class="image">
                    {this.state.completed? <img src="https://res.cloudinary.com/teepublic/image/private/s--YAWYa4dh--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1507796176/production/designs/1965861_1.jpg" alt="WINNER" width='400' height='400'/> : ""}
                </div>
                <p className = "lose">{this.state.lose? "You Lose, Reset!!" : ""}</p>
                <div class="image">
                    {this.state.lose? <img src="https://cdn.pixabay.com/photo/2014/03/25/15/19/cross-296507_1280.png" alt="LOSE" width='300' height='300'/> : ""}
                </div>

            </div>
        )
    }
}