const ffi = require('ffi-napi')
const ref = require('ref-napi')
const Struct = require('ref-struct-napi')
const ArrayType = require('ref-array-napi')
const Serial = require('serialport')

function TEXT(text){
    return Buffer.from(`${text}\0`, 'ucs2')
}




// map struct to JS
var tDevReturn = Struct({
    'iLogicCode' : 'int',
    'iPhyCode' : 'int',
    'iHandle' : 'int',
    'iType' : 'int',
    'acDevReturn' : ArrayType(ref.types.char, 128),
    'acReserve' : ArrayType(ref.types.char, 128),
})

var p_psStatus = ref.refType(tDevReturn)

// Define the library 
let dll = __dirname + '\\Toolplus\\BillDepositDevDll.dll'
const ba08 = ffi.Library(dll, {
    'CIM_SetCommPara' : ['int', p_psStatus],
    'CIM_Init' : ['int', ['int', p_psStatus]]
})


// open serial port
const port = new Serial('COM1', {
    baudRate : 19200
})

var devReturn = new tDevReturn({
    iLogicCode : 0,
    iPhyCode : 0,
    iHandle : 0,
    iType: 0,
    acDevReturn: 0,
    acReserve: 0
})

// call CIM_Init with param 2 and tDevReturn passed by reference
ba08.CIM_SetCommPara(tDevReturn.ref())
ba08.CIM_Init(2, tDevReturn.ref())








