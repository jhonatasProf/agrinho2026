document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Captura os elementos do HTML que serão atualizados
    const co2CardValue = document.querySelectorAll('.card .value')[1]; // Segundo card (CO2)
    const cbioCardValue = document.querySelectorAll('.card .value')[2]; // Terceiro card (CBIO)
    const profitCardValue = document.querySelector('.card.profit .value'); // Quarto card (Lucro)
    
    const form = document.getElementById('carbon-form');
    const inputAno = document.getElementById('input-ano');
    const inputCo2 = document.getElementById('input-co2');

    const ctx = document.getElementById('carbonChart').getContext('2d');
    
    // 2. Inicializa o Gráfico e guarda a instância na variável 'carbonChart'
    const carbonChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2022', '2023', '2024', '2025', '2026'], 
            datasets: [{
                label: 'Toneladas de CO₂ Retidas',
                data: [1200, 1550, 1900, 2100, 2450], 
                borderColor: '#4ade80', 
                backgroundColor: 'rgba(74, 222, 128, 0.1)', 
                borderWidth: 3,
                tension: 0.3, 
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#94a3b8' } }
            },
            scales: {
                y: {
                    grid: { color: '#2d3142' }, 
                    ticks: { color: '#94a3b8' }  
                },
                x: {
                    grid: { display: false },    
                    ticks: { color: '#94a3b8' }  
                }
            }
        }
    });

    // 3. Ouve o evento de envio do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita que a página recarregue

        // Pega os valores digitados pelo usuário
        const novoAno = inputAno.value;
        const novoCo2 = parseFloat(inputCo2.value);

        // --- ATUALIZAÇÃO DO GRÁFICO ---
        // Adiciona o novo ano na lista de Labels (Eixo X)
        carbonChart.data.labels.push(novoAno);
        // Adiciona o novo valor de CO2 no Dataset (Eixo Y)
        carbonChart.data.datasets[0].data.push(novoCo2);
        // Renderiza o gráfico novamente com os novos dados introduzidos
        carbonChart.update();

        // --- ATUALIZAÇÃO DOS CARDS ---
        // Atualiza o Card de CO2 Retido
        co2CardValue.innerHTML = `${novoCo2.toLocaleString('pt-BR')} <span class="unit">Ton</span>`;
        
        // Atualiza o Card de Créditos (1 Ton CO2 = 1 CBIO)
        cbioCardValue.innerHTML = `${novoCo2.toLocaleString('pt-BR')} <span class="unit">CBIO</span>`;
        
        // Calcula o novo lucro estimado (Ex: R$ 15,00 por CBIO)
        const novoLucro = novoCo2 * 15;
        profitCardValue.textContent = `R$ ${novoLucro.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}`;

        // Limpa os campos do formulário para a próxima inserção
        form.reset();
    });
});
