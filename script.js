// script.js - Código completo para a Calculadora de Status RPG

// Global variables for option 4
let currentStatus = {
    "Força": 0,
    "Destreza": 0,
    "Agilidade": 0,
    "Resistência": 0,
    "Inteligência": 0,
    "Carisma": 0
};
let availablePoints = 0;

// Navigation functions
function showMenu() {
    hideAllOptions();
    document.getElementById('menu').classList.remove('hidden');
}

function showOption(optionNumber) {
    hideAllOptions();
    document.getElementById(`option${optionNumber}`).classList.remove('hidden');
    
    // Clear previous results when showing an option
    document.getElementById(`result${optionNumber}`).classList.add('hidden');
}

function hideAllOptions() {
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        container.classList.add('hidden');
    });
}

// Validation function
function validateNumber(input) {
    if (input.value === "") {
        return true;
    }
    
    if (!/^\d+$/.test(input.value)) {
        input.value = input.value.slice(0, -1);
        return false;
    }
    
    return true;
}

function getValidNumber(value) {
    if (value === "" || value === null || value === undefined) {
        return 0;
    }
    
    const num = parseInt(value);
    return isNaN(num) ? null : Math.max(0, num);
}

// Option 1 functions
function calculateOption1() {
    const forca = getValidNumber(document.getElementById('forca1').value);
    const destreza = getValidNumber(document.getElementById('destreza1').value);
    const agilidade = getValidNumber(document.getElementById('agilidade1').value);
    const resistencia = getValidNumber(document.getElementById('resistencia1').value);
    const inteligencia = getValidNumber(document.getElementById('inteligencia1').value);
    const carisma = getValidNumber(document.getElementById('carisma1').value);
    
    if (forca === null || destreza === null || agilidade === null || 
        resistencia === null || inteligencia === null || carisma === null) {
        showResult(1, "Por favor, insira valores válidos.");
        return;
    }
    
    const nivel = forca + destreza + agilidade + resistencia + inteligencia + carisma;
    
    const A = (Math.floor(resistencia / 10)) * 0.3;
    const B = (Math.floor(nivel / 100)) * 0.5;
    const X = A + B;
    const hp = Math.floor(nivel * (X + 1));
    
    const gasto_forca = calculateArithmeticProgressionSum(0, forca);
    const gasto_destreza = calculateArithmeticProgressionSum(0, destreza);
    const gasto_agilidade = calculateArithmeticProgressionSum(0, agilidade);
    const gasto_resistencia = calculateArithmeticProgressionSum(0, resistencia);
    const gasto_inteligencia = calculateArithmeticProgressionSum(0, inteligencia);
    const gasto_carisma = calculateArithmeticProgressionSum(0, carisma);
    
    const gasto_total = gasto_forca + gasto_destreza + gasto_agilidade + 
                       gasto_resistencia + gasto_inteligencia + gasto_carisma;
    
    const statuses = {
        "Força": forca,
        "Destreza": destreza,
        "Agilidade": agilidade,
        "Resistência": resistencia,
        "Inteligência": inteligencia,
        "Carisma": carisma
    };
    
    const gastos_por_status = {
        "Força": gasto_forca,
        "Destreza": gasto_destreza,
        "Agilidade": gasto_agilidade,
        "Resistência": gasto_resistencia,
        "Inteligência": gasto_inteligencia,
        "Carisma": gasto_carisma
    };
    
    // Cálculo do Effort
    const effort_d12 = Math.floor(nivel / 60);
    const effort_d20 = Math.floor(nivel / 100);
    const effort_d50 = Math.floor(nivel / 250);
    
    const resultado_effort = `Effort: ${effort_d12}d12, ${effort_d20}d20, ${effort_d50}d50\n`;
    
    const tabela_status = showStatusAndModifierTable(statuses);
    const tabela_gastos = showSpendingPerStatusTable(gastos_por_status);
    
    const resultado = `Seu nível é: ${nivel}\n` +
                     `Seus pontos de vida total são: ${hp}\n\n` +
                     `Seu gasto de pontos em cada status foi:\n${tabela_gastos}\n` +
                     `Seu gasto total de pontos foi: ${gasto_total}\n\n` +
                     `${resultado_effort}\n` +
                     `${tabela_status}`;
    
    showResult(1, resultado);
}

