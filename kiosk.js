const ffi = require('ffi-napi')
const ref = require('ref-napi')
const Struct = require('ref-struct-napi')
const ArrayType = require('ref-array-napi')
const Serial = require('serialport')

function TEXT(text){
    return Buffer.from(`${text}\0`, 'ucs2')
}

let dll = __dirname + '\\Toolplus\\BillDepositDevDll.dll'


var tDevReturn = Struct({
    'iLogicCode' : 'int',
    'iPhyCode' : 'int',
    'iHandle' : 'int',
    'iType' : 'int',
    'acDevReturn' : ArrayType(ref.types.char, 8),
    'acReserve' : ArrayType(ref.types.char, 8),
})

var p_psStatus = ref.refType(tDevReturn)

const ba08 = ffi.Library(dll, {
    'CIM_SetCommPara' : ['int', [p_psStatus]],
    'CIM_Init' : ['int', ['int', p_psStatus]],
    'CIM_PrepareDeposit' : ['int', [p_psStatus]]
})


var devReturn = new tDevReturn({
    iLogicCode : 0,
    iPhyCode : 0,
    iHandle : 0,
    iType: 1,
    acDevReturn: [0],
    acReserve: [0]
})


var port = Serial('COM1', {
    baudRate: 19200
})

ba08.CIM_SetCommPara(devReturn.ref())
ba08.CIM_Init(2, devReturn.ref())
ba08.CIM_PrepareDeposit(devReturn.ref())









