//used jquery to select the 'Name' input element and place focus on it 

$('#name').focus();

$('#other-title').hide();

//hides the 'select design' option in the dropdown so that it cannot be reselected but leaves it as the default upon page load
$('#design').find('option').eq(0).hide();

//hides the 'other-title' text field if the 'other' option is not selected
$('#title').change(function (){
    const check_title = $(this).val();
    if (check_title === 'other'){
        $('#other-title').show();
    } else {
        $('#other-title').hide();
    }
});

//creates a variable to store the default option for the #color id
const $selectShirtTheme = '<option selected>Please select a T-Shirt theme</option>';

//hiding all color options until a design is selected setting the initial option to $selectShirtTheme
$('#color option').hide();
$('#color').prepend($selectShirtTheme);

//when one of the two themes is selected only the appropriate color will show
//the available colors are updated in the color field after selecting a theme
$('#design').change(function (){

   if ($(this).val() === 'js puns'){
      $('#color option:eq(1)').attr('selected', 'selected');
      $('#color').find('option:eq(1)').show();
      $('#color').find('option:eq(2)').show();
      $('#color').find('option:eq(3)').show();
      
      $('#color').find('option:eq(4)').hide();
      $('#color').find('option:eq(5)').hide();
      $('#color').find('option:eq(6)').hide();
       
   } else if ($(this).val() === 'heart js'){
      
      $('#color option:eq(4)').attr('selected', 'selected');
      $('#color').find('option:eq(4)').show();
      $('#color').find('option:eq(5)').show();
      $('#color').find('option:eq(6)').show();
       
      $('#color').find('option:eq(1)').hide();
      $('#color').find('option:eq(2)').hide();
      $('#color').find('option:eq(3)').hide();
   }
});

let totalActivityCost = 0;
const $totalActivityCostElement = "<span id='activity-cost'></span>";

$('.activities').append($totalActivityCostElement);

//event listener to add the cost of the clicked events together and append them to activities class
$('.activities').change(function (e) {
   const $checkboxInput = $(e.target);
   let $textInput = $checkboxInput.parent().text();
   //console.log($textInput);
   const $signIndex = $textInput.indexOf("$");
    
   let costOfActivity = ($textInput).slice($signIndex +1);
   let numCost = parseInt(costOfActivity);
    //console.log(numCost);
    //console.log(typeof(numCost));
    
    if ($checkboxInput.prop("checked") == true){
        totalActivityCost += numCost;
    } else if ($checkboxInput.prop("checked") == false){
        totalActivityCost -= numCost;
    }
    console.log(totalActivityCost);
    $('#activity-cost').text('Total: $' + totalActivityCost);
    
    const emIndex = $textInput.indexOf("—");
    
    const commaIndex = $textInput.indexOf(",");
    
    let timeOfEvent = ($textInput).slice(emIndex);
    let dayOfEvent = ($textInput).slice(commaIndex);
    let dayAndTimeOfEvent = ($textInput).slice(emIndex+1, commaIndex);
    
    //console.log(dayAndTimeOfEvent);
    
    let checkBoxes = $('.activities').find('input');
    //loop through the activities to check which ones are during the same day and time
    for (let i = 0; i <= checkBoxes.length; i++ ){
        let checkBox = $(checkBoxes[i]).parent().text();
        
        console.log(checkBox);
        
        if (checkBox.includes(dayAndTimeOfEvent) && checkBox !== $textInput){
           $(checkBoxes[i]).prop('disabled', true);
        }
        if (!$($checkboxInput).prop('checked') && checkBox.includes(dayAndTimeOfEvent) && checkBox !== $textInput){
            $(checkBoxes[i]).prop('disabled', false);
        }
        
    }
    
});

//made the initial payment option selected as the credit card option and hid the 'Select payment option' option
$('#payment option:eq(1)').attr('selected', 'selected');
$('#payment').find('option:eq(0)').hide();

//hid the text for other payment options that are not credit card
$('p').hide();

