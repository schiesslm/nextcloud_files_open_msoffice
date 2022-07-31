<?php

$dir = rtrim((@$argv[1] ?? dirname(__FILE__)), " \t/") . '/';

$files = array_filter(scandir($dir), function ($file) {return strtolower(substr($file, -4)) === '.svg';});;

foreach ($files as $file) {
	echo "Processing file \"$dir$file\"..." . PHP_EOL;

	$data = file_get_contents($dir . $file);

	if (preg_match_all('/#[0-9a-fA-F]{3,6}/', $data, $colors)) {
		$colors = array_fill_keys($colors[0], "");
		echo "\tFound " . count($colors) . " color values to convert to grayscale:" . PHP_EOL;
		foreach($colors as $color => &$gray) {
			if (mb_strlen($color) === 4) {
				$color = '#' . substr($color, 1, 1) . substr($color, 1, 1) . substr($color, 2, 1) . substr($color, 2, 1) . substr($color, 3, 1) . substr($color, 3, 1);
			}
			if (mb_strlen($color) === 7) {
				$r = hexdec(substr($color, 1, 2));
				$g = hexdec(substr($color, 3, 2));
				$b = hexdec(substr($color, 5, 2));
				$gray = '#' . str_repeat(str_pad(dechex($r * 0.299 + $g * 0.587 + $b * 0.114), 2, '0', STR_PAD_LEFT), 3);
			} else {
				echo "\t\tInvalid color value \"$color\"! Value must be 3 or 6 hexadecimal characters long!" . PHP_EOL;
				unset($colors[$color]);
				continue;
			}
			echo "\t\t$color => $gray" . PHP_EOL;
		}
		unset($gray);
		$data = preg_replace(array_map(function ($val) {return '/' . $val . '/';}, array_keys($colors)), array_values($colors), $data);
		if (is_null($data)) {
			echo "\tERROR: Could not replace color values with gray value in file!" . PHP_EOL;
			continue;
		}
		$grayfile = $dir . substr($file, 0, -4) . '-gray' . substr($file, -4);
		echo "\tSaved grayscale file as \"$grayfile\"." . PHP_EOL . PHP_EOL;
		file_put_contents($grayfile, $data);
	} else {
		echo "\tNo color values found in file!" . PHP_EOL . PHP_EOL;
	}
}
