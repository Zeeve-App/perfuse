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

const REGEX_NODE_NAME = /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/;
const REGEX_USERNAME = /^[A-Za-z]([A-Za-z0-9]){7,19}$/;
const REGEX_PASSWORD = /^[A-Za-z0-9]{8,20}$/;

export { REGEX_NODE_NAME, REGEX_USERNAME, REGEX_PASSWORD };
