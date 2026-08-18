#!/bin/bash
set -euo pipefail

echo "=== Starting hashcat WPA2 crack workflow ==="

# 进入脚本所在目录（pak/）
cd "$(dirname "$0")"


# 安装依赖
echo "[*] Installing hashcat..."
sudo apt-get update -qq
sudo apt-get install -y -qq hashcat hcxtools 2>/dev/null || {
    echo "[!] apt 源里没有 hashcat，从 GitHub Release 下载..."
    wget -q https://github.com/hashcat/hashcat/releases/download/v7.1.2/hashcat-7.1.2-linux-x64.tar.gz
    tar xzf hashcat-7.1.2-linux-x64.tar.gz
    HASHCAT="./hashcat-7.1.2/hashcat"
}

# 确定 hashcat 路径
HASHCAT="${HASHCAT:-$(which hashcat)}"
echo "[*] Using hashcat at: $HASHCAT"

# 打印设备信息
echo "[*] Available devices:"
$HASHCAT -I 2>&1 | head -20 || true

# 执行掩码攻击（文件都在当前 pak/ 目录下）
echo "[*] Running mask attack on handshake.hc22000..."
$HASHCAT -m 22000 -a 3 --status --status-timer=5 \
    -O --potfile-path=cracked.potfile \
    aa.hc22000 qy.hcmask \
    2>&1 | tee hashcat_output.log

# 检查结果
echo ""
echo "=== Results ==="
if [ -f cracked.potfile ] && [ -s cracked.potfile ]; then
    echo "[+] CRACKED! Passwords found:"
    cat cracked.potfile
else
    echo "[-] No passwords cracked in this run."
fi

echo "=== Workflow complete ==="