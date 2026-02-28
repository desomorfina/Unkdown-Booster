# Unkdown Booster

Software de otimização de engenharia de performance para Windows. Projetado para reduzir latência, limpar arquivos temporários e priorizar recursos do sistema para jogos e tarefas pesadas.

## Funcionalidades

- **Injeção Global de Performance:** Ajustes de energia, rede e limpeza em um clique.
- **Limpeza Profunda:** Remoção de arquivos temporários e cache do sistema.
- **Força Máxima CPU:** Define o plano de energia para desempenho máximo.
- **Otimização de Rede:** Flush DNS e renovação de rotas TCP/IP.
- **Game Booster:** Prioridade de CPU em tempo real para executáveis de jogos.
- **Smart Gamer Mode:** Monitoramento automático de processos de jogos.

## Como Configurar

### Pré-requisitos

1. **Python 3.10+** instalado.
2. **Pip** instalado.

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/unkdown-booster.git
   cd unkdown-booster
   ```

2. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
   *(Nota: Certifique-se de instalar `eel`, `psutil`, etc.)*

### Execução

Para rodar o software em modo de desenvolvimento:
```bash
python main.py
```

### Compilação (Opcional)

Para gerar o executável (`.exe`):
```bash
pyinstaller ProBooster.spec
```

## Tecnologias

- **Python** (Backend)
- **Eel** (Interface Web)
- **HTML5/CSS3/JS** (Frontend)
- **Phosphor Icons**

## Aviso

Execute o programa como **Administrador** para que as alterações no registro e nos planos de energia tenham efeito.

---
Desenvolvido por **Santzx**.
