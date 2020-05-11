
Device ba08;

int result = 0;
DWORD dwTime = 0;
tDevReturn devReturn[8] = {0};


ba08.CIM_SetCommPara(devReturn);

if(SUCCESS != result){ return; }

ba08.CIM_Init(devReturn)

if(SUCCESS != result){ return; }

GRGTransinfo trans_info;

memset(&transinfo, 0 , sizeof(transinfo));

SYSTEMTIME time;
GetLocalTime(&time);

sprintf(transinfo.acJournalNo, "%04d%02d%02d_%02d%02d%02d%02d_%03d",
    time.wYear,
    time.wMonth,
    time.wDay,
    time.wHour,
    time.wSecond,
    time.wMilliseconds
);

trans_info.byTimes = 1;

ba08.CIM_SetTransInfo(trans_info, devReturn)

if(SUCCESS != result){ return; }

GRGNoteDetails noteDetails[100] = {0}
int uiCount = 100;
result = bao08.CIM_GetNvNotesInfo(noteDetails, uiCount, devReturn);


