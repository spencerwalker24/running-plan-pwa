const planData = [
  ["1.5-mile easy run", "Rest or light walk", "2-mile run/walk intervals", "Rest or cross-training", "2-mile easy run", "Optional walk or rest", "2.5-mile easy run"],
  ["2-mile steady run", "Rest or walk", "2.5-mile run/walk intervals", "Cross-training or rest", "3-mile easy run", "Rest", "3-mile long run"],
  ["2-mile run + strides", "Rest or walk", "3-mile run/walk intervals", "Cross-training", "3-mile steady run", "Rest", "3.5-mile long run"],
  ["3-mile run + strides", "Rest", "3.5-mile run/walk or tempo run", "Cross-training", "3-mile easy run", "Rest", "4-mile long run"]
];

function createPlan() {
  const planContainer = document.getElementById("plan");
  planContainer.innerHTML = "";
  let completedCount = 0;
  let totalCount = 0;

  planData.forEach((week, weekIndex) => {
    const weekDiv = document.createElement("div");
    weekDiv.className = "week";

    const header = document.createElement("div");
    header.className = "week-header";
    header.textContent = `Week ${weekIndex + 1}`;
    header.onclick = () => {
      daysDiv.style.display = daysDiv.style.display === "none" ? "block" : "none";
    };

    const daysDiv = document.createElement("div");
    daysDiv.className = "days";

    week.forEach((day, dayIndex) => {
      totalCount++;
      const dayDiv = document.createElement("div");
      dayDiv.className = "day";
      dayDiv.textContent = `Day ${dayIndex + 1}: ${day}`;
      const key = `week${weekIndex}-day${dayIndex}`;
      if (localStorage.getItem(key) === "completed") {
        dayDiv.classList.add("completed");
        completedCount++;
      }
      dayDiv.onclick = () => {
        if (dayDiv.classList.contains("completed")) {
          dayDiv.classList.remove("completed");
          localStorage.removeItem(key);
        } else {
          dayDiv.classList.add("completed");
          localStorage.setItem(key, "completed");
        }
        updateProgress();
      };
      daysDiv.appendChild(dayDiv);
    });

    weekDiv.appendChild(header);
    weekDiv.appendChild(daysDiv);
    planContainer.appendChild(weekDiv);
  });

  updateProgress();
}

function updateProgress() {
  const total = planData.reduce((sum, week) => sum + week.length, 0);
  let completed = 0;
  planData.forEach((week, weekIndex) => {
    week.forEach((_, dayIndex) => {
      const key = `week${weekIndex}-day${dayIndex}`;
      if (localStorage.getItem(key) === "completed") {
        completed++;
      }
    });
  });
  const percent = Math.round((completed / total) * 100);
  document.getElementById("progress-bar").style.width = percent + "%";
  document.getElementById("progress-text").textContent = percent + "% Complete";
}

document.getElementById("reset-button").onclick = () => {
  planData.forEach((week, weekIndex) => {
    week.forEach((_, dayIndex) => {
      const key = `week${weekIndex}-day${dayIndex}`;
      localStorage.removeItem(key);
    });
  });
  createPlan();
};

createPlan();
