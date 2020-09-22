// listen for submit
const calcu = document.getElementById('loan-form');

calcu.addEventListener('submit', function(e){
//hide results
document.getElementById('results').style.display = 'none';

//show loader
document.getElementById('loading').style.display = 'block';
setTimeout(calculateResults, 2000);

  e.preventDefault();
});
// calculate results
function calculateResults() {
// alert('hii');


  //UI vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest)/(x-1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
    document.getElementById('results').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
  } else {
    //hide loader
    document.getElementById('loading').style.display = 'none';
    
    showError('Please check your numbers');
  }
 
function showError(error) {
  //create a div
  const errorDiv = document.createElement('div');
  //get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));
  card.insertBefore(errorDiv, heading);
  //set timer
  setTimeout(clearError, 3000);
  function clearError() {
    document.querySelector('.alert').remove();
  }

}
}