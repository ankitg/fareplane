<?php
require_once('PHPconsole/PhpConsole.php');
PhpConsole::start(true, true, dirname(__FILE__));

$debug = false;  // Basic debugging;
$debugv = false; // Verbose debugging;
date_default_timezone_set("America/Toronto");

// DB Config
$host="localhost"; // Host name
$username="root"; // Mysql username
$password="root"; // Mysql password
$db_name="fareplane"; // Database name


// Get currency
$curreny = isset($_GET['curreny']) ? $_GET['currency'] : "CAD";
if($debugv) { debug($curreny, "curreny"); }

switch ($curreny) {
	case 'CAD':
		$currencyMultiplier = 1.072;
		break;
	
	case 'USD':
		$currencyMultiplier = 1.000;
		break;

	case 'JPY':
		$currencyMultiplier = 90.13;
		break;

	case 'MXN':
		$currencyMultiplier = 13.2;
		break;

	default:
		$currencyMultiplier = 1.072;
		break;
}


// Get query type
$type = isset($_GET['type']) ? $_GET['type'] : "Type Missing";

if ($type == "Type Missing")
{
	if($debug || $debugv) { throw new Exception("Query type missing."); }
}

// Search 
else if ($type == "location")
{
	if($debugv) { debug($type, "Query type"); }

	// Get origin airport
	$originAirport = isset($_GET['originAirport']) ? $_GET['originAirport'] : "YYZ";
	if($debugv) { debug($originAirport, "Origin"); }

	// Get destination airport
	$destinationAirport = isset($_GET['destinationAirport']) ? $_GET['destinationAirport'] : "GIG";
	if($debugv) { debug($destinationAirport, "Destination"); }

	/* Do query and parse response. */
	// SAMPLE: http://www.ca.kayak.com/h/farealert?forcedisplay=true&nolink=y&calendar=true&o=YYZ&d=ATH&depart_date=01%2F08%2F2013

	// $today = date("d/m/Y",time());
	// $queryURL = "http://www.ca.kayak.com/h/farealert?forcedisplay=true&nolink=y&calendar=true&o=$originAirport&d=$destinationAirport&depart_date=$today";
	// if($debug) { debug($queryURL, "Query"); }

	$tbl_name="bylocation"; // Table name

	// Connect to server and select databse.
	mysql_connect("$host", "$username", "$password")or die("cannot connect");
	mysql_select_db("$db_name")or die("cannot select DB");

	$sql="SELECT origin, dest, departure_date, (price * $currencyMultiplier) as local_price FROM $tbl_name WHERE dest like '$destinationAirport' ORDER BY price LIMIT 10";
	if($debugv) { debug($sql, "Query"); }
	$result=mysql_query($sql);

	while ($row = mysql_fetch_assoc($result)) {
		$rows[] = $row;
	}

	if($debugv) { debug(json_encode($rows)); }

	echo json_encode($rows);
}

else if ($type == "date")
{
	if($debugv) { debug($type, "Query type"); }

	// Get Origin airport
	$originAirport = isset($_GET['originAirport']) ? $_GET['originAirport'] : "yyz";
	if($debugv) { debug($originAirport, "Origin"); }

	// Get departure date
	$departureDate = isset($_GET['departureDate']) ? $_GET['departureDate'] : date("d/m/Y",time());
	if($debugv) { debug($departureDate, "Departure date"); }

	// Get return date
	$returnDate = isset($_GET['returnDate']) ? $_GET['returnDate'] : date( "d/m/Y", strtotime("+7 days")); // FIX: Does not seem to be working.
	if($debugv) { debug($departureDate, "Return date"); }


	$tbl_name="bydate"; // Table name

	// Connect to server and select database.
	mysql_connect("$host", "$username", "$password")or die("cannot connect");
	mysql_select_db("$db_name")or die("cannot select DB");
	$sql="SELECT origin, dest_name, departure_date, return_date, stops, (price * $currencyMultiplier) as local_price FROM $tbl_name WHERE departure_date >= '$departureDate' AND return_date <= '$returnDate' ORDER BY price LIMIT 10";
	if($debugv) { debug($sql, "Query"); }
	$result=mysql_query($sql);

	while ($row = mysql_fetch_assoc($result)) {
		$rows[] = $row;
	}

	if($debugv) { debug(json_encode($rows)); }

	echo json_encode($rows);
}

else
{
	if($debug || $debugv) { throw new Exception("Unknown query type. Try date or location."); }
}

?>