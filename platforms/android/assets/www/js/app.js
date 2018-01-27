var app=angular.module("myapp",[]); 

app.run(function($rootScope){
	$rootScope.title="EMI Calculator";
	$rootScope.currencytype="\u20B9";//₹;
});
var mainScope;

app.controller("emicalculator",function($location,$scope,$anchorScroll,$filter){

	$scope.principal=100000;
	$scope.interest=13.5;
	$scope.duration=48;
	$scope.totalamount=0;
	$scope.emiamount=0;
	$scope.interestamount=0;
	$scope.interestpercentage=0;
	$scope.principalpercentage=0;
	$scope.emichartval=false;
	$scope.emicostval=false;
	$scope.emichart=[];
	$scope.typed="";
	var tid;

	$scope.emicalculatorFn=function(p,r,t,callfrom){
		$scope.emichartval=false;
		$scope.emicostval=false;
		var amnt;
		console.log("p = "+p+" r = "+r+" t = "+t)
		if ((p ==null || p.length == 0 ) || (t==null || t.length == 0) || (r==null || r.length == 0)){ 
			amnt = "Incomplete data";
			
			$scope.emichartval=false;
			$scope.emicostval=false;
			if(p==undefined){
				$("#input1").val('');
			}
			if(r==undefined){
				$("#input2").val('');
			}
			if(t==undefined){
				$("#input3").val('');
			}
			navigator.vibrate(0)
			navigator.vibrate(time)
			$("#toast-container").empty();
			toastr["error"]("Please enter mandatory fields.");
			
		}
		else
		{
			var princ = p;
			var term  = t;
			var intr   = r / 1200;
			amnt = princ * intr / (1 - (Math.pow(1/(1 + intr), term)));

			if(!isNaN(amnt) && amnt!="Infinity"){


				if(p<=1000000000 && r<=50 && t<=360){

					if(callfrom=="emicalc"){
						$scope.emichartval=true;
						$scope.emicostval=false;
					}else if(callfrom=="recalcFn"){
						$scope.emichartval=false;
						$scope.emicostval=false;
					}else{
						$scope.emichartval=false;
						$scope.emicostval=true;
					}

					$scope.totalamount=(amnt  * t).toFixed(1);
					$scope.emiamount=(amnt).toFixed(1);
					$scope.interestamount=($scope.totalamount-$scope.principal).toFixed(1);
					$scope.interestpercentage= Math.round(($scope.interestamount/$scope.totalamount) * 100);
					$scope.principalpercentage= Math.round(($scope.principal/$scope.totalamount) * 100);

					$('html, body').animate({
						scrollTop: $('#'+"calandrst").offset().top
					}, 600);
				}else{
					$("#toast-container").empty();
					clearInterval(tid);
					var arr=[""];

					if(Number(p)>1000000000){
						$scope.principal='';
						$("#input1").val('');
						arr[arr.length]=["principal upto 1,00,00,00,000"];
					}
					if(Number(r)>50){
						$scope.interest='';
						$("#input2").val('');
						arr[arr.length]=["interest upto 50 %"];
					}
					if(Number(t)>360){
						$scope.duration='';
						$("#input3").val('');
						arr[arr.length]=["tenure upto 360 months"];

					}
					
					var i=1;
					navigator.vibrate(0)
					navigator.vibrate(time)
					toastFn();
					tid=setInterval(toastFn,1000)

					function toastFn(){
						//console.log(arr[i]+" "+i)
						if(i<(arr.length)){
							$("#toast-container").empty();
							toastr["error"]("Please enter "+arr[i]+".")
							i++;
						}else{
							clearInterval(tid);
						}

					}
				}
			}else{
				navigator.vibrate(0)
				navigator.vibrate(time)
				$("#toast-container").empty();
				clearInterval(tid);
				var arr=[""];

				if(isNaN(p)){
					$scope.principal='';
					$("#input1").val('');
					arr[arr.length]=["principal"];
				}
				if(isNaN(r)){
					$scope.interest='';
					$("#input2").val('');
					arr[arr.length]=["interest"];
				}
				if(isNaN(t)){
					$scope.duration='';
					$("#input3").val('');
					arr[arr.length]=["duration"];

				}
				var i=1;
				navigator.vibrate(0)
				navigator.vibrate(time)
				toastFn();
				tid=setInterval(toastFn,1000)

				function toastFn(){
					//console.log(arr[i]+" "+i)
					$("#toast-container").empty();
					if(i<(arr.length)){
						toastr["error"]("Enter a Valid "+arr[i]+".")
						i++;
					}else{
						clearInterval(tid);
					}

				}
			}

		}
		//console.log("emi "+$scope.emiamount+" "+amnt+" "+callfrom)
		return amnt;
	}

	$scope.resetFn=function(){
		navigator.vibrate(0)
		$("#toast-container").empty();
		$scope.principal='';
		$scope.interest='';
		$scope.duration='';
		$scope.totalamount='';
		$scope.emiamount='';
		$scope.emichartval=false;
		$scope.emicostval=false;
		$scope.typed="";
		$scope.interestamount='';

		$("#input1").val('');
		$("#input2").val('');
		$("#input3").val('');

		$('html, body').animate({
			scrollTop: $('#'+"calculation").offset().top
		}, 600);

		// $location.hash('calculation');
		// $anchorScroll();
	}

	$scope.bar=function(){
		$("#container").empty();
		addcircleFn()
		circle.animate(0);
		if($scope.emiamount>0 && $scope.emichartval==false){
			setTimeout(function(){
				circle.animate($scope.principalpercentage/100);
			},700);
			return true;
		}
	}

	$scope.bar1=function(){
		$("#container1").empty();
		addcircleFn1()
		circle1.animate(0);
		if($scope.emiamount>0 && $scope.emichartval==false){
			setTimeout(function(){
				circle1.animate($scope.interestpercentage/100);
			},700);
			return true;
		}
	}

	$scope.emichartFn=function(){
		$scope.emicalculatorFn($scope.principal,$scope.interest,$scope.duration,"emicalc");
		$scope.emicostval=false;
		$scope.emichart[0]={"interest":0,"principal":0,"balance":0};
		$scope.emichart=[];
		var int_dd,pre_dd,end_dd,emical=0;
		var loanAmount=$scope.principal;
		var rateOfInterest=$scope.interest;
		var bb=parseInt(loanAmount);
		var numberOfMonths=$scope.duration;
		var monthlyInterestRatio = (rateOfInterest/100)/12;
		var top = Math.pow((1+monthlyInterestRatio),numberOfMonths);
		var bottom = top -1;
		var sp = top / bottom;
		var emi = ((loanAmount * monthlyInterestRatio) * sp);
		for (var j=1;j<=numberOfMonths;j++){
			int_dd = (bb * ((rateOfInterest/100)/12));
			pre_dd = (emi - int_dd);
			emical=emi.toFixed(2);
			end_dd = (bb - pre_dd);
			bb = (bb - pre_dd);

			$scope.emichart[0]={"interest":"Interest","principal":"Principal","balance":"Balance"};
			$scope.emichart[j]={"interest":0,"principal":0,"balance":0};
			$scope.emichart[j]["interest"]=Math.round(int_dd);
			$scope.emichart[j]["principal"]=Math.round(pre_dd);
			$scope.emichart[j]["balance"]=Math.round((end_dd));
			//console.log(pre_dd+" "+int_dd+" "+emical+"  "+end_dd);
		}

	}
	//console.log($scope.emichart);

	$scope.principalFn=function(){
		return $filter('thouseparator')(Number($scope.principal));
	}

	$scope.durationFn=function(){
		return $filter('yrmonseparator')(Number($scope.duration));
	}

});

