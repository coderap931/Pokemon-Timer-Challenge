import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      secondsLeft: 0,
    }
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
          secondsLeft: 10,
        })
        this.countdown = this.countdown.bind(this);
      })
      .catch((err) => console.log(err))
  }

  countdown() {
    setTimeout(() => {
      this.setState({
        secondsLeft: this.state.secondsLeft - 1,
      }); console.log(this.state.secondsLeft)}, 1000);
  }

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >Timer Display</h1>
        <div className={'pokeWrap'}>
          {this.state.secondsLeft > 0 ? (
            <div>
              <img className={'pokeImg'} style={{filter: 'brightness(0%)'}} src={this.state.pokeSprite} />
              <h1 className={'pokeName'} style={{opacity: '0%'}} >{this.state.pokeName}</h1>
            </div>
          ) : (
            <div>
              <img className={'pokeImg'} style={{filter: 'brightness(100%)'}} src={this.state.pokeSprite} />
              <h1 className={'pokeName'} style={{opacity: '100%'}} >{this.state.pokeName}</h1>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default PokeFetch;