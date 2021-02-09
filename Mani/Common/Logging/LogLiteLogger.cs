using Log_Lite.Enum;
using Log_Lite.FileArchive.Archiver;
using Log_Lite.FileArchive.Checker;
using Log_Lite.Logger;
using Log_Lite.LogWriter;
using Log_Lite.Model.File;

namespace Common.Logging
{
    public class LogLiteLogger : Application.Common.Logging.ILogger
    {
        private ILogger Logger { get; }

        public LogLiteLogger()
        {
            Logger = InitializeLogger();
        }

        public void Info(object message)
        {
            Logger.Info(message);
        }

        public void Warning(object message)
        {
            Logger.Warning(message);
        }

        public void Error(object message)
        {
            Logger.Error(message);
        }

        public void Fatal(object message)
        {
            Logger.Fatal(message);
        }

        private ILogger InitializeLogger()
        {
            var fileInfo = new SystemFileInfo("logs/logs.txt");
            var checker = new SizeArchiveNecessityChecker(fileInfo, 100, MemoryUnit.KB);
            var archiver = new FileArchiver(fileInfo, "Archive", checker);
            var fileWriter = FileLogWriter.Builder()
                .SetFileInfo(fileInfo)
                .SetFileArchiver(archiver)
                .Build();

            var errorsFileInfo = new SystemFileInfo("logs/errors.txt");
            var errorsChecker = new SizeArchiveNecessityChecker(errorsFileInfo, 100, MemoryUnit.KB);
            var errorsArchiver = new FileArchiver(errorsFileInfo, "Archive_Errors", errorsChecker);
            var errorsLogLevels = new LogLevel[] { LogLevel.ERROR, LogLevel.FATAL };
            var errorsFileWriter = FileLogWriter.Builder()
                .SetFileInfo(errorsFileInfo)
                .SetFileArchiver(errorsArchiver)
                .SetAllowedLogLevels(errorsLogLevels)
                .Build();

            var warningsFileInfo = new SystemFileInfo("logs/warnings.txt");
            var warningsChecker = new SizeArchiveNecessityChecker(warningsFileInfo, 100, MemoryUnit.KB);
            var warningsArchiver = new FileArchiver(warningsFileInfo, "Archive_Warnings", warningsChecker);
            var warningsLogLevels = new LogLevel[] { LogLevel.WARNING };
            var warningsFileWriter = FileLogWriter.Builder()
                .SetFileInfo(warningsFileInfo)
                .SetFileArchiver(warningsArchiver)
                .SetAllowedLogLevels(warningsLogLevels)
                .Build();

            return new Logger(fileWriter, warningsFileWriter, errorsFileWriter);
        }
    }
}
