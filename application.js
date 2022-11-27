class Wallet {

  constructor(collection, el) {
    this.collection = collection;
    this.el = el;

    this.render();
  }

  getInputValue() {
    const input = this.el.querySelector("input");
    return parseInt(input.value);
  }

  bind() {
    this.el.addEventListener("input", (e) => {
      this.collection.render();
    });
  }

  render() {
    const sum = this.collection.sum();
    const per = Math.round(sum / this.collection.getNumber());
    const del = this.getInputValue() - per;

    if (0 === del) {
      this.el.querySelector("#result").innerHTML = `it's done !`;
    } else if (0 < del) {
      this.el.querySelector("#result").innerHTML = `and pays more ${del}.`;
    } else if (del < 0) {
      this.el.querySelector("#result").innerHTML = `and gets ${del}.`;
    } else {
      this.el.querySelector("#result").innerHTML = `calculating`;
    }
  }

}

class WalletCollection {

  constructor() {
    this.wallets = [];
  }

  push(wallet) {
    this.wallets.push(wallet);
  }

  getNumber() {
    return this.wallets.length;
  }

  forEach() {
    return Array.prototype.forEach.apply(this.wallets, arguments);
  }

  reduce() {
    return Array.prototype.reduce.apply(this.wallets, arguments);
  }

  sum() {
    return this.reduce((acc, wallet) => {
      return acc + wallet.getInputValue();
    }, 0);
  }

  render() {
    return this.forEach((wallet) => {
      return wallet.render();
    });
  }

}


window.addEventListener("DOMContentLoaded", (e) => {

  const walletCollection = new WalletCollection();
  walletCollection.push(new Wallet(walletCollection, document.querySelector("#wallet-1")));
  walletCollection.push(new Wallet(walletCollection, document.querySelector("#wallet-2")));

  walletCollection.forEach((wallet) => {
    wallet.bind();
  });
  
  console.log('DOM fully loaded and parsed');
});
