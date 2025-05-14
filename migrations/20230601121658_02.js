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

/* eslint-disable no-undef */

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  try {
    await knex.raw(`
        ALTER TABLE nodes 
        ADD COLUMN node_collator_seed_added INTEGER CHECK (node_https_enabled IN (0, 1));
       `);

    await knex.raw(`
        ALTER TABLE nodes 
        ADD COLUMN node_collator_session_address TEXT;
       `);
  } catch (error) {
    console.log(error);
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  // NOTE: multiple queries can't be run in sqlite, need to separate it
  await knex.raw(`
        ALTER TABLE nodes 
        DROP COLUMN node_collator_session_address;
  `);

  await knex.raw(`
        ALTER TABLE nodes 
        DROP COLUMN node_collator_seed_added;
  `);
};
