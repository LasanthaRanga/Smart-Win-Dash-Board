<HTML>
	 <head>
	 <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
	 <link rel="stylesheet" href="sweetalert2.min.css">
	 <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
	 <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js" integrity="sha384-eMNCOe7tC1doHpGoWe/6oMVemdAVTMs2xqW4mwXrXsW0L84Iytr2wi5v2QjrP/xp" crossorigin="anonymous"></script>
     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.min.js" integrity="sha384-cn7l7gDp0eyniUwwAZgrzD06kc/tftFf19TOAs2zVinnD/C7E91j9yyk5//jjpt/" crossorigin="anonymous"></script>
	 <script src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
	<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
	<script type='text/javascript'>



function pos(order,status,description){
			$.ajax({
        method: "POST",
        url: "http://localhost:3000/onpay/updateby_orderid",
        data: { order:order, status:status},
		success: function (data) {
			console.log(data);
			if(status == 1){
				console.log('1111111');
				window.location.href = "http://localhost:4200/#/regon";
			}else if(status == 2){
				console.log('2222222');
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: description+" !",
					footer: '<a href="">Why do I have this issue?</a>'
					})
			}else if(status == 3){
				console.log('xxxxxxx');
									Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: description+" !",
					footer: '<a href="">Why do I have this issue?</a>'
					})
			}

		}
})
		}


		</script>


	 <style>
		
		.cen{
			padding: 110px 0;
			border: 0px solid ;
			text-align: center;
		 }

		 body {
			background-image: url('aa.jpg');
			background-repeat: no-repeat;
			background-attachment: fixed;  
			background-size: cover;
				}
				/* td{
					text-align: center;
				} */

				.left{
				   text-align: left;
				   font-weight: bold;
				}

				.right{
				   text-align: right;
				   font-weight: bold;
				}

.card-body{
	radius:5px !important;
}
     </style>
	</head>
<body>

<div class="cen">
<div class="col d-flex justify-content-center">
	<div class="card text-center">
  <div class="card-header">
    <b>Smart - win</b>
  </div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
	<?php

	
	// echo ($_GET["data"]);
	// echo '<br>';
	// echo ($_GET["OrderID"]);
	// echo '<br>';
	// echo ($_GET["amount"]);
	// echo '<br>';
	// echo ($_GET["Nprice"]);

	$has = null;
	$data = $_GET["data"];
	$OrderID = $_GET["OrderID"];
	$amount = $_GET["amount"];
	$Nprice = $_GET["Nprice"];
	$Bcharges = $_GET["Bcharges"];
	$pprice = $_GET["pprice"];


	$has = base64_encode(SHA1($data, TRUE));

	
		$ROrderID = $_REQUEST["OrderID"];
		$RResponseCode = $_REQUEST["ResponseCode"];
		$RReasonCodeDesc =	$_REQUEST["ReasonCodeDesc"];

	?>
	<?php
	//  print_r($_REQUEST);
	//  print_r($_REQUEST["ReasonCodeDesc"]);
	?>

<?php
	if($_REQUEST["ResponseCode"] == 1){
		// echo("1111111111");
	
	}else if($_REQUEST["ResponseCode"] == 2){
		// echo("2222222222");
	
	}else if($_REQUEST["ResponseCode"] == 3){
		// echo("3333333333");
	
	}

echo "
<script> 
pos('$ROrderID','$RResponseCode','$RReasonCodeDesc'); 
</script>
"; 
 ?> 

	<form id='FrmHtmlCheckout' name='FrmHtmlCheckout' action='https://pg.peoplesbank.lk/OrderProcessingEngine/RedirectLink.aspx' method='post'>

		<!-- <label>Version</label> -->
		<input id='Version' type='hidden' name='Version' value='1.0.0'>
		<!-- </br> -->


		<!-- <label>MerID</label> -->
		<input id='MerID' type='hidden' value='1000000003127' name='MerID'>
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

		<hr>
		<br>

		<label>Order Num : <?php echo $OrderID ?></label>
		<input id='OrderID' type='hidden' value='<?php echo $OrderID ?>' name='OrderID'>
		</br>

		<label>Product Price : <?php echo $pprice ?></label>
		<br>

		<label>Bank Charges : <?php echo $Bcharges ?></label>
		<br>

		<!-- <label>SignatureMethod</label> -->
		<input id='SignatureMethod' type='hidden' value='SHA1' name='SignatureMethod'>
		<!-- </br> -->


		<label> <b> Total Amount (LKR) : <?php echo $Nprice ?> </b> </label>
		<input id='PurchaseAmt' type='hidden' value='<?php echo $amount ?>' name='PurchaseAmt'>
		</br>


		<!-- <label>Signature</label> -->
		<input id='Signature' type='hidden' value="<?php echo $has ?>" name='Signature'>
		<!-- </br> -->

		<!-- <table style="width:100%">
		<tr>
		<td><label class="right">Order Num</label></td> 
		<td><label class="left"><?php echo $OrderID ?></label></td> 
		</tr>
		<tr>
		<td><label class="right">Purchase Amount (LKR)</label></td>
		<td><label class="left"><?php echo $Nprice ?></label></td>
		</tr>
		</table> -->
		<br>
			<div class="row">
				<div col d-flex justify-content-center>
				<input type="submit" value="     Confime   " class="btn btn-primary" >	
			    </div>
			</div>
	</form>



    <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
  </div>
  <!-- <div class="card-footer text-muted">
    2 days ago
  </div> -->
</div>
	</div>
	
			
</body>

</HTML>