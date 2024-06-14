/* eslint-disable no-undef */

import { Knex } from "knex";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex: Knex) {
  try {
    await knex.raw(`
        CREATE TABLE IF NOT EXISTS networks (
            network_id TEXT PRIMARY KEY,
            network_name TEXT NOT NULL,
            network_env TEXT NOT NULL,
            network_template TEXT NOT NULL,
            network_relay_chain TEXT NOT NULL,
            network_relay_chain_version TEXT NOT NULL,
            network_sidecar INTEGER CHECK (network_sidecar IN (0, 1)),
            network_blockchain_explorer TEXT NOT NULL,
            network_chain_spec_file_json TEXT NOT NULL,
            network_binary_path TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `);

    await knex.raw(`

        CREATE TABLE IF NOT EXISTS nodes (
            node_id TEXT PRIMARY KEY,
            network_id TEXT NOT NULL,
            node_type TEXT NOT NULL,
            node_name TEXT NOT NULL,
            node_address TEXT,
            node_balance BIGINT,
            node_rpc_cors TEXT,
            node_endpoint TEXT,
            node_wss_enabled INTEGER CHECK (node_wss_enabled IN (0, 1)),
            node_https_enabled INTEGER CHECK (node_https_enabled IN (0, 1)),
            node_auth_method TEXT CHECK (node_auth_method IN ('api_key', 'basic_auth')),
            node_username TEXT,
            node_password TEXT,
            node_api_key TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (network_id) REFERENCES networks(network_id) ON DELETE CASCADE
        );

    `);
  } catch (error) {
    console.log(error);
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex: Knex) {
  await knex.raw(`
        
    `);
};
