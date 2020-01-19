// ------------------------------------------------------------------
// APP CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
    logging: true,
 
    intentMap: {
       'AMAZON.StopIntent': 'END',
    },
 
    db: {
         FileDb: {
             pathToFile: '../db/db.json',
         }
     },

    cms: {
	    GoogleSheetsCMS: {
	        spreadsheetId: '10oX-86DeSJPXBuIJdhJr_744ccdZAX5yrM6si_Jhj8E',
	        access: 'private',
	        credentialsFile: './credentials/google-sheets.json',
	        sheets: [
	            {
	                name: 'responses',
	                type: 'Responses',
	                position: 1
                },
                {
	                name: 'reply',
	                position: 2
            	}
            ],
            caching: false,                 // disable caching for all sheets
        }
    },
 };
 