//method that checks to see if any other payment options other than credit card are selected
$('#payment').change(function (){
   if ($(this).val()==='paypal' || $(this).val()==='bitcoin'){
       $('.credit-card').hide();
       $('p').show();
   } else if ($(this).val()==='credit card'){
       $('.credit-card').show();
       $('p').hide();
   }
});

/**
 * 
 * VALIDATORS
 *  
 */

function isValidName() {
    const nameInput = $("#name").val();
    return /^[a-zA-Z] ?[a-zA-Z]+$/i.test(nameInput);
}


function isValidCardNumber() {
    const cardNumberInput = $("#cc-num").val();
    return /^4\d{3}([\ \-]?)(?:\d{4}\1){2}\d(?:\d{3})?$/.test(cardNumberInput);
}

function isValidCVV() {
    const cvvNumberInput = $("#cvv").val();
    return /^[0-9]{3,4}$/.test(cvvNumberInput);
}

// Must be a valid email address
function isValidEmail() {
    const emailInput = $("#mail").val();
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput);
}

function isValidZip(){
    const zipNumberInput = $("#zip").val();
    return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipNumberInput);
}

function isValidActivity (){
    if (totalActivityCost === 0){
        return false;
    } else {
        return true;
    }
}

//checks text entry validation and makes border red if it fails the validation check by selecting the id associated with each text input field
$('#mail').change(function (){
    let $mail = $('#mail').val();
    let mailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i.test($mail);
    if(mailRegex === true){
        console.log('mail validation');
        $('#mail').css('border', 'none');
    }else{
        $('#mail').css('border', '2px solid red');
    }
});

$('#name').change(function (){
    let $name = $('#name').val();
    let nameRegex = /^[a-zA-Z] ?[a-zA-Z]+$/.test($name);
    if(nameRegex === true){
        console.log('name validation');
        $('#name').css('border', 'none');
    }else{
        $('#name').css('border', '2px solid red');
    }
});

$('#cvv').change(function (){
    let $cvv = $('#cvv').val();
    let cvvRegex = /^[0-9]{3,4}$/.test($cvv);
    if(cvvRegex === true){
        console.log('cvv validation');
        $('#cvv').css('border', 'none');
    }else{
        $('#cvv').css('border', '2px solid red');
    }
});

$('#cc-num').change(function (){
    let $ccNum = $('#cc-num').val();
    let ccNumRegex = /^4\d{3}([\ \-]?)(?:\d{4}\1){2}\d(?:\d{3})?$/.test($ccNum);
    if(ccNumRegex === true){
        console.log('cc num validation');
        $('#cc-num').css('border', 'none');
    }else{
        $('#cc-num').css('border', '2px solid red');
    }
});

$('#zip').change(function (){
    let $zip = $('#zip').val();
    let zipRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test($zip);
    if(zipRegex === true){
        console.log('zip code validation');
        $('#zip').css('border', 'none');
    }else{
        $('#zip').css('border', '2px solid red');
    }
});

//the on click listener for the 'register' button does all the checks on the required fields, ensures that if credit card is checked
// that the zip, card number, and cvv are specifically validated along with all other required fields
$('button').on('click', function (e) {
    let payment_check = $('#payment').val();
    if (payment_check === 'credit card'){
        if (isValidActivity() === true && isValidCardNumber() === true && isValidCVV() === true && isValidZip() === true && isValidName() === true && isValidEmail() === true){
            alert('Thank you for submitting your registration for. We look forwarding to seeing you!');
        } else {
            e.preventDefault();
            alert('Please enter all required credit card information.');
        }
    }
    if (isValidActivity() === false){
        alert('Please select an activity.');
    }
    if (isValidEmail() === false){
        alert('Please enter a valid email address.');
        $('#mail').focus();
    }
    if (isValidName() === false){
        alert('Please enter a valid name.');
        $('#name').focus();
    }
    
    //checks to see if 'bitcoin' or 'paypal' are selected and exclude the required credit card info 
    if (payment_check === 'bitcoin' || payment_check === 'paypal'){
        if (isValidActivity() === true && isValidName() === true && isValidEmail() === true){
            alert('Thank you for submitting your registration form. We look forwarding to seeing you!');
        } else {
            e.preventDefault();
        }
    }
});














