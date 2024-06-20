"use server";

import knex from "knex";
import { NetworkDbRow, NodeDbRow, TaskDbRow } from "./type";
import { knexHandler } from "./knexfile";

export const saveNetworkData = async (data: Omit<NetworkDbRow, "created_at">, trx?: knex.Knex.Transaction) => {
  const db = trx ?? knexHandler;

  return db<NetworkDbRow>("networks").insert(data);
};

export const saveNodeData = async (data: NodeDbRow, trx?: knex.Knex.Transaction) => {
  const db = trx ?? knexHandler;

  return db<NodeDbRow>("nodes").insert(data);
};

export const getNodeData = async (data: Partial<NodeDbRow>, trx?: knex.Knex.Transaction) => {
  const db = trx ?? knexHandler;

  return db<NodeDbRow>("nodes").select("*").where(data).first();
};

export const getNodes = async (networkId?: string, trx?: knex.Knex.Transaction) => {
  const db = trx ?? knexHandler;

  return db<NodeDbRow>("nodes").select("*").where({ network_id: networkId });
};

export const getNetworks = async (trx?: knex.Knex.Transaction) => {
  const db = trx ?? knexHandler;

  return db<NetworkDbRow>("networks").select("*").where({});
};

export const getNetworkData = async (networkId?: string, trx?: knex.Knex.Transaction) => {
  const db = trx ?? knexHandler;

  return db<NetworkDbRow>("networks").select("*").where({ network_id: networkId }).first();
};

export const deleteNetwork = (networkId: string, trx?: knex.Knex.Transaction) => {
  const db = trx ?? knexHandler;

  return db<NetworkDbRow>("networks").where({ network_id: networkId }).del();
};

export const addTask = (data: Omit<TaskDbRow, "task_created_at" | "task_updated_at">, trx?: knex.Knex.Transaction) => {
  const db = trx ?? knexHandler;

  return db<TaskDbRow>("tasks").insert(data);
};

export const getTask = (data: Partial<TaskDbRow>, trx?: knex.Knex.Transaction) => {
  const db = trx ?? knexHandler;

  return db<TaskDbRow>("tasks").select("*").where(data).first();
};

export const updateTask = (data: Partial<TaskDbRow>, taskId: string, trx?: knex.Knex.Transaction) => {
  const db = trx ?? knexHandler;

  return db<TaskDbRow>("tasks").update(data).where("task_id", taskId);
};
