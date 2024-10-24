// Show payment info function
function showPaymentInfo() {
    const paymentSection = document.getElementById('paymentInfo'); // Updated ID to 'paymentInfo'
    if (paymentSection) {
        paymentSection.style.display = 'block';
        paymentSection.scrollIntoView({ behavior: 'smooth' });  // Scroll to payment section
    }
  }  

// Fetch total function
async function fetchTotal() {
    try {
        const donationTotalElement = document.getElementById('donation-total'); // Correct element ID
  
        if (donationTotalElement) {
            donationTotalElement.style.opacity = '0.5';
            donationTotalElement.style.transform = 'scale(0.9)';  // Keep visual effect
        }
  
        const response = await fetch('/api/total');
        if (!response.ok) throw new Error('Failed to fetch total');
  
        const data = await response.json();
        const bengaliTotal = convertToBengaliNumerals(data.total.toFixed(2).toString());
  
        if (donationTotalElement) {
            donationTotalElement.textContent = `${bengaliTotal} টাকা`;
            donationTotalElement.style.opacity = '1';
            donationTotalElement.style.transform = 'scale(1)';  // Reset scaling after loading
        }
  
    } catch (error) {
        console.error('Error fetching total:', error);
        const donationTotalElement = document.getElementById('donation-total');
        if (donationTotalElement) donationTotalElement.textContent = '০.০০ টাকা';
    }
  }  

function convertToBengaliNumerals(number) {
  const bengaliNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return number.replace(/[0-9]/g, match => bengaliNumerals[+match]);
}

// Fetch total and set interval
fetchTotal();
setInterval(fetchTotal, 5000);
