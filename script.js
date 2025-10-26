// Chart.js - Dados fictícios de estilo de vida
const ctx = document.getElementById('lifestyleChart').getContext('2d');
const lifestyleChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Exercício', 'Sono', 'Alimentação', 'Humor'],
    datasets: [{
      label: 'Pontuação (0-100)',
      data: [80, 70, 85, 60],
      backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#e91e63']
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  }
});

// CRUD com localStorage
function createHabit() {
  const habit = prompt("Digite o nome do novo hábito:");
  if (habit) {
    const habits = JSON.parse(localStorage.getItem("habits") || "[]");
    habits.push(habit);
    localStorage.setItem("habits", JSON.stringify(habits));
    alert("Hábito criado!");
  }
}

function readHabits() {
  const habits = JSON.parse(localStorage.getItem("habits") || "[]");
  document.getElementById("habitList").innerHTML = habits.map((h, i) => `<p>${i + 1}. ${h}</p>`).join("");
}

function updateHabit() {
  const index = parseInt(prompt("Digite o número do hábito a atualizar:")) - 1;
  const newHabit = prompt("Digite o novo nome:");
  const habits = JSON.parse(localStorage.getItem("habits") || "[]");
  if (habits[index]) {
    habits[index] = newHabit;
    localStorage.setItem("habits", JSON.stringify(habits));
    alert("Hábito atualizado!");
  } else {
    alert("Hábito não encontrado.");
  }
}

function deleteHabit() {
  const index = parseInt(prompt("Digite o número do hábito a deletar:")) - 1;
  const habits = JSON.parse(localStorage.getItem("habits") || "[]");
  if (habits[index]) {
    habits.splice(index, 1);
    localStorage.setItem("habits", JSON.stringify(habits));
    alert("Hábito deletado!");
  } else {
    alert("Hábito não encontrado.");
  }
}

// Clima com geolocalização
function getWeather() {
  const apiKey = "29eda1116fd3194397a41d20fe8d04ab"; // Substitua pela sua chave da OpenWeatherMap

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pt_br`;

      fetch(url)
        .then(res => res.json())
        .then(data => {
          const weatherHTML = `
            <p><strong>Local:</strong> ${data.name}</p>
            <p><strong>Temperatura:</strong> ${data.main.temp}°C</p>
            <p><strong>Clima:</strong> ${data.weather[0].description}</p>
            <p><strong>Umidade:</strong> ${data.main.humidity}%</p>
          `;
          document.getElementById("weatherResult").innerHTML = weatherHTML;
        });
    }, () => {
      document.getElementById("weatherResult").innerHTML = `<p>Não foi possível obter sua localização.</p>`;
    });
  } else {
    document.getElementById("weatherResult").innerHTML = `<p>Geolocalização não suportada.</p>`;
  }
}


function addProfile() {
  const name = document.getElementById("profileName").value;
  const country = document.getElementById("profileCountry").value;
  const email = document.getElementById("profileEmail").value;
  const image = document.getElementById("profileImage").value;

  if (name && country && email) {
    const profiles = JSON.parse(localStorage.getItem("profiles") || "[]");
    profiles.push({ name, country, email, image });
    localStorage.setItem("profiles", JSON.stringify(profiles));
    alert("Perfil adicionado!");
    showProfiles();
  } else {
    alert("Preencha todos os campos.");
  }
}

function showProfiles() {
  const profiles = JSON.parse(localStorage.getItem("profiles") || "[]");
  document.getElementById("profileList").innerHTML = profiles.map((p, i) => `
    <div class="profile-card">
      <img src="${p.image || 'https://via.placeholder.com/80'}" alt="Foto" />
      <div>
        <p><strong>${p.name}</strong></p>
        <p>${p.country}</p>
        <p>${p.email}</p>
        <button onclick="deleteProfile(${i})">Remover</button>
      </div>
    </div>
  `).join("");
}

function deleteProfile(index) {
  const profiles = JSON.parse(localStorage.getItem("profiles") || "[]");
  profiles.splice(index, 1);
  localStorage.setItem("profiles", JSON.stringify(profiles));
  showProfiles();
}

function exportProfiles() {
  const profiles = JSON.parse(localStorage.getItem("profiles") || "[]");
  let csv = "Nome,País,Email,Imagem\n";
  profiles.forEach(p => {
    csv += `"${p.name}","${p.country}","${p.email}","${p.image}"\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "perfis_lifestyle.csv";
  link.click();
}

// Mostrar perfis ao carregar
window.onload = showProfiles;

fetch("http://localhost:5000/api/lifestyle")
  .then(res => res.json())
  .then(data => {
    console.log("Dados do Kaggle:", data);
    // Use para alimentar gráficos ou cards
  });
