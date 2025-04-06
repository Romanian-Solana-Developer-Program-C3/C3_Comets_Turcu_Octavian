import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers"; 
import {
  getAssociatedTokenAddressSync,
  getOrCreateAssociatedTokenAccount,
  transferChecked,
} from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

const MINT = new PublicKey(process.env.TOKENADDRESS as string); //token address which is minted and wanted to be transferred
const SRC = new PublicKey("HJk8M1C9nxc25rDkLJuJjCh6BBSWQc8KFaaeo1gPDBmP"); //wallet with tokens
const DST = new PublicKey("DkSqy4tTBFaHJM2GguBxyo9n2nkJWGxiLVQHdWvCmCBw"); //wallet we want to transfer

async function transferToken(
  mint: PublicKey,
  source: PublicKey,
  dest: PublicKey,
  amount: number,
) {
  console.log(`Transferring token ${mint} ...`);

  const connection = new Connection(clusterApiUrl("devnet"));

  const kp = getKeypairFromEnvironment("SECRETKEY");


  const sourceAta = getAssociatedTokenAddressSync(mint, source);
  const destAta = await getOrCreateAssociatedTokenAccount(
    connection,
    kp,
    mint,
    dest,
  );


  const sig = await transferChecked(
    connection,
    kp,
    sourceAta,
    mint,
    destAta.address,
    kp,
    amount,
    9,
  );


  const link = getExplorerLink("tx", sig, "devnet");
  console.log(`✅ Done with link: ${link}`);
}

transferToken(MINT, SRC, DST, 1 * 10 ** 9); //1 * 10^9 in smallest units