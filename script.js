// Aguarda o HTML carregar completamente
document.addEventListener("DOMContentLoaded", function() {
    
    // Captura o elemento canvas do HTML
    const ctx = document.getElementById('carbonChart').getContext('2d');
    
    // Configuração do Gráfico de Linhas
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2022', '2023', '2024', '2025', '2026'], // Anos
            datasets: [{
                label: 'Toneladas de CO₂ Retidas',
                data: [1200, 1550, 1900, 2100, 2450], // Dados fictícios crescentes
                borderColor: '#4ade80', // Cor da linha (Verde neon)
                backgroundColor: 'rgba(74, 222, 128, 0.1)', // Cor de fundo abaixo da linha
                borderWidth: 3,
                tension: 0.3, // Deixa a linha mais curva e elegante
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#94a3b8' // Cor do texto da legenda
                    }
                }
            },
            scales: {
                y: {
                    grid: { color: '#2d3142' }, // Cor das linhas de grade do fundo
                    ticks: { color: '#94a3b8' }  // Cor dos números do eixo Y
                },
                x: {
                    grid: { display: false },    // Esconde a grade vertical
                    ticks: { color: '#94a3b8' }  // Cor dos números do eixo X
                }
            }
        }
    });
});
