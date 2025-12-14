# PowerShell script to kill process on port 3000
Write-Host "=== Finding process on port 3000 ===" -ForegroundColor Cyan

$port = 3000
$processes = netstat -ano | findstr ":$port"

if ($processes) {
    Write-Host "`nProcesses using port $port:" -ForegroundColor Yellow
    $processes | ForEach-Object { Write-Host $_ }
    
    $pids = $processes | ForEach-Object {
        if ($_ -match '\s+(\d+)$') {
            $matches[1]
        }
    } | Select-Object -Unique
    
    if ($pids) {
        Write-Host "`nKilling processes: $($pids -join ', ')" -ForegroundColor Red
        foreach ($pid in $pids) {
            if ($pid -ne "0") {
                try {
                    Stop-Process -Id $pid -Force -ErrorAction Stop
                    Write-Host "✅ Killed process $pid" -ForegroundColor Green
                } catch {
                    Write-Host "❌ Could not kill process $pid : $_" -ForegroundColor Red
                }
            }
        }
        Write-Host "`n✅ Done! You can now start the server." -ForegroundColor Green
    }
} else {
    Write-Host "✅ No process found on port $port" -ForegroundColor Green
}

