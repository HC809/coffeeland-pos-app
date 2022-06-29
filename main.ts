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
  const newOrderInfo = arg.newOrderInfo;
  const newOrderAmounts = arg.newOrderAmounts;
  const newOrderDetail = arg.newOrderProductDetail;
  const invoiceRange = arg.invoiceRange;

  console.log(companyInfo.name);

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
      value: `C.A.I.: ${invoiceRange?.cai}`,
      style: `text-align:left;`,
      css: { 'font-size': '12PX', 'padding-top': '10px' },
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
    // {
    //   type: 'table',
    //   // style the table
    //   style: 'border: 1px solid #ddd',
    //   // list of the columns to be rendered in the table header
    //   tableHeader: ['', ''],
    //   // multi dimensional array depicting the rows and columns of the table body
    //   tableBody: [
    //     [
    //       { type: 'text', value: 'CAI', css: { 'font-size': '14px' } },
    //       {
    //         type: 'text',
    //         value: invoiceRange.cai,
    //         css: { 'font-size': '14px' },
    //       },
    //     ],
    //   ],
    //   // custom style for the table body
    //   tableBodyStyle: 'border: 0.5px solid #ddd',
    // },
    // {
    //   type: 'table',
    //   style: 'border: 1px solid #ddd', // style the table
    //   // list of the columns to be rendered in the table header
    //   tableHeader: [{ type: 'text', value: 'Animal' }],
    //   // multi dimensional array depicting the rows and columns of the table body
    //   tableBody: [
    //     [
    //       { type: 'text', value: 'Cat' },
    //       { type: 'image', path: './animals/cat.jpg' },
    //     ],
    //     [
    //       { type: 'text', value: 'Dog' },
    //       { type: 'image', path: './animals/dog.jpg' },
    //     ],
    //     [
    //       { type: 'text', value: 'Horse' },
    //       { type: 'image', path: './animals/horse.jpg' },
    //     ],
    //     [
    //       { type: 'text', value: 'Pig' },
    //       { type: 'image', path: './animals/pig.jpg' },
    //     ],
    //   ],
    //   // list of columns to be rendered in the table footer
    //   tableFooter: [{ type: 'text', value: 'Animal' }, 'Image'],
    //   // custom style for the table header
    //   tableHeaderStyle: 'background-color: #000; color: white;',
    //   // custom style for the table body
    //   tableBodyStyle: 'border: 0.5px solid #ddd',
    //   // custom style for the table footer
    //   tableFooterStyle: 'background-color: #000; color: white;',
    // },
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
