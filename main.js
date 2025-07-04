// Student Database — only numeric keys
const studentDatabase = {
    '1': { group: 'Computer Science', status: 'passed', name: 'Arjun Sharma' },
    '2': { group: 'Computer Science', status: 'passed', name: 'Priya Patel' },
    '3': { group: 'Computer Science', status: 'passed', name: 'Rohit Kumar' },
    '4': { group: 'Computer Science', status: 'passed', name: 'Sneha Gupta' },
    '5': { group: 'Computer Science', status: 'passed', name: 'Manjila Aryal' },
    '6': { group: 'Computer Science', status: 'passed', name: 'Kavya Reddy' },
    '7': { group: 'Computer Science', status: 'passed', name: 'Rahul Joshi' },
    '8': { group: 'Computer Science', status: 'passed', name: 'Anisha Thapa' },
  
    '27': { group: 'Computer Science', status: 'waiting', name: 'Manjil Aryal', rank: 1 },
    '16': { group: 'Computer Science', status: 'waiting', name: 'Ritu Shrestha', rank: 2 },
    '17': { group: 'Computer Science', status: 'waiting', name: 'Kiran Tamang', rank: 3 },
    '18': { group: 'Computer Science', status: 'waiting', name: 'Maya Rai', rank: 4 },
    '19': { group: 'Computer Science', status: 'waiting', name: 'Bibek Adhikari', rank: 5 },
  
    '43': { group: 'Biology', status: 'passed', name: 'Shirish Poudel' },
    '100': { group: 'Biology', status: 'passed', name: 'Khagendra Raj Baral' },
    '243': { group: 'Biology', status: 'passed', name: 'Shreyashi Poudel' },
    '104': { group: 'Biology', status: 'passed', name: 'Krishna Magar' },
    '105': { group: 'Biology', status: 'passed', name: 'Sushma Bista' },
    '166': { group: 'Biology', status: 'passed', name: 'Aditya Gurung' },
    '132': { group: 'Computer', status: 'passed', name: 'Riwaj Lamichanne' },
  
    '28': { group: 'Biology', status: 'waiting', name: 'Prabhash Paudel', rank: 1 },
    '113': { group: 'Biology', status: 'waiting', name: 'Bir Singh Budha', rank: 2 },
    '114': { group: 'Biology', status: 'waiting', name: 'Sunita Pandey', rank: 3 },
    '115': { group: 'Biology', status: 'waiting', name: 'Rajan Chhetri', rank: 4 },
    '116': { group: 'Biology', status: 'waiting', name: 'Meera Sapkota', rank: 5 }
  };
  
  // DOM elements
  const searchForm = document.getElementById('searchForm');
  const symbolNumberInput = document.getElementById('symbolNumber');
  const searchBtn = searchForm.querySelector('.search-btn');
  const resultSection = document.getElementById('resultSection');
  const resultCard = document.getElementById('resultCard');
  const resultIcon = document.getElementById('resultIcon');
  const resultTitle = document.getElementById('resultTitle');
  const resultMessage = document.getElementById('resultMessage');
  const studentInfo = document.getElementById('studentInfo');
  const searchAgainBtn = document.getElementById('searchAgain');
  const searchSection = document.querySelector('.search-section');
  
  // Event listeners
  searchForm.addEventListener('submit', handleFormSubmit);
  searchAgainBtn.addEventListener('click', showSearchForm);
  symbolNumberInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, ''); // Allow numbers only
  });
  
  function handleFormSubmit(e) {
    e.preventDefault();
    const symbolNumber = symbolNumberInput.value.trim();
  
    if (!symbolNumber) {
      showError('Please enter a valid number');
      return;
    }
  
    setLoadingState(true);
  
    setTimeout(() => {
      checkResult(symbolNumber);
      setLoadingState(false);
    }, 1000);
  }
  
  function setLoadingState(loading) {
    if (loading) {
      searchBtn.textContent = 'Checking...';
      searchBtn.disabled = true;
    } else {
      searchBtn.textContent = 'Check Result';
      searchBtn.disabled = false;
    }
  }
  
  function checkResult(symbolNumber) {
    const student = studentDatabase[symbolNumber];
  
    if (student) {
      if (student.status === 'passed') {
        showPassedResult(student, symbolNumber);
      } else if (student.status === 'waiting') {
        showWaitingResult(student, symbolNumber);
      }
    } else {
      showFailedResult(symbolNumber);
    }
  }
  
  function showPassedResult(student, symbolNumber) {
    resultIcon.innerHTML = '🎉';
    resultIcon.className = 'result-icon success';
    resultTitle.textContent = 'Congratulations!';
    resultTitle.className = 'result-title success';
    resultMessage.textContent = 'You have passed the entrance exam.';
  
    studentInfo.innerHTML = `
      <div class="info-item"><span class="info-label">Symbol Number:</span> <span>${symbolNumber}</span></div>
      <div class="info-item"><span class="info-label">Student Name:</span> <span>${student.name}</span></div>
      <div class="info-item"><span class="info-label">Group:</span> <span>${student.group}</span></div>
      <div class="info-item"><span class="info-label">Status:</span> <span>✅ PASSED</span></div>
    `;
  
    showResultSection();
  }
  
  function showWaitingResult(student, symbolNumber) {
    resultIcon.innerHTML = '⏳';
    resultIcon.className = 'result-icon warning';
    resultTitle.textContent = 'You are on the waiting list.';
    resultTitle.className = 'result-title warning';
    resultMessage.textContent = 'Wait for further updates.';
  
    studentInfo.innerHTML = `
      <div class="info-item"><span class="info-label">Symbol Number:</span> <span>${symbolNumber}</span></div>
      <div class="info-item"><span class="info-label">Student Name:</span> <span>${student.name}</span></div>
      <div class="info-item"><span class="info-label">Group:</span> <span>${student.group}</span></div>
      <div class="info-item"><span class="info-label">Rank:</span> <span>#${student.rank}</span></div>
      <div class="info-item"><span class="info-label">Status:</span> <span>⏳ WAITING</span></div>
    `;
  
    showResultSection();
  }
  
  function showFailedResult(symbolNumber) {
    resultIcon.innerHTML = '❌';
    resultIcon.className = 'result-icon danger';
    resultTitle.textContent = 'Not Qualified';
    resultTitle.className = 'result-title danger';
    resultMessage.textContent = 'We’re sorry — your name is not on the list of qualified candidates.';
  
    studentInfo.innerHTML = `
      <div class="info-item"><span class="info-label">Number:</span> <span>${symbolNumber}</span></div>
      <div class="info-item"><span class="info-label">Status:</span> <span>❌ NOT QUALIFIED</span></div>
    `;
  
    showResultSection();
  }
  
  function showResultSection() {
    searchSection.style.display = 'none';
    resultSection.style.display = 'block';
  }
  
  function showSearchForm() {
    resultSection.style.display = 'none';
    searchSection.style.display = 'block';
    symbolNumberInput.value = '';
    symbolNumberInput.focus();
  }
  
  function showError(message) {
    symbolNumberInput.style.borderColor = '#e74c3c';
    symbolNumberInput.focus();
    setTimeout(() => {
      symbolNumberInput.style.borderColor = '';
    }, 3000);
  }
  
  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    symbolNumberInput.focus();
  });
  
//   document.addEventListener('keydown', function() {
//     if (event.keyCode == 123) {
//       alert("This function has been disabled to prevent you from stealing my code!");
//       return false;
//     } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
//       alert("This function has been disabled to prevent you from stealing my code!");
//       return false;
//     } else if (event.ctrlKey && event.keyCode == 85) {
//       alert("This function has been disabled to prevent you from stealing my code!");
//       return false;
//     }
//   }, false);
  
//   if (document.addEventListener) {
//     document.addEventListener('contextmenu', function(e) {
//       alert("This function has been disabled to prevent you from stealing my code!");
//       e.preventDefault();
//     }, false);
//   } else {
//     document.attachEvent('oncontextmenu', function() {
//       alert("This function has been disabled to prevent you from stealing my code!");
//       window.event.returnValue = false;
//     });
//   }
