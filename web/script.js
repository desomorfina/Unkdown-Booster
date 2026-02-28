function logTerminal(msg, success = false) {
    const logText = document.getElementById('log-text');
    const termIcon = document.getElementById('terminal-icon');
    const progFill = document.getElementById('progress-indicator');
    
    if (!logText || !termIcon || !progFill) return;

    logText.innerText = msg;
    
    if(!success) {
        logText.style.color = "var(--text-main)";
        termIcon.className = "ph-bold ph-spinner-gap spin";
        termIcon.style.color = "var(--text-main)";
        progFill.classList.add('running');
    } else {
        logText.style.color = "var(--success)";
        termIcon.className = "ph-bold ph-check-circle";
        termIcon.style.color = "var(--success)";
        progFill.classList.remove('running');
        
        setTimeout(() => {
            logText.innerText = "Console aguardando comandos do usuário...";
            logText.style.color = "var(--text-muted)";
            termIcon.className = "ph-bold ph-terminal";
            termIcon.style.color = "var(--accent)";
        }, 3500);
    }
}

async function initConfigs() {
    try {
        if (window.eel) {
            let confs = await eel.get_initial_configs()();
            document.getElementById('switch-startup').checked = confs.startup;
            document.getElementById('switch-gamer').checked = confs.gamer;
            logTerminal("Sistema Iniciado. Configurações Sincronizadas.", true);
        }
    } catch (e) {
        console.error("Erro ao sincronizar configs:", e);
    }
}

function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view');
    const pageTitle = document.getElementById('page-title');

    navItems.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            if (!target) return;

            navItems.forEach(b => b.classList.remove('active'));
            views.forEach(v => v.classList.remove('active'));
            
            btn.classList.add('active');
            const targetView = document.getElementById(target);
            if (targetView) {
                targetView.classList.add('active');
            }
            
            if (pageTitle) {
                if(target === 'dashboard') pageTitle.innerText = "Visão Geral";
                if(target === 'settings') pageTitle.innerText = "Ajustes Finos";
                if(target === 'about') pageTitle.innerText = "Sobre o Sistema";
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();

    setTimeout(() => {
        const loader = document.getElementById('startup-loader');
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 600);
        }
        
        initConfigs();
    }, 2000);
});

async function runTask(taskName, cardEl) {
    if(taskName === 'jogo') {
        openModal();
        return;
    }
    
    if (cardEl) cardEl.classList.add('loading');
    logTerminal(`Executando [${taskName.toUpperCase()}] na arquitetura do sistema...`);
    
    try {
        await eel.execute_task(taskName)();
    } catch (e) {
        console.error(e);
    }
    
    if (cardEl) cardEl.classList.remove('loading');
    logTerminal(`Módulo de [${taskName.toUpperCase()}] processado com perfeição.`, true);
}

async function runFullBoost() {
    const btn = document.getElementById('btn-full');
    const text = btn ? btn.querySelector('.btn-text') : null;
    
    if (btn) btn.classList.add('loading');
    if (text) text.innerText = "PROCESSANDO...";
    logTerminal("Iniciando rotina pesada de Ultra Tuning...");
    
    try {
        await eel.execute_full_boost()();
    } catch (e) {
        console.error(e);
    }
    
    if (btn) btn.classList.remove('loading');
    if (text) text.innerText = "INICIAR OTIMIZAÇÃO TOTAL";
    logTerminal("Tuning Global Concluído. Performance Máxima!", true);
}

function openModal() {
    const overlay = document.getElementById('dialog-overlay');
    if (overlay) overlay.classList.add('active');
    setTimeout(() => {
        const input = document.getElementById('game-input');
        if (input) input.focus();
    }, 100);
}

async function closeDialog(confirm) {
    const overlay = document.getElementById('dialog-overlay');
    if (overlay) overlay.classList.remove('active');
    
    if(confirm) {
        const input = document.getElementById('game-input');
        let exe = input ? input.value.trim() : "";
        if(!exe) exe = "cs2.exe";
        if(!exe.toLowerCase().endsWith('.exe')) exe += ".exe";
        
        logTerminal(`Injetando nível Real-Time em ${exe}...`);
        try {
            await eel.execute_task_game(exe)();
        } catch (e) {
            console.error(e);
        }
        logTerminal(`Prioridade Extrema vinculada ao processo: ${exe}`, true);
    } else {
        logTerminal("Ação Cancelada pelo Usuário.", true);
    }
}

async function toggleStartup() {
    const checkbox = document.getElementById('switch-startup');
    const st = checkbox ? checkbox.checked : false;
    try {
        await eel.toggle_startup(st)();
    } catch (e) {
        console.error(e);
    }
    logTerminal(`Auto-Start ${st ? 'Ativado' : 'Removido'} do Windows Registries.`, true);
}

async function toggleGamer() {
    const checkbox = document.getElementById('switch-gamer');
    const gm = checkbox ? checkbox.checked : false;
    try {
        await eel.toggle_gamer(gm)();
    } catch (e) {
        console.error(e);
    }
    logTerminal(`Smart Gamer Mode background loop = ${gm}.`, true);
}
