import { mnemonicToMiniSecret } from "@polkadot/util-crypto";
import { Keyring } from "@polkadot/keyring";

function derivePublicSessionKey(seedPhrase: string) {
  // Convert the mnemonic (seed phrase) to a mini secret (raw seed)
  const seed = mnemonicToMiniSecret(seedPhrase);

  // Initialize a new Keyring instance with the session key type, e.g., sr25519 for Polkadot
  const keyring = new Keyring({ type: "sr25519" });

  // Add the key pair from the seed
  const pair = keyring.addFromSeed(seed);

  // Get the public key in hex format
  const publicKeyHex = Buffer.from(pair.publicKey).toString("hex");

  return publicKeyHex;
}

export { derivePublicSessionKey };
