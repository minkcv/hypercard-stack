const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const dialog = electron.dialog

const path = require('path')
const url = require('url')

const AppMenu = require('./appmenu')

let mainWindow = null

let isFullscreen = false

function createWindow (setFullscreen) {
	isFullscreen = setFullscreen;

	let newWindow = new BrowserWindow({width: 800, height: 600, fullscreen: isFullscreen});

	// and load the index.html of the app.
	newWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	newWindow.on('closed', function () {

	});

	// Set up the native menu.
	electron.Menu.setApplicationMenu(
		electron.Menu.buildFromTemplate(
			AppMenu.createMenuTemplate(handleMenuOpen, handleMenuSave, handleFullscreen, isFullscreen)));

	if (isFullscreen)
		newWindow.setAutoHideMenuBar(true);

	if (mainWindow)
		mainWindow.close();

	mainWindow = newWindow;
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
	createWindow(false);
	electron.globalShortcut.register('Esc', () =>
	{
		if (isFullscreen)
			createWindow(false);
	});
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	// But I don't care.
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function handleFullscreen()
{
	createWindow(!isFullscreen); // Toggle full / windowed
}

function handleMenuOpen()
{
	dialog.showOpenDialog(mainWindow, {properties: ['openFile']}, fileChosen);
}

function handleMenuSave()
{

}

function fileChosen(filepath)
{
	console.log(filepath);
}