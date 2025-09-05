const planData = [
  ["1.5-mile easy run", "Rest or light walk", "2-mile run/walk intervals", "Rest or cross-training", "2-mile easy run", "Optional walk or rest", "2.5-mile easy run"],
  ["2-mile steady run", "Rest or walk", "2.5-mile run/walk intervals", "Cross-training or rest", "3-mile easy run", "Rest", "3-mile long run"],
  ["2-mile run + strides", "Rest or walk", "3-mile run/walk intervals", "Cross-training", "3-mile steady run", "Rest", "3.5-mile long run"],
  ["3-mile run + strides", "Rest", "3.5-mile run/walk or tempo run", "Cross-training", "3-mile easy run", "Rest", "4-mile long run"]
];

const planContainer = document.getElementById('plan');

planData.forEach((week, i) => {
  const weekDiv = document.createElement('div');
  weekDiv.className = 'week';

  const weekHeader = document.createElement('h2');
  weekHeader.textContent = `Week ${i + 1}`;
  weekHeader.onclick = () => {
    daysDiv.style.display = daysDiv.style.display === 'none' ? 'block' : 'none';
  };

  const daysDiv = document.createElement('div');
  daysDiv.className = 'days';

  week.forEach((day, j) => {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day';
    dayDiv.textContent = `Day ${j + 1}: ${day}`;
    dayDiv.onclick = () => {
      dayDiv.classList.toggle('completed');
    };
    daysDiv.appendChild(dayDiv);
  });

  weekDiv.appendChild(weekHeader);
  weekDiv.appendChild(daysDiv);
  planContainer.appendChild(weekDiv);
});