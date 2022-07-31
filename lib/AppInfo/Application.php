<?php declare(strict_types=1);

/**
 * FilesOpenMSOffice - Open files with Microsoft Office
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Michael Schießl <michael.schiessl@liongate.de>
 * @copyright 2021
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\FilesOpenMSOffice\AppInfo;

use OCP\AppFramework\App;
use OCP\Util;

/**
 * Class Application
 *
 * @package OCA\FilesLibreOfficeEdit\AppInfo
 */
class Application extends App {


	const APP_ID = 'files_open_msoffice';

	/**
	 * @param array $params
	 */
	public function __construct(array $params = array()) {
		parent::__construct(self::APP_ID, $params);
		Util::addScript(self::APP_ID, 'openmsoffice');
		Util::addStyle(self::APP_ID, 'openmsoffice');
	}
}
