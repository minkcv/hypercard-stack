const electron = require('electron')

module.exports = 
{
    createMenuTemplate: function(handleOpen, handleSave, handleFullscreen, isFullscreen)
    {
        let fullscreenLabel = 'Full Screen';
        if (isFullscreen)
            fullscreenLabel = 'Exit Full Screen';

        return [
            {
                label: 'File',
                submenu:
                [
                    { click: handleOpen,        label: 'Open', accelerator: 'CommandOrControl+O' },
                    { click: handleSave,        label: 'Save', accelerator: 'CommandOrControl+S' },
                    { click: electron.app.quit, label: 'Exit', accelerator: 'CommandOrControl+Q' }
                ]
            },
            {
                label: 'View',
                submenu:
                [
                    { click: handleFullscreen, label: fullscreenLabel }
                ]
            }
        ];
    }
}