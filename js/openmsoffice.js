(function () {

	var FilesOpenMSOfficePlugin = {
		attach: function (fileList) {
			var self = this;

			var supportedApplications = [
				{
					"scheme": "ms-word",
					"slug": "MSWORD",
					"appName": "MS Word",
					"mimeTypes": [
						"application/msword",
						"application/msword",
						"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
						"application/vnd.openxmlformats-officedocument.wordprocessingml.template",
						"application/vnd.ms-word.document.macroEnabled.12",
						"application/vnd.ms-word.template.macroEnabled.12"
					]
				},
				{
					"scheme": "ms-excel",
					"slug": "MSEXCEL",
					"appName": "MS Excel",
					"mimeTypes": [
						"application/vnd.ms-excel",
						"application/vnd.ms-excel",
						"application/vnd.ms-excel",
						"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
						"application/vnd.openxmlformats-officedocument.spreadsheetml.template",
						"application/vnd.ms-excel.sheet.macroEnabled.12",
						"application/vnd.ms-excel.template.macroEnabled.12",
						"application/vnd.ms-excel.addin.macroEnabled.12",
						"application/vnd.ms-excel.sheet.binary.macroEnabled.12",
					]
				},
				{
					"scheme": "ms-powerpoint",
					"slug": "MSPPT",
					"appName": "MS PowerPoint",
					"mimeTypes": [
						"application/vnd.ms-powerpoint",
						"application/vnd.ms-powerpoint",
						"application/vnd.ms-powerpoint",
						"application/vnd.ms-powerpoint",
						"application/vnd.openxmlformats-officedocument.presentationml.presentation",
						"application/vnd.openxmlformats-officedocument.presentationml.template",
						"application/vnd.openxmlformats-officedocument.presentationml.slideshow",
						"application/vnd.ms-powerpoint.addin.macroEnabled.12",
						"application/vnd.ms-powerpoint.presentation.macroEnabled.12",
						"application/vnd.ms-powerpoint.template.macroEnabled.12",
						"application/vnd.ms-powerpoint.slideshow.macroEnabled.12"
					]
				}
			];

			supportedApplications.forEach (function (officeApp) {
				officeApp.mimeTypes.forEach (function (mimeType) {
					fileList.fileActions.registerAction({
						name: 'OpenWith' + officeApp.slug,
						displayName: t('files_open_msoffice', 'Open with {appName}', {"appName": officeApp.appName}),
						mime: mimeType,
						order: 100,
						iconClass: 'icon-openmsoffice icon-openmsoffice-' + officeApp.scheme,
						permissions: OC.PERMISSION_UPDATE,
						actionHandler: function (fileName, context) {
							self.openWithMSO(fileName, context, officeApp.scheme);
						}
					});
					fileList.fileActions.registerAction({
						name: 'OpenWith' + officeApp.slug + '_default',
						displayName: t('files_open_msoffice', 'Open with {appName}', {"appName": officeApp.appName}),
						mime: mimeType,
						order: 100,
						iconClass: 'icon-openmsoffice icon-openmsoffice-' + officeApp.scheme,
						permissions: OC.PERMISSION_UPDATE,
						actionHandler: function (fileName, context) {
							self.openWithMSO(fileName, context, officeApp.scheme);
						}
					});
					fileList.fileActions.setDefault(mimeType, 'OpenWith' + officeApp.slug + '_default');
				})
			});
		},

		openWithMSO(fileName, context, scheme) {
			var dir = context.dir || context.fileList.getCurrentDirectory();
			var isDir = context.$file.attr('data-type') === 'dir';

			if (isDir) {
				return;
			}

			var url = scheme + ":ofe|u|" + context.fileList.filesClient.getBaseUrl()
				+ dir
				+ '/' + fileName;
			if (url) {
				//OCA.Files.Files.handleDownload(url, null);
				OC.redirect(url);
			}
		}
	};

	OC.Plugins.register('OCA.Files.FileList', FilesOpenMSOfficePlugin)

})();