// Option 2 functions
function calculateOption2() {
    const nivel = getValidNumber(document.getElementById('nivel2').value);
    const resistencia = getValidNumber(document.getElementById('resistencia2').value);
    
    if (nivel === null || resistencia === null || nivel < resistencia) {
        showResult(2, "Nível inválido ou entrada incorreta.");
        return;
    }
    
    const A = (Math.floor(resistencia / 10)) * 0.3;
    const B = (Math.floor(nivel / 100)) * 0.5;
    const X = A + B;
    const hp = Math.floor(nivel * (X + 1));
    
    showResult(2, `Seus pontos de vida total são: ${hp}`);
}

// Option 3 functions
function calculateOption3() {
    const a1 = getValidNumber(document.getElementById('a1').value);
    const an = getValidNumber(document.getElementById('an').value);
    
    if (a1 === null || an === null || an <= a1) {
        showResult(3, "Valores inválidos. O valor final deve ser maior que o inicial.");
        return;
    }
    
    const gasto = calculateArithmeticProgressionSum(a1, an);
    showResult(3, `O total de pontos necessários para aumentar de ${a1} até ${an} é: ${gasto} pontos`);
}

// Option 4 functions
function startDistribution() {
    const forca = getValidNumber(document.getElementById('forca4').value);
    const destreza = getValidNumber(document.getElementById('destreza4').value);
    const agilidade = getValidNumber(document.getElementById('agilidade4').value);
    const resistencia = getValidNumber(document.getElementById('resistencia4').value);
    const inteligencia = getValidNumber(document.getElementById('inteligencia4').value);
    const carisma = getValidNumber(document.getElementById('carisma4').value);
    const pontos = getValidNumber(document.getElementById('pontos4').value);
    
    if (forca === null || destreza === null || agilidade === null || 
        resistencia === null || inteligencia === null || carisma === null || 
        pontos === null) {
        alert("Por favor, insira valores válidos.");
        return;
    }
    
    currentStatus = {
        "Força": forca,
        "Destreza": destreza,
        "Agilidade": agilidade,
        "Resistência": resistencia,
        "Inteligência": inteligencia,
        "Carisma": carisma
    };
    
    availablePoints = pontos;
    
    // Show distribution interface
    document.getElementById('distribution-interface').classList.remove('hidden');
    
    // Update interface
    updateDistributionInterface();
}

function updateDistributionInterface() {
    const controlsContainer = document.getElementById('status-controls');
    controlsContainer.innerHTML = '';
    
    for (const [name, value] of Object.entries(currentStatus)) {
        const row = document.createElement('div');
        row.className = 'status-row';
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'status-name';
        nameSpan.textContent = name + ':';
        
        const downButton = document.createElement('button');
        downButton.textContent = '⬇️';
        downButton.onclick = () => changeStatus(name, -1);
        downButton.disabled = value <= 0;
        
        const valueSpan = document.createElement('span');
        valueSpan.className = 'status-value';
        valueSpan.textContent = value;
        valueSpan.id = `status-value-${name}`;
        
        const upButton = document.createElement('button');
        upButton.textContent = '⬆️';
        upButton.onclick = () => changeStatus(name, 1);
        
        row.appendChild(nameSpan);
        row.appendChild(downButton);
        row.appendChild(valueSpan);
        row.appendChild(upButton);
        
        controlsContainer.appendChild(row);
    }
    
    updateExtraInfo();
    document.getElementById('pontos-restantes').textContent = `Pontos Restantes: ${availablePoints}`;
}