function recalcFn(scope){
	mainScope=scope;
	setTimeout(function(){
		console.log("scope "+scope.principal+" "+scope.interest+" "+scope.duration)
		scope.emichartval=false;
		scope.emicostval=false;
		scope.$apply();
		//console.log("duration"+scope.duration)
	})
}

app.directive('allowOnlyNumbers', function () {  
	return {  
		restrict: 'A',  
		link: function (scope, elm, attrs, ctrl) {  
			elm.on('keydown', function (event) {  
				var $input = $(this); 
				//alert("downno");

				scope.typed+=String(event.which)+" ";

				if ((event.which >= 48 && event.which <= 57)) {  
                            // to allow numbers    
                            recalcFn(scope)
                            return true;  
                        } else if ((event.which >= 96 && event.which <= 105)) {  
                            // to allow numpad number  
                            recalcFn(scope)
                            return true;  
                        } else if (([8, 13, 27, 37, 38, 39, 40].indexOf(event.which) > -1)) {  
                            // to allow backspace, enter, escape, arrows
                            recalcFn(scope)
                            return true;  
                        } else {  
                        	event.preventDefault();  
                            // to stop others  
                            return false;  
                        }  
                    });  
		}  
	}  
});  

app.directive('allowDecimalNumbers', function () {  
	return {  
		restrict: 'A',  
		link: function (scope, elm, attrs, ctrl) {  
			elm.on('keydown', function (event) {  

				var $input = $(this);  
				var value = $input.val();  
				//alert("downdec");
				value = value.replace(/[^0-9\.]/g, '')  
				var findsDot = new RegExp(/\./g)  
				var containsDot = value.match(findsDot)  

				if (containsDot != null && ([190,110].indexOf(event.which) > -1)) {  
					event.preventDefault();  
					return false;  
				}

				scope.typed+=String(event.which)+" ";

				$input.val(value);  
				
				if (([8, 13, 27, 37, 38, 39, 40, 110].indexOf(event.which) > -1)) {  
                    // backspace, enter, escape, arrows  
                    recalcFn(scope)
                    return true;  
                } else if ((event.which >= 48 && event.which <= 57)) {  
                    // numbers  
                    recalcFn(scope)
                    return true;  
                } else if ((event.which >= 96 && event.which <= 105)) {  
                    // numpad number 
                    recalcFn(scope)
                    return true;  
                }
                else {  
                	event.preventDefault();  
                	return false;  
                }  

            });  
		}
	}  
});  

