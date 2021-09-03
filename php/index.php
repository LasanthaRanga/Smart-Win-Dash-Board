<HTML>

<body>
	<?php
	echo ($_GET["data"]);
	echo '<br>';
	echo ($_GET["OrderID"]);
	echo '<br>';
	echo ($_GET["amount"]);

	$has = null;
	$data = $_GET["data"];
	$OrderID = $_GET["OrderID"];
	$amount = $_GET["amount"];

	$has = base64_encode(SHA1($data, TRUE));

	?>
	<?php
	print_r($_REQUEST);
	print_r($_REQUEST["ReasonCodeDesc"]);
	?>

	<form id='FrmHtmlCheckout' name='FrmHtmlCheckout' action='https://pg.peoplesbank.lk/OrderProcessingEngine/RedirectLink.aspx' method='post'>

		<!-- <label>Version</label> -->
		<input id='Version' type='hidden' name='Version' value='1.0.0'>
		<!-- </br> -->


		<!-- <label>MerID</label> -->
		<input id='MerID' type='hidden' value='1000000000390' name='MerID'>
		<!-- </br> -->


		<!-- <label>AcqID</label> -->
		<input id='AcqID' type='hidden' value='512940' name='AcqID'>
		<!-- </br> -->


		<!-- <label>MerRespURL</label> -->
		<input id='MerRespURL' type='hidden' value='http://localhost/peoplsbank/index.php' name='MerRespURL'>
		<!-- </br> -->


		<!-- <label>PurchaseCurrency</label> -->
		<input id='PurchaseCurrency' type='hidden' value='144' name='PurchaseCurrency'>
		<!-- </br> -->


		<!-- <label>PurchaseCurrencyExponent</label> -->
		<input id='PurchaseCurrencyExponent' type='hidden' value='2' name='PurchaseCurrencyExponent'>
		<!-- </br> -->


		<label>OrderID</label>
		<input id='OrderID' type='text' value='smt2021831-203' name='OrderID'>
		</br>


		<!-- <label>SignatureMethod</label> -->
		<input id='SignatureMethod' type='hidden' value='SHA1' name='SignatureMethod'>
		<!-- </br> -->


		<label>PurchaseAmt</label>
		<input id='PurchaseAmt' type='text' value='000000000100' name='PurchaseAmt'>
		</br>


		<!-- <label>Signature</label> -->
		<input id='Signature' type='hidden' value="<?php echo $has ?>" name='Signature'>
		<!-- </br> -->

		<label>Conferm</label>
		<input type="submit" value="Submit">
	</form>
</body>

</HTML>