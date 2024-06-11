"use server";

import knex from "knex";
import { NetworkDbRow, NodeDbRow } from "./type";
import { knexHandler } from "./knexfile";

export const saveNetworkData = async (data: Omit<NetworkDbRow, "created_at">, trx?: knex.Knex.Transaction) => {
  const db = trx ?? knexHandler;

  return db<NetworkDbRow>("networks").insert(data);
};

export const saveNodeData = async (data: NodeDbRow, trx?: knex.Knex.Transaction) => {
  const db = trx ?? knexHandler;

  return db<NodeDbRow>("nodes").insert(data);
};

export const getNodeData = async (networkId: string, trx?: knex.Knex.Transaction) => {
  const db = trx ?? knexHandler;

  return db<NodeDbRow>("nodes").select("*").where({ network_id: networkId }).first();
};

export const getNodes = async (networkId: string, trx?: knex.Knex.Transaction) => {
  const db = trx ?? knexHandler;

  return db<NodeDbRow>("nodes").select("*").where({ network_id: networkId });
};

export const getNetworkData = async (networkId: string, trx?: knex.Knex.Transaction) => {
  const db = trx ?? knexHandler;

  return db<NetworkDbRow>("networks").select("*").where({ network_id: networkId }).first();
};
