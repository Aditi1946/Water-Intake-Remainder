let reminderTimer;
  let glassesDrunk = 0;

  const intervalInput = document.getElementById('interval');
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const resetBtn = document.getElementById('resetBtn');
  const goalInput = document.getElementById('goal');
  const counter = document.getElementById('counter');
  const glass = document.getElementById('glass');
  const progressBar = document.getElementById('progressBar');

  function updateCounterAndProgress() {
    counter.textContent = `Glasses drunk: ${glassesDrunk} 💧`;
    // Change glass emoji based on progress
    if (glassesDrunk === 0) {
      glass.textContent = '🥛'; // empty glass
    } else if (glassesDrunk < 4) {
      glass.textContent = '🧊'; // ice cube - partial progress
    } else {
      glass.textContent = '💧'; // water drop - good progress
    }

    const goal = parseInt(goalInput.value) || 8;
    const percent = Math.min((glassesDrunk / goal) * 100, 100);
    progressBar.style.width = percent + '%';
  }

  function remindToDrink() {
    alert('Time to drink water! 💧');
    const drank = confirm('Did you drink a glass of water? Click OK to confirm.');
    if (drank) {
      glassesDrunk++;
      updateCounterAndProgress();
    }
  }

  startBtn.addEventListener('click', () => {
    const minutes = parseInt(intervalInput.value);
    if (isNaN(minutes) || minutes < 1) {
      alert('Please enter a valid number of minutes (1 or more).');
      return;
    }
    startBtn.disabled = true;
    stopBtn.disabled = false;
    intervalInput.disabled = true;

    remindToDrink(); // Immediate first reminder on start
    reminderTimer = setInterval(remindToDrink, minutes * 60 * 1000);
  });

  stopBtn.addEventListener('click', () => {
    clearInterval(reminderTimer);
    startBtn.disabled = false;
    stopBtn.disabled = true;
    intervalInput.disabled = false;
  });

  resetBtn.addEventListener('click', () => {
    glassesDrunk = 0;
    updateCounterAndProgress();
  });

  goalInput.addEventListener('change', () => {
    updateCounterAndProgress();
  });

  updateCounterAndProgress();
