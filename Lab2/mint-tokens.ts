import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers"; 

import { createMint, mintTo } from "@solana/spl-token";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js"; 
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

const MINT = new PublicKey(process.env.TOKENADDRESS as string); //mint token address created with create-token-mint.ts

async function mintToken(amount: number, mint: PublicKey) {
  console.log(`Minting token ${mint.toBase58()}...`); // Log the proccess

  const connection = new Connection(clusterApiUrl("devnet"));
  const kp = getKeypairFromEnvironment("SECRETKEY"); //used as authority

  const ata = await getOrCreateAssociatedTokenAccount(
      connection,
      kp,
      mint,
      kp.publicKey
  );

  const sig = await mintTo(
      connection,
      kp,
      mint,
      ata.address,
      kp,
      amount
  );

  const link = getExplorerLink("tx", sig, "devnet");

  console.log(`✅ Done with link: ${link}`);
}
mintToken(10 * 10 ** 9, MINT); //10 * 10^9 because of 9 decimals