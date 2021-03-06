// 1. Import Modules
const { MSICreator } = require('electron-wix-msi');
const path = require('path');
//{32BEDCBD-4F22-45BA-9379-EDFF850FA129}

// 2. Define input and output directory.
// Important: the directories must be absolute, not relative e.g
// appDirectory: "C:\\Users\sdkca\Desktop\OurCodeWorld-win32-x64",
const APP_DIR = path.resolve(__dirname, './coffeelandpos-win32-x64');
// outputDirectory: "C:\\Users\sdkca\Desktop\windows_installer",
const OUT_DIR = path.resolve(__dirname, './windows_installer');

// 3. Instantiate the MSICreator
const msiCreator = new MSICreator({
  appDirectory: 'C:\\Users\\USUARIO\\Desktop\\coffeelandpos-win32-x64', //APP_DIR,
  outputDirectory: 'C:\\Users\\USUARIO\\Desktop', //OUT_DIR,
  appIconPath: path.resolve(__dirname, './src/assets/images/favicon.ico'),
  // Configure metadata
  description: 'CoffeeLandPOS',
  exe: 'CoffeeLandPOS',
  name: 'CoffeeLandPOS',
  manufacturer: 'Dual Tech',
  version: '1.0.0',

  // Configure installer User Interface
  ui: {
    chooseDirectory: true,
  },
});

// 4. Create a .wxs template file
msiCreator.create().then(function () {
  // Step 5: Compile the template to a .msi file
  msiCreator.compile();
});
