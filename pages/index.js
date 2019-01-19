import React, { Component } from "react";
import ReactDOM from "react-dom";
import eco_sale_Contract from "../ethereum/eco_sale_contract";
import eco_coin_Contract from "../ethereum/eco_coin_contract";
import web3 from "../ethereum/web3";

class Index extends Component {
  accounts = [];
  state = {
    name: null,
    address: null,
    phoneNumber: null
  };
  fetchAccounts = async () => {
    try {
      this.accounts = await web3.eth.getAccounts();
      console.log(this.accounts);
    } catch (e) {
      console.log("cannot get accounts");
    }
  };
  doesUserExist = async () => {
    //   this.fetchAccounts();
    const checkUser = await eco_sale_Contract.methods
      .doesUserExist()
      .call({ from: this.accounts[0] });
    console.log(checkUser);
  };
  setUserDetails = async () => {
    //   this.fetchAccounts();
    try {
      const recipt = await eco_sale_Contract.methods
        .setUserDetails("teja", "hyderabad", "8143")
        .send({ from: this.accounts[0] });
      console.log(recipt);
    } catch (e) {
      console.log(e);
    }
  };
  getUserDetails = async () => {
    const returnValue = await eco_sale_Contract.methods
      .getUserDetails()
      .call({ from: this.accounts[0] });
    console.log(returnValue);
    this.setState({
      name: returnValue._name,
      address: returnValue.__deliveryAddress,
      phoneNumber: returnValue.__mobileNumber
    });
  };
  getBalanceofUser = async () => {
    try {
      const balance = await eco_coin_Contract.methods
        .balanceOf(this.accounts[0])
        .call();
      console.log(balance);
    } catch (e) {
      console.log(e);
    }
  };
  getTokensForPlastic = async () => {
    try {
      const receipt = await eco_sale_Contract.methods
        .buyTokensForPlastic(1)
        .send({ gas: 450000, from: this.accounts[0] });
      console.log(receipt);
    } catch (e) {
      console.log(e);
    }
  };
  getTokensForElectricity = async () => {
    try {
      const receipt = await eco_sale_Contract.methods
        .KarmaForPureElectricity(1)
        .send({ gas: 450000, from: this.accounts[0] });
      console.log(receipt);
    } catch (e) {
      console.log(e);
    }
  };
  getTokensForBuying = async () => {
    try {
      const receipt = await eco_sale_Contract.methods
        .giftKarmaTokens(1)
        .send({ gas: 450000, from: this.accounts[0] });
      console.log(receipt);
    } catch (e) {
      console.log(e);
    }
  };
  getUserParticipation = async()=>{
    try {
        const receipt = await eco_sale_Contract.methods
          .getUserParticipation(this.accounts[0])
          .call();
        console.log(receipt);
      } catch (e) {
        console.log(e);
      }
  };

  render() {
    this.fetchAccounts();
    return (
      <div>
        <button onClick={this.doesUserExist}>Click to Login</button>
        <button onClick={this.setUserDetails}>register</button>
        <button onClick={this.getUserDetails}>getDetails</button>
        <button onClick={this.getBalanceofUser}>getTokensOfUser</button>
        <button onClick={this.getTokensForPlastic}>getTokensForPlastic</button>
        <button onClick={this.getTokensForElectricity}>
          getTokensForElectricity
        </button>
        <button onClick={this.getTokensForBuying}>getTokensForBuying</button>
        <button onClick={this.getUserParticipation}>getUserParticipation</button>
        <h1>{this.state.name}</h1>
      </div>
    );
  }
}

export default Index;
