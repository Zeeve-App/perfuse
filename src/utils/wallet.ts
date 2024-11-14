import { decodeAddress, mnemonicToMiniSecret } from "@polkadot/util-crypto";
import { Keyring } from "@polkadot/keyring";
import { u8aToHex } from "@polkadot/util";

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

function addressToHexPublicKey(address: string) {
  try {
    // Decode the address to get the public key in a Uint8Array
    const publicKeyU8a = decodeAddress(address);
    // Convert the Uint8Array to a hexadecimal string
    return u8aToHex(publicKeyU8a);
  } catch (error) {
    console.error("Invalid address provided:", error);
    return null;
  }
}

export { derivePublicSessionKey, addressToHexPublicKey };