function changeStatus(name, direction) {
    const currentValue = currentStatus[name];
    const nextValue = currentValue + direction;
    
    if (direction > 0) { // Increase
        const cost = calculateArithmeticProgressionSum(currentValue, nextValue);
        if (availablePoints >= cost) {
            availablePoints -= cost;
            currentStatus[name] = nextValue;
        }
    } else if (direction < 0 && currentValue > 0) { // Decrease
        const cost = calculateArithmeticProgressionSum(nextValue, currentValue);
        availablePoints += cost;
        currentStatus[name] = nextValue;
    }
    
    updateDistributionInterface();
}

function updateExtraInfo() {
    // Calculate level
    const nivel = Object.values(currentStatus).reduce((sum, value) => sum + value, 0);
    
    // Calculate HP
    const resistencia = currentStatus["Resistência"] || 0;
    const A = (Math.floor(resistencia / 10)) * 0.3;
    const B = (Math.floor(nivel / 100)) * 0.5;
    const X = A + B;
    const hp = Math.floor(nivel * (X + 1));
    
    // Calculate Effort
    const effort_d12 = Math.floor(nivel / 60);
    const effort_d20 = Math.floor(nivel / 100);
    const effort_d50 = Math.floor(nivel / 250);
    
    // Update display
    document.getElementById('nivel-info').textContent = `Nível: ${nivel}`;
    document.getElementById('hp-info').textContent = `HP: ${hp}`;
    document.getElementById('effort-info').textContent = `Effort: ${effort_d12}d12, ${effort_d20}d20, ${effort_d50}d50`;
}

// Helper functions
function calculateArithmeticProgressionSum(a1, an) {
    const n = (an - a1) + 1;
    const sn = (n * (a1 + an) / 2) - a1;
    return sn;
}

function showStatusAndModifierTable(statuses) {
    let table = '<table>';
    table += '<tr><th>Status</th><th>Dado</th><th>Mod</th><th>Mod/2</th><th>Save</th></tr>';
    
    for (const [name, value] of Object.entries(statuses)) {
        let dice, totalDice;
        
        if (value <= 4) {
            dice = "d4";
            totalDice = 4;
        } else if (value <= 6) {
            dice = "d6";
            totalDice = 6;
        } else if (value <= 8) {
            dice = "d8";
            totalDice = 8;
        } else if (value <= 10) {
            dice = "d10";
            totalDice = 10;
        } else if (value <= 12) {
            dice = "d12";
            totalDice = 12;
        } else if (value <= 50) {
            dice = "d20";
            totalDice = 20;
        } else if (value <= 100) {
            dice = "d50";
            totalDice = 50;
        } else {
            dice = "d100";
            totalDice = 100;
        }
        
        const modifier = Math.floor(value / 2);
        const dexterityModifier = name === "Destreza" ? Math.floor(value / 3) : null;
        const save = Math.floor((totalDice * 40 / 100) + modifier);
        const modDiv2 = Math.floor(modifier / 2);
        
        if (name === "Destreza") {
            table += `<tr><td>${name}</td><td>${dice}</td><td>${modifier}/${dexterityModifier}</td><td>${modDiv2}</td><td>${save}</td></tr>`;
        } else {
            table += `<tr><td>${name}</td><td>${dice}</td><td>${modifier}</td><td>${modDiv2}</td><td>${save}</td></tr>`;
        }
    }
    
    table += '</table>';
    return table;
}

function showSpendingPerStatusTable(spending) {
    let table = '<table>';
    table += '<tr><th>Status</th><th>Gasto</th></tr>';
    
    for (const [name, points] of Object.entries(spending)) {
        table += `<tr><td>${name}</td><td>${points}</td></tr>`;
    }
    
    table += '</table>';
    return table;
}

function showResult(optionNumber, result) {
    const resultElement = document.getElementById(`result${optionNumber}`);
    resultElement.innerHTML = result;
    resultElement.classList.remove('hidden');
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    showMenu();
});