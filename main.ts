const {
  app,
  BrowserWindow,
  screen: electronScreen,
  ipcMain,
} = require('electron');
const { PosPrinter } = require('electron-pos-printer');

const createMainWindow = () => {
  let mainWindow = new BrowserWindow({
    width: electronScreen.getPrimaryDisplay().workArea.width,
    height: electronScreen.getPrimaryDisplay().workArea.height,
    show: false,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });

  const startURL = 'http://localhost:3000';

  mainWindow.loadURL(startURL);

  mainWindow.once('ready-to-show', () => mainWindow.show());

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (!BrowserWindow.getAllWindows().length) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

//PRINT INVOICE
ipcMain.handle('print-invoice', async (event, arg) => {
  const companyInfo = arg.companyInfo;
  const invoiceNumber = arg.invoiceNumber;
  const invoiceDate = arg.invoiceDate;
  const invoiceHour = arg.invoiceHour;
  const newOrderInfo = arg.newOrderInfo;
  const newOrderAmounts = arg.newOrderAmountList;
  const lettersAmount = arg.lettersAmount;
  const newOrderDetail = arg.newOrderProductDetail;

  const printerOptions = {
    preview: false, // preview in window or print
    width: '270px', //  width of content body
    margin: '0 0 0 0', // margin of content body
    copies: 1, // Number of copies to print
    printerName: 'ZKP8008 (1)', // printerName: string
    timeOutPerLine: 5000,
    silent: true,
  };

  const data = [
    {
      type: 'text',
      value: companyInfo.name,
      style: `text-align:center;`,
      css: { 'font-weight': '700', 'font-size': '20px' },
    },
    {
      type: 'text',
      value: companyInfo.address,
      style: `text-align:center;`,
      css: { 'font-size': '14px' },
    },
    {
      type: 'text',
      value: `Correo: ${companyInfo.email}`,
      style: `text-align:center;`,
      css: { 'font-size': '14px' },
    },
    {
      type: 'text',
      value: `RTN: ${companyInfo.rtn}`,
      style: `text-align:center;`,
      css: { 'font-size': '14px' },
    },
    {
      type: 'text',
      value: `TEL: ${companyInfo.phoneNumber}`,
      style: `text-align:center;`,
      css: { 'font-size': '14px' },
    },
    {
      type: 'text',
      value: `C.A.I.: ${newOrderInfo?.cai}`,
      style: `text-align:left;`,
      css: { 'font-size': '12PX', 'padding-top': '10px' },
    },
    {
      type: 'text',
      value: `FECHA: ${invoiceDate}      HORA: ${invoiceHour}`,
      style: `text-align:left;`,
      css: { 'font-size': '12PX' },
    },
    {
      type: 'text',
      value: `FACTRUA: ${invoiceNumber}`,
      style: `text-align:left;`,
      css: { 'font-size': '12PX' },
    },
    {
      type: 'text',
      value: `CLIENTE: ${newOrderInfo?.customerName}`,
      style: `text-align:left;`,
      css: { 'font-size': '12PX' },
    },
    {
      type: 'text',
      value: `RTN: ${newOrderInfo?.rtn}`,
      style: `text-align:left;`,
      css: { 'font-size': '12PX' },
    },
    {
      type: 'text',
      value: `NO. O/CO EXENTA:`,
      style: `text-align:left;`,
      css: { 'font-size': '1412PXpx' },
    },
    {
      type: 'text',
      value: `NO. REG. EXONERADO:`,
      style: `text-align:left;`,
      css: { 'font-size': '12PX' },
    },
    {
      type: 'text',
      value: `NO. REG. SAG:`,
      style: `text-align:left;`,
      css: { 'font-size': '12PX' },
    },
    {
      type: 'table',
      style: 'border: 1px solid #ddd',
      tableHeader: ['UDS', 'DESCRIPCION', 'PRECIO'],
      tableBody: newOrderDetail.map((prod) => {
        return [prod.quantity, prod.productName, prod.total];
      }),
      tableBodyStyle: 'border: 0.5px solid #ddd',
    },
    {
      type: 'text',
      value: `Subtotal: ${newOrderAmounts.subtotal}`,
      style: `text-align:right;`,
      css: { 'font-size': '12PX' },
    },
    {
      type: 'text',
      value: `Importe Exento: ${newOrderAmounts.totalExempt}`,
      style: `text-align:right;`,
      css: { 'font-size': '12PX' },
    },
    {
      type: 'text',
      value: `Importe Exonerado: ${newOrderAmounts.totalExonerated}`,
      style: `text-align:right;`,
      css: { 'font-size': '12PX' },
    },
    {
      type: 'text',
      value: `Importe Gravado 15%: ${newOrderAmounts.taxableAmount15}`,
      style: `text-align:right;`,
      css: { 'font-size': '12PX' },
    },
    {
      type: 'text',
      value: `Importe Gravado 18%: ${newOrderAmounts.taxableAmount18}`,
      style: `text-align:right;`,
      css: { 'font-size': '12PX' },
    },
    {
      type: 'text',
      value: `Impuestos del 15%: ${newOrderAmounts.totalTax15}`,
      style: `text-align:right;`,
      css: { 'font-size': '12PX' },
    },
    {
      type: 'text',
      value: `Impuestos del 18%: ${newOrderAmounts.totalTax18}`,
      style: `text-align:right;`,
      css: { 'font-size': '12PX' },
    },
    {
      type: 'text',
      value: `Total Impuestos: ${newOrderAmounts.totalTax}`,
      style: `text-align:right;`,
      css: { 'font-size': '12PX' },
    },
    {
      type: 'text',
      value: `TOTAL A PAGAR: ${newOrderAmounts.total}`,
      style: `text-align:right;`,
      css: { 'font-size': '12PX' },
    },
    {
      type: 'text',
      value: `SON: (${lettersAmount})`,
      style: `text-align:center;`,
      css: { 'font-size': '12PX', 'padding-top': '10px' },
    },
    {
      type: 'text',
      value: `*** GRACIAS POR SU VISITA ***`,
      style: `text-align:center;`,
      css: { 'font-size': '12PX', 'padding-top': '10px' },
    },
    {
      type: 'text',
      value: `RANGO AUTORIZADO:`,
      style: `text-align:center;`,
      css: { 'font-size': '12PX', 'padding-top': '10px' },
    },
    {
      type: 'text',
      value: `FECHA LIMITE EMISION: ${newOrderInfo?.limitDate}`,
      style: `text-align:center;`,
      css: { 'font-size': '12PX' },
    },
    {
      type: 'text',
      value: `Exento=E   Gravado=G   Original: Cliente`,
      style: `text-align:center;`,
      css: { 'font-size': '12PX' },
    },
    {
      type: 'text',
      value: `Copia: Obligado Tributario Emisor`,
      style: `text-align:center;`,
      css: { 'font-size': '12PX' },
    },
  ];

  return PosPrinter.print(data, printerOptions)
    .then(() => {
      return {
        success: true,
        error: null,
        message: 'Factura impresa correctamente!',
      };
    })
    .catch((err) => {
      return {
        success: false,
        error:
          err === 'TimedOut'
            ? 'Error de conexión. Verifique que la impresora este conectada correctamente.'
            : err,
        message: 'Error al imprimir la factura.',
      };
    });
});
