@echo off
setlocal
set JAVA_HOME=C:\Users\LENOVO\.jdks\openjdk-26.0.2.1
set CURRENT_DIR=%~dp0
cd /d "%CURRENT_DIR%"
"%JAVA_HOME%\bin\java.exe" -classpath "maven\apache-maven-3.9.6\boot\plexus-classworlds-2.7.0.jar" "-Dclassworlds.conf=maven\apache-maven-3.9.6\bin\m2.conf" "-Dmaven.home=maven\apache-maven-3.9.6" "-Dmaven.multiModuleProjectDirectory=." org.codehaus.plexus.classworlds.launcher.Launcher %*
endlocal