app.filter("thouseparator",function(){
	return function(x){ 
		console.log("principal "+x)
		if(x>=0){
			var x=String(x);
			var arr=[];
			arr=x.split(".");
			//console.log(arr);
			var str;

			if(arr.length>1){
				str=numberdeciWithCommas(x)
			}else{
				str=numberWithCommas(x);
			}

			function numberWithCommas(x) {
				x=x.toString();
				var lastThree = x.substring(x.length-3);
				var otherNumbers = x.substring(0,x.length-3);
				if(otherNumbers != '')
					lastThree = ',' + lastThree;
				var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
				return res;
			}

			function numberdeciWithCommas(x) {
				x=x.toString();
				var afterPoint = '';
				if(x.indexOf('.') > 0)
					afterPoint = x.substring(x.indexOf('.'),x.length);
				x = Math.floor(x);
				x=x.toString();
				var lastThree = x.substring(x.length-3);
				var otherNumbers = x.substring(0,x.length-3);
				if(otherNumbers != '')
					lastThree = ',' + lastThree;
				var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
				return res;
			}
			console.log(str);
			return str;
		}else{
			x= 0;
			return x;
		}
	}
})


app.filter("yrmonseparator",function(){
	return function(x){ 
		var year,month;
		year=parseInt(x/12);
		month=x%12;
		//console.log(year+" : "+month);
		if((year>0 && year<=1) && (month>0 && month<=1)){
			return year+" yr"+" "+month+" mon.";
		}
		else if((year>0 && year<=1) && month>1){
			return year+" yr"+" "+month+" mon.";
		}
		else if((year>1) && month>1){
			return year+" yr"+" "+month+" mon.";
		}
		else if((year>1) && (month>0 && month<=1)){
			return year+" yr"+" "+month+" mon.";
		}
		else if(year<=0 && (month>0 && month<=1)){
			return month+" mon.";
		}
		else if(year<=0 && month>1){
			return month+" mon.";
		}
		else if((year>0 && year<=1) && month<=0){
			return year+" yr.";
		}
		else if((year>1) && month<=0){
			return year+" yr.";
		}
	}
})

