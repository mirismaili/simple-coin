import {createHash} from 'crypto'

/**
 * Created on 1400/1/22 (2021/4/11).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 *
 * https://www.smashingmagazine.com/2020/02/cryptocurrency-blockchain-node-js/
 */

class CryptoBlock {
	constructor(index, timestamp, data, precedingHash = ' ') {
		this.index = index
		this.timestamp = timestamp
		this.data = data
		this.precedingHash = precedingHash
		this.hash = this.computeHash()
	}
	
	computeHash() {
		return createHash('sha256').update(
				this.index + this.precedingHash + this.timestamp + JSON.stringify(this.data),
		).digest('hex')
	}
}

class CryptoBlockchain {
	constructor() {
		this.blockchain = [this.startGenesisBlock()]
	}
	
	startGenesisBlock() {
		return new CryptoBlock(0, '01/01/2020', 'Initial Block in the Chain', '0')
	}
	
	obtainLatestBlock() {
		return this.blockchain[this.blockchain.length - 1]
	}
	
	addNewBlock(newBlock) {
		newBlock.precedingHash = this.obtainLatestBlock().hash
		newBlock.hash = newBlock.computeHash()
		this.blockchain.push(newBlock)
	}
}

const smashingCoin = new CryptoBlockchain()

smashingCoin.addNewBlock(new CryptoBlock(1, '01/06/2020', {
	sender: 'Iris Ljesnjanin',
	recipient: 'Cosima Mielke',
	quantity: 50,
}))

smashingCoin.addNewBlock(new CryptoBlock(2, '01/07/2020', {
	sender: 'Vitaly Friedman',
	recipient: 'Ricardo Gimenes',
	quantity: 100,
}))

console.log(JSON.stringify(smashingCoin, null, 4))

