// Electron requires
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const dialog = electron.dialog

// Other node requires
const path = require('path')
const url = require('url')
const debounce = require('debounce')

// 
const AppMenu = require('./appmenu')
const FileIO = require('./fileio')
const Game = require('./game').Game;

let mainWindow = null

let isFullscreen = false

let game = null

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
	// newWindow.webContents.openDevTools()

	newWindow.on('resize', debounce(function () {
		if (game)
			game.reRender();
	}, 250));

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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function handleFullscreen()
{
	createWindow(!isFullscreen); // Toggle full / windowed
	game.window = mainWindow;
}

function handleMenuOpen()
{
	let filePaths = dialog.showOpenDialog(mainWindow, {properties: ['openFile']});
	if (!filePaths || filePaths.length < 1)
		return;
	
	game = new Game(FileIO.openFile(filePaths[0]), mainWindow);
	global.game = game; // How we pass things to the renderer process

	// Reload the page
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));
}

function handleMenuSave()
{

}