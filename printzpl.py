import socket

# Printer IP and Port
printer_ip = "127.0.0.1"  # replace with your printer's IP
printer_port = 9100

# Read ZPL file
with open(r'C:\temp\Puppeteer\Label.zpl', 'rb') as file:
    zpl_data = file.read()

# Send ZPL to printer
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((printer_ip, printer_port))
    s.send(zpl_data)