import os
import sys
import ctypes
import subprocess
import threading
import time
import winreg as reg
import psutil
import webbrowser
import eel

def is_admin():
    try: return ctypes.windll.shell32.IsUserAnAdmin()
    except: return False

if not is_admin():
    ctypes.windll.shell32.ShellExecuteW(None, "runas", sys.executable, " ".join(sys.argv), None, 1)
    sys.exit()

if getattr(sys, 'frozen', False):
    base_dir = sys._MEIPASS
    app_path = sys.executable
else:
    base_dir = os.path.dirname(os.path.abspath(__file__))
    app_path = os.path.abspath(__file__)

eel.init(os.path.join(base_dir, 'web'))

state = {
    "auto_gamer_enabled": False,
    "startup_set": False
}

def check_initial_configs():
    try:
        key = reg.OpenKey(reg.HKEY_CURRENT_USER, r"Software\Microsoft\Windows\CurrentVersion\Run", 0, reg.KEY_READ)
        reg.QueryValueEx(key, "UnkdownBooster")
        reg.CloseKey(key)
        state["startup_set"] = True
    except:
        state["startup_set"] = False


@eel.expose
def get_initial_configs():
    check_initial_configs()
    return {
        "startup": state["startup_set"],
        "gamer": state["auto_gamer_enabled"]
    }

@eel.expose
def execute_task(task_name):
    if task_name == "limpar":
        _limpar_job()
    elif task_name == "energia":
        _energia_job()
    elif task_name == "winget":
        _winget_job()
    elif task_name == "rede":
        _rede_job()
    elif task_name == "ram":
        _ram_job()
    return True

@eel.expose
def execute_task_game(exe):
    _jogo_job(exe)
    return True

@eel.expose
def execute_full_boost():
    _global_job()
    return True

@eel.expose
def toggle_startup(enabled):
    state["startup_set"] = enabled
    try:
        key = reg.OpenKey(reg.HKEY_CURRENT_USER, r"Software\Microsoft\Windows\CurrentVersion\Run", 0, reg.KEY_ALL_ACCESS)
        if enabled: reg.SetValueEx(key, "UnkdownBooster", 0, reg.REG_SZ, f'"{app_path}"')
        else:
            try: reg.DeleteValue(key, "UnkdownBooster")
            except: pass
        reg.CloseKey(key)
    except: pass
    return True

@eel.expose
def toggle_gamer(enabled):
    state["auto_gamer_enabled"] = enabled
    if enabled: threading.Thread(target=_gamer_loop, daemon=True).start()
    return True


def _limpar_job():
    dirs = [os.environ.get('TEMP'), r'C:\Windows\Temp', r'C:\Windows\Prefetch']
    try:
        for d in dirs:
            if d and os.path.exists(d): subprocess.run(f'del /q /f /s "{d}\\*"', shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except: pass

def _energia_job():
    try: subprocess.run('powercfg -setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c', shell=True, stdout=subprocess.DEVNULL)
    except: pass

def _winget_job():
    try: subprocess.run('winget upgrade --all --include-unknown --accept-package-agreements --accept-source-agreements', shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except: pass

def _rede_job():
    try:
        subprocess.run('ipconfig /flushdns', shell=True, stdout=subprocess.DEVNULL)
        subprocess.run('ipconfig /release', shell=True, stdout=subprocess.DEVNULL)
        subprocess.run('ipconfig /renew', shell=True, stdout=subprocess.DEVNULL)
    except: pass

def _ram_job():
    pass

def _jogo_job(exe):
    try: subprocess.run(f'wmic process where name="{exe}" CALL setpriority "high level"', shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except: pass

def _global_job():
    _energia_job()
    _limpar_job()
    _rede_job()

def _gamer_loop():
    games = ["valorant.exe", "cs2.exe", "leagueoflegends.exe", "fortniteclient-win64-shipping.exe", "robloxplayerbeta.exe", "gta5.exe"]
    boosted = set()
    while state["auto_gamer_enabled"]:
        try:
            for proc in psutil.process_iter(['name']):
                name = proc.info['name']
                if name and name.lower() in games and name.lower() not in boosted:
                    subprocess.run(f'wmic process where name="{name}" CALL setpriority "high level"', shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                    boosted.add(name.lower())
        except: pass
        time.sleep(5)

if __name__ == "__main__":
    check_initial_configs()
    try:
        eel.start('index.html', size=(1050, 700))
    except (SystemExit, MemoryError, KeyboardInterrupt):
        pass
