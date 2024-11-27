/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * Copyright (C) 2024 [Perfuse]
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import {
  cryptoWaitReady,
  decodeAddress,
  mnemonicGenerate,
  mnemonicToMiniSecret,
  mnemonicValidate,
} from "@polkadot/util-crypto";
import { Keyring } from "@polkadot/keyring";
import { u8aToHex } from "@polkadot/util";

/** derive public key from the seed phrase */
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

/** polkadot address to hex address */
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

/**
 * Generates a new wallet for a Substrate-based blockchain.
 *
 * @returns {Object} An object containing the wallet details: mnemonic, address, publicKey, and privateKey.
 */
async function createWallet() {
  // Ensure WASM crypto is initialized
  const isReady = await cryptoWaitReady();
  if (!isReady) {
    throw new Error("WASM crypto initialization failed.");
  }
  // Generate a mnemonic phrase
  const mnemonic = mnemonicGenerate();

  // Validate the mnemonic
  if (!mnemonicValidate(mnemonic)) {
    throw new Error("Generated mnemonic is invalid.");
  }

  // Initialize the Keyring
  const keyring = new Keyring({ type: "sr25519" });

  // Create a key pair from the mnemonic
  const keyPair = keyring.addFromMnemonic(mnemonic);

  // Return wallet details
  return {
    mnemonic, // Backup phrase
    address: keyPair.address, // Wallet address
    // hexKey: addressToHexPublicKey(keyPair.publicKey.toString()),
  };
}

export { derivePublicSessionKey, addressToHexPublicKey, createWallet };
