# 🗂 Definir ruta para el log
$logPath = "deploy-log.txt"
"" | Out-File -FilePath $logPath  # Reiniciar log

# Limpieza previa
Write-Host "Limpiando archivos anteriores..." | Tee-Object -FilePath $logPath -Append
Remove-Item -Recurse -Force dist, .astro, .vercel\output -ErrorAction SilentlyContinue

# Instalación
Write-Host "Instalando dependencias..." | Tee-Object -FilePath $logPath -Append
npm install | Tee-Object -FilePath $logPath -Append

# Build
Write-Host "Ejecutando build..." | Tee-Object -FilePath $logPath -Append
npm run build | Tee-Object -FilePath $logPath -Append

# Eliminar CSS viejos
Write-Host "Eliminando archivos antiguos como-funciona.*.css..." | Tee-Object -FilePath $logPath -Append
$oldCssPatterns = @(
  "dist\client\_astro\como-funciona.*.css",
  "dist\_astro\como-funciona.*.css",
  "public\_astro\como-funciona.*.css"
)
foreach ($pattern in $oldCssPatterns) {
  Get-ChildItem -Path $pattern -ErrorAction SilentlyContinue | ForEach-Object {
    Write-Host "Eliminando archivo: $($_.FullName)" | Tee-Object -FilePath $logPath -Append
    Remove-Item $_.FullName -Force
  }
}

# Copiar nuevo CSS
Write-Host "Copiando nuevo CSS sin hash a public/_astro/..." | Tee-Object -FilePath $logPath -Append
New-Item -ItemType Directory -Path public\_astro -Force | Out-Null
$newCss = Get-ChildItem -Path dist\client\_astro\como-funciona.*.css | Select-Object -First 1
if ($newCss) {
    Copy-Item $newCss.FullName public\_astro\como-funciona.css -Force
    Write-Host "CSS actualizado: $($newCss.Name) → como-funciona.css" | Tee-Object -FilePath $logPath -Append
} else {
    Write-Host "No se encontró como-funciona.*.css después del build." | Tee-Object -FilePath $logPath -Append
    exit 1
}

# Limpiar basura en /public/
Write-Host "Limpiando archivos huérfanos en /public/..." | Tee-Object -FilePath $logPath -Append
$publicPatterns = @(
  "public\*.old.*",
  "public\*.backup.*",
  "public\*.bak",
  "public\*.tmp",
  "public\*.map",
  "public\*.log"
)
foreach ($pattern in $publicPatterns) {
  Get-ChildItem -Path $pattern -ErrorAction SilentlyContinue | ForEach-Object {
    Write-Host "Eliminando archivo: $($_.FullName)" | Tee-Object -FilePath $logPath -Append
    Remove-Item $_.FullName -Force
  }
}

# Deploy
Write-Host "Desplegando con Vercel..." | Tee-Object -FilePath $logPath -Append
vercel --prod --force | Tee-Object -FilePath $logPath -Append

# Final
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
Write-Host ""
Write-Host "Deploy completado en $timestamp" | Tee-Object -FilePath $logPath -Append
Write-Host "Log guardado en: $logPath"




