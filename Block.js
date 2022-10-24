const SHA256 = require('crypto-js/sha256');
const hex2ascii = require('hex2ascii');

class Block {
    // Constructor - argument data will be the object containing the transaction data
	constructor(data){
		this.hash = null;                                           // Hash of the block
		this.height = 0;                                            // Block Height (consecutive number of each block)
		this.body = Buffer.from(JSON.stringify(data)).toString('hex');   // Will contain the transactions stored in the block, by default it will encode the data
		this.time = 0;                                              // Timestamp for the Block creation
		this.previousBlockHash = null;                              // Reference to the previous Block Hash
    } 
    validate() {
        let self = this;
        console.log(`self Hash avant:${self.hash}`);
        return new Promise((resolve, reject) => {
            const currentBlockHash=self.hash ; 
            self.hash=null;  
             // Recalculate the hash of the Block
             const Rhash=SHA256(JSON.stringify(self)).toString;
             console.log(`self self : ${self}`);
             self.hash=currentBlockHash;
             console.log(`self Hash: ${self.hash}`);// to diplay the self hash
             console.log(`R Hash: ${Rhash}`);//to display the recalculated hash of the block              
             if (Rhash!== currentBlockHash){reject(false);}
            else{
                // Returning the Block is valid
                resolve(true);}
            });
   }

   getBData() {
    // Getting the encoded data saved in the Block
    let self=this;
    return new Promise(async (resolve, reject) => {
        if (self.height == 0) {
            resolve(" **Genesis block **");
        }
       let encoded_data=self.body;
       console.log(`data object: ${encoded_data}`);
    // Decoding the data to retrieve the JSON representation of the object
       let decoded_data = hex2ascii(encoded_data);
            // Parse the data to an object to be retrieve.
            let dataobject = JSON.parse(decoded_data);
            // Resolve with the data if the object isn't the Genesis block
            console.log(`data object: ${dataobject}`);
            if (dataobject) {
                resolve(dataobject);
            } else {
                reject(Error("no data in the block"));
            }
        });
  
}

}

module.exports.Block = Block;                    // Exposing the Block class as a module
