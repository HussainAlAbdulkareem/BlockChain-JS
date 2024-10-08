const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(timestamp, data) {
        this.index = 0;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = "0";
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + this.data + this.nonce).toString();
    }

}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesis()];
    }
    createGenesis() {
        return new Block("05/08/2024", "Genesis block");
    }

    lastestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.index = this.chain[this.chain.length - 1].index + 1;
        newBlock.previousHash = this.lastestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    checkValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if (currentBlock.previousHash !== prevBlock.hash){
                return false;
            }
        }

        return true;

    }
}

let blockchain = new Blockchain();
blockchain.addBlock(new Block("05/08/2024", {amount: 20}));
blockchain.addBlock(new Block("05/08/2024", {amount: 55}));
blockchain.addBlock(new Block("05/08/2024", {amount: 120}));
console.log(JSON.stringify(blockchain, null, 4));
console.log("Is the blockchain valid? " + blockchain.checkValid());

