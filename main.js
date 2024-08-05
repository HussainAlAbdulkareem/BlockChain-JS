const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(timestamp, data) {
        this.index = 0;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = "0";
        this.Hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + this.data + this.nonce).toString();
    }

    mineBlock(difficulty){

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
        newBlock.previousHash = this.lastestBlock().Hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

}

blockchain = new Blockchain();
console.log(blockchain.chain);
