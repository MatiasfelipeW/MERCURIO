document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const tokenInput = document.getElementById('token-amount');
    const platformSelect = document.getElementById('platform');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultSection = document.getElementById('result-section');
    const approximateValue = document.getElementById('approximate-value');
    const commissionAmount = document.getElementById('commission-amount');
    const youReceive = document.getElementById('you-receive');
    const contactBtn = document.getElementById('contact-btn');
    const commissionRate = document.getElementById('commission-rate');

    // Tasas de conversión por plataforma (ejemplo)
    const conversionRates = {
        'chaturbate': 0.05,  // $0.05 por token
        'stripchat': 0.048,
        'bongacams': 0.049
    };

    // Comisiones por volumen
    const volumeCommissions = [
        { max: 2000, rate: 0.105 },
        { max: 5000, rate: 0.09 },
        { min: 5001, rate: 0.07 }
    ];

    // Calcular comisión basada en volumen
    function getCommissionRate(tokenAmount) {
        if (tokenAmount < 2000) return volumeCommissions[0].rate;
        if (tokenAmount <= 5000) return volumeCommissions[1].rate;
        return volumeCommissions[2].rate;
    }

    // Calcular valores
    function calculateConversion() {
        const tokens = parseInt(tokenInput.value) || 0;
        const platform = platformSelect.value;
        const rate = conversionRates[platform];
        
        if (tokens <= 0) {
            alert('Por favor ingresa una cantidad válida de tokens');
            return;
        }

        const commission = getCommissionRate(tokens);
        const grossValue = tokens * rate;
        const commissionTotal = grossValue * commission;
        const netValue = grossValue - commissionTotal;

        // Mostrar resultados
        approximateValue.textContent = `$${grossValue.toFixed(2)} USD`;
        commissionAmount.textContent = `$${commissionTotal.toFixed(2)} USD`;
        youReceive.textContent = `$${netValue.toFixed(2)} USD`;
        commissionRate.textContent = `${(commission * 100).toFixed(1)}%`;

        // Mostrar sección de resultados
        resultSection.style.display = 'block';

        // Scroll a resultados
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Event Listeners
    calculateBtn.addEventListener('click', calculateConversion);
    
    tokenInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateConversion();
        }
    });

    // WhatsApp Contact
    contactBtn.addEventListener('click', function() {
        const tokens = parseInt(tokenInput.value) || 0;
        const platform = platformSelect.options[platformSelect.selectedIndex].text;
        const message = `Hola, estoy interesado/a en convertir mis tokens. Plataforma: ${platform}, Cantidad: ${tokens} tokens.`;
        const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });

    // Animación para el formulario
    const formElements = document.querySelectorAll('.calculator-form input, .calculator-form select, .calculator-form button');
    formElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
});