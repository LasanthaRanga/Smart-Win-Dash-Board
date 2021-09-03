<HTML>
<body>
   
<?php
print_r($_REQUEST); 
//print_r($_REQUEST[3]); 
?> 

<form id='FrmHtmlCheckout' name='FrmHtmlCheckout' 
action='https://pg.peoplesbank.lk/OrderProcessingEngine/RedirectLink.aspx' method='post'>

<label>Version</label>
<input id='Version' type='text' name='Version' value=''>
</br>


<label>MerID</label>
<input id='MerID' type='text' value='' name=''>
</br>


<label>AcqID</label>
<input id='AcqID' type='text' value='' name='AcqID'>
</br>


<label>MerRespURL</label>
<input id='MerRespURL' type='text' value='' name='MerRespURL'>
</br>


<label>PurchaseCurrency</label>
<input id='PurchaseCurrency' type='text' value='' name='PurchaseCurrency'>
</br>


<label>PurchaseCurrencyExponent</label>
<input id='PurchaseCurrencyExponent' type='text' value='' name='PurchaseCurrencyExponent'>
</br>


<label>OrderID</label>
<input id='OrderID' type='text' value='' name='OrderID'>
</br>


<label>SignatureMethod</label>
<input id='SignatureMethod' type='text' value='' name='SignatureMethod'>
</br>


<label>PurchaseAmt</label>
<input id='PurchaseAmt' type='text' value='' name='PurchaseAmt'>
</br>


<label>Signature</label>
<input id='Signature' type='text' value='' name='Signature'>
</br>

<label>Submit</label>
 <input type="submit" value="Submit">
	</form>	

	<script>
	let searchParams = new URLSearchParams(window.location.search);
        searchParams.has('data') // true
        if (searchParams.has('data')) {
            let param = JSON.parse(searchParams.get('data'));
            console.log(param.AcqID);
			document.getElementById("Version").value = param.Version; 
			document.getElementById("MerID").value = param.MerID;
			document.getElementById("AcqID").value = param.AcqID;
			document.getElementById("MerRespURL").value = param.MerRespURL;
			document.getElementById("PurchaseCurrency").value = param.PurchaseCurrency;
			document.getElementById("PurchaseCurrencyExponent").value = param.PurchaseCurrencyExponent;
			document.getElementById("OrderID").value = param.OrderID;
			document.getElementById("SignatureMethod").value = param.SignatureMethod;
			document.getElementById("PurchaseAmt").value = param.PurchaseAmt;
			document.getElementById("Signature").value = param.Signature;
			
        }
    </script>



	</body>
</HTML>