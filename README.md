# **This is a work in Progress**

This is a two part process. The first part is using Puppeteer to collect the ZPL print command from Plex (Chrome developer network tools). Then a file is created with the ZPL data to create a label to be printed. The second script reads the ZPL data and sends it to a printer to be be printed.

You need to have Python and Node.js installed. I'm going to assume you know how to install those. You will also need two other modules. A Node.js extention called Puppeteer and a Python extention named FS. Puppeteer allows us to control Chrome via the browsers Developer Tools and FS allows Python to read/modify files on the File System.

## Install Puppeteer and Python FS:

In a linux terminal run the following commands.

```bash
npm install puppeteer
pip install fs
```

## Running the puppeteer script.

Download the two python scripts in this repo.
    - findPrinterCode_label_file.js
    - printzpl.py
Save these file to a directory/location of your liking.  
Open a terminal program and browse to the script location. Then run the following command. 

```bash
node findPrinterCode_label_file.js
```

This will open a new Chrome Window in developer mode with Puppeteer listening for the ZPL code to show up. Once Puppeteer finds the ZPL code it will save it as the file Label.zpl.

Note that the file findPrinterCode_label_file.js needs to be edited for production use. It currently has the Plex test site set in it.  Modify this line to remove the test site. 

```Python
await page.goto('https://test.cloud.plex.com/', {
```

## Printing Label.zpl

For ZPL printing there is a Python Script "PrintZPL.py".  This script has several lines that need to be modified.

```Python
import socket

# Printer IP and Port
printer_ip = "127.0.0.1"  # replace with your printer's IP
printer_port = 9100       # Set the printers port

# Read ZPL file
with open(r'C:\temp\Puppeteer\Label.zpl', 'rb') as file:
    zpl_data = file.read()
    
# Send ZPL to printer
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((printer_ip, printer_port))
    s.send(zpl_data)
```

## Future items I want to add

- Have a the folder that the Label.zpl file is saved to be a "hot folder" so once the file is created the print script is automatically ran.
- Set up the printzpl.py script to automatically set/find the Label.zpl so it doesn't have to manually set.
- Run as an extension so it can be turned on/off
- Run in a normal chrome window.  Puppeteer runs in the developer mode.  
- There is an error because the Plex plugin isn't detected. Even though this setup works there is always an error.  Since we are already in the Developer Mode there should be a way to suppress the error.

Notes:

- Ensure that your printer is compatible with ZPL.
- Check the printer’s documentation for any specific instructions or configurations needed for printing.
- You may need to configure your printer settings to accept ZPL commands.

By following these steps, you should be able to print your ZPL file successfully! If you have any specific issues or errors while printing, feel free to ask for help! I'm learning with this as well.
