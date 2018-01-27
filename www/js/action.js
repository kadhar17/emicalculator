var time=500;

$(document).ready(function(){
  $("input").focus(function(){
    navigator.vibrate(0)
    $("#toast-container").empty();
    recalcFn(mainScope);
  });
});


var circle,circle1;
function addcircleFn(){
  circle = new ProgressBar.Circle('#container', {
    color: '#18eca0',
    strokeWidth: 8,
    trailWidth: 8,
    duration: 1000,
    easing: 'easeInOut',
    text: {
      value: '0 %'
    },
    step: function(state, bar) {
      bar.setText((bar.value() * 100).toFixed(0)+" %");
    }
  });
}

//circle.animate(.5);  // Number from 0.0 to 1.0


function addcircleFn1(){
  circle1 = new ProgressBar.Circle('#container1', {
    color: '#18eca0',
    strokeWidth: 8,
    trailWidth: 8,
    duration: 1000,
    easing: 'easeInOut',
    text: {
      value: '0 %'
    },
    step: function(state, bar) {
      bar.setText((bar.value() * 100).toFixed(0)+" %");
    }
  });
}



//circle1.animate(.7);  // Number from 0.0 to 1.0


$('#input1').on('keyup', function(e) {
 var mEvent = e || window.event;
 var mPressed = mEvent.keyCode || mEvent.which;
 if (mPressed == 13) {
  // On enter, go to next input field
  document.getElementById('input2').focus();
}
limitText(this, 10)
//recalcFn(mainScope);
return true;
});

$('#input2').on('keyup', function(e) {
 var mEvent = e || window.event;
 var mPressed = mEvent.keyCode || mEvent.which;
 if (mPressed == 13) {
  // On enter, go to next input field
  document.getElementById('input3').focus();
}
limitText(this, 5);
//$(this).val(Number($(this).val()));
//recalcFn(mainScope);
return true;
});

$('#input3').on('keyup', function(e) {
 var mEvent = e || window.event;
 var mPressed = mEvent.keyCode || mEvent.which;
 if (mPressed == 13) {
  // On enter, go to next input field
  document.getElementById('button1').focus();
}
limitText(this, 3)
//recalcFn(mainScope);
return true;
});


function limitText(field, maxChar){

  var ref = $(field),
  val = ref.val();
  console.log("in maxchar " +val.length)
  if ( val.length >= maxChar){
    ref.val(function() {
      console.log("in maxchar " +val.substr(0, maxChar))
      val = val.substr(0, maxChar); 
      return val;      
    });
  }

}

$('#input2').on("input",function(e) {
  console.log("changeFn"+$(this).val())
  var str=$(this).val()
  var final1 = str.split(".");
  if(final1.length >= 3){
    $(this).val(String(final1[0]+"."+final1[1]+final1[2]));
  }
});



toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-bottom-full-width",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "300",
  "timeOut": "0",
  "extendedTimeOut": "1000",
  "showEasing": "linear",
  "hideEasing": "linear",
  "showMethod": "slideDown",
  "hideMethod": "fadeOut"
}
