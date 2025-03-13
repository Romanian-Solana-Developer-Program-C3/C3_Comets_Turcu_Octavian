import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate();

console.log("Done - Keypair generated succesfully");
console.log("Public key", keypair.publicKey.toBase58());
console.log("Public key", keypair.secretKey);