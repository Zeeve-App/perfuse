"use server";

import knex from "knex";
import { NetworkDbRow, NodeDbRow, TaskDbRow } from "./type";
import { knexHandler } from "./knexfile";

// to save network details in db
export const saveNetworkData = async (data: NetworkDbRow, trx?: knex.Knex.Transaction) => {
  const db = trx ?? knexHandler;

  return db<NetworkDbRow>("networks").insert(data);
};

// to save node details in db
export const saveNodeData = async (data: NodeDbRow, trx?: knex.Knex.Transaction) => {
  const db = trx ?? knexHandler;

  return db<NodeDbRow>("nodes").insert(data);
};

// to get node data from db
export const getNodeData = async (data: Partial<NodeDbRow>, trx?: knex.Knex.Transaction) => {
  const db = trx ?? knexHandler;

  return db<NodeDbRow>("nodes").select("*").where(data).first();
};

// to get nodes[] by network ID
export const getNodes = async (networkId?: string, trx?: knex.Knex.Transaction) => {
  const db = trx ?? knexHandler;

  return db<NodeDbRow>("nodes").select("*").where({ network_id: networkId });
};

// to get all network in the db
export const getNetworks = async (trx?: knex.Knex.Transaction) => {
  const db = trx ?? knexHandler;

  return db<NetworkDbRow>("networks").select("*").where({});
};

// to get the network data by network id
export const getNetworkData = async (networkId?: string, trx?: knex.Knex.Transaction) => {
  const db = trx ?? knexHandler;

  return db<NetworkDbRow>("networks").select("*").where({ network_id: networkId }).first();
};

// to delete the network from db
export const deleteNetwork = (networkId: string, trx?: knex.Knex.Transaction) => {
  const db = trx ?? knexHandler;

  return db<NetworkDbRow>("networks").where({ network_id: networkId }).del();
};

// to add the task in db
export const addTask = (data: TaskDbRow, trx?: knex.Knex.Transaction) => {
  const db = trx ?? knexHandler;

  return db<TaskDbRow>("tasks").insert(data);
};

// to get the task from db
export const getTask = (data: Partial<TaskDbRow>, trx?: knex.Knex.Transaction) => {
  const db = trx ?? knexHandler;

  return db<TaskDbRow>("tasks").select("*").where(data).first();
};

// update the task
export const updateTask = (data: Partial<TaskDbRow>, taskId: string, trx?: knex.Knex.Transaction) => {
  const db = trx ?? knexHandler;

  return db<TaskDbRow>("tasks").update(data).where("task_id", taskId);
};
