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
           ALTER TABLE networks 
           ADD COLUMN subquery_enabled BOOLEAN NOT NULL DEFAULT false
         `);
  
    } catch (error) {
      console.log('add subquery coloumn ', error);
    }
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function (knex) {
    // NOTE: multiple queries can't be run in sqlite, need to separate it
    await knex.raw(`
          ALTER TABLE networks
          DROP COLUMN subquery_enabled;
    `);
  };
  