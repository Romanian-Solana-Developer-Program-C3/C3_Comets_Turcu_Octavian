require('dotenv').config({silent: true})

import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from '@solana/web3.js';

import { getKeypairFromEnvironment } from "@solana-developers/helpers";

// import { airdropIfRequired } from '@solana-developers/helpers';

const keypair = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection(clusterApiUrl('devnet'));

const pubKey = keypair.publicKey;

// await airdropIfRequired(connection, pubKey, LAMPORTS_PER_SOL, LAMPORTS_PER_SOL);

const balanceInLamports = await connection.getBalance(pubKey);

console.log(`${pubKey.toString()} has balance of ${balanceInLamports}`);
