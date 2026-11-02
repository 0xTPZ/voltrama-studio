param([string]$Path = "$env:LOCALAPPDATA\VoltramaStudio\owner-credential.dpapi")
Set-StrictMode -Version Latest
if(-not (Test-Path -LiteralPath $Path)){ throw 'Credencial DPAPI não encontrada.' }
$secure = Get-Content -LiteralPath $Path -Raw | ConvertTo-SecureString
$credential = [pscredential]::new('0xTPZ',$secure)
$credential.GetNetworkCredential().Password | Set-Clipboard
Write-Output 'Credencial copiada para a área de transferência local. Não a cole em chats, logs ou arquivos.'
