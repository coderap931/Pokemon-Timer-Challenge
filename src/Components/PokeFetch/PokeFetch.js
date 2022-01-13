import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
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
        })
        this.countdown();
      })
      .catch((err) => console.log(err))
  }

  countdown() {
    let secondsLeft = 10;
    let sprite = document.getElementsByClassName("pokeImg");
    let name = document.getElementsByClassName("pokeName");
    if(secondsLeft > 0) {
      sprite.style.color = "black";
      name.style.opacity = "0";
      setTimeout(() => {secondsLeft = secondsLeft- 1}, 1000);
    } else if (secondsLeft === 0) {
      sprite.style.opacity = "1";
      name.style.opacity = "1";
    } else {
      sprite.style.opacity = "0";
      name.style.opacity = "0";
    }
  }

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >Timer Display</h1>
        <div className={'pokeWrap'}>
          <img className={'pokeImg'} src={this.state.pokeSprite} />
          <h1 className={'pokeName'}>{this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;