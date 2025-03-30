// astrology.js

async function fetchAstrologyData() {
  // Get today's date in MM/DD/YYYY format
  const today = new Date();
  const todayDate = today.toLocaleDateString();

  // Numerology calculation (simple method to add digits of today’s date)
  const dateDigits = todayDate.replace(/[^\d]/g, '');  // Remove non-digits from date
  let numerology = dateDigits.split('').reduce((acc, digit) => acc + parseInt(digit), 0);

  // Reduce the numerology number to a single digit (except master numbers 11, 22, 33)
  if (numerology > 9 && ![11, 22, 33].includes(numerology)) {
    numerology = numerology.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  }

  // Fetch Moon sign and phase data from an astrology API
  const apiUrl = 'https://aztro.sameerkumar.website?sign=aries&day=today'; // Example API for Aries; Change this to a dynamic sign fetch
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();

  // Extract Sun sign, Moon sign, and Moon phase from the API response
  const sunSign = data.sun_sign;
  const moonSign = data.moon_sign;
  const moonPhase = data.moon_phase;

  // Numerology Advice (simple advice based on the numerology number)
  const numerologyAdvice = {
    1: "Focus on self-discovery and leadership today.",
    2: "Seek harmony in relationships and find balance.",
    3: "Creative energy is high—let your ideas flow.",
    4: "A good day for working hard and building a foundation.",
    5: "Embrace change and be open to new experiences.",
    6: "Focus on love, family, and caring for others.",
    7: "A spiritual day—take time for introspection.",
    8: "A day for ambition—push forward with your goals.",
    9: "Endings and completions—wrap things up with grace.",
    11: "Master your thoughts and lead with your intuition.",
    22: "A day for big achievements—trust in your vision.",
    33: "Universal love and healing—your energy is contagious."
  };

  // Set the advice based on the numerology number for today
  const numerologyText = numerologyAdvice[numerology] || "A day to stay grounded and focused.";

  // Determine if today is a Full Moon or New Moon
  const isFullMoon = moonPhase === 'Full Moon';
  const isNewMoon = moonPhase === 'New Moon';

  // Create the text for the banner
  const astrologyText = `
    <span style="font-weight: bold; color: #ffac3e;">TODAY IS ${todayDate}</span>
    <span style="font-weight: bold; color: #03d865;"> | Sun in ${sunSign} </span>
    <span style="font-weight: bold; color: #ff5656;"> | ${isFullMoon ? '*FULL MOON*' : isNewMoon ? '*NEW MOON*' : moonPhase} in ${moonSign} </span>
    <span style="font-weight: bold; color: #261059;"> | Numerology: ${numerology}</span>
    <span style="color: #ffffff; font-style: italic;"> | ${numerologyText}</span>
  `;

  // Update the banner with the new astrology data
  document.getElementById('astrology-banner').innerHTML = astrologyText;
}

// Call the function to fetch the data and update the banner
fetchAstrologyData();
