import http.server
import socketserver
import webbrowser
import os
import sys
import threading
import time
import subprocess
import shutil

# Configuration
PORT = 5000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class PortfolioHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        """Suppress default request logs for a cleaner console."""
        pass

def open_browser():
    """Wait for server to start, then open the browser."""
    time.sleep(1.5)
    print(f"\n🚀 Opening portfolio at http://localhost:{PORT}")
    webbrowser.open(f"http://localhost:{PORT}")

def check_npx():
    """Check if npx is available on the system."""
    return shutil.which("npx") is not None

def run_advanced_server():
    """Attempts to run browser-sync for Live Reloading."""
    print(f"✨ Detected Node.js! Starting Advanced Dev Mode (Live Reloading)...")
    
    # We use npx browser-sync to avoid requiring global installation
    # Files to watch: index.html, all CSS in css/, all JS in js/
    cmd = [
        "npx", "browser-sync", "start",
        "--server",
        "--port", str(PORT),
        "--files", "index.html, css/*.css, js/*.js",
        "--no-notify",     # Hide the 'Connected to BrowserSync' notification
        "--no-open"        # We handle opening the browser ourselves for consistency
    ]
    
    try:
        # Start browser thread
        threading.Thread(target=open_browser, daemon=True).start()
        
        # Run browser-sync (this will block until Ctrl+C)
        subprocess.run(cmd, check=True)
    except (subprocess.CalledProcessError, KeyboardInterrupt):
        pass
    except Exception as e:
        print(f"⚠️ Could not start Advanced Mode: {e}")
        run_standard_server()

def run_standard_server():
    """Starts the local HTTP server (Fallback)."""
    # Allow port reuse to avoid 'Address already in use' errors
    socketserver.TCPServer.allow_reuse_address = True

    try:
        with socketserver.TCPServer(("", PORT), PortfolioHandler) as httpd:
            print(f"==========================================")
            print(f"  Yanelle Bryan A. | Portfolio Server")
            print(f"==========================================")
            print(f"  Serving from : {DIRECTORY}")
            print(f"  Local URL    : http://localhost:{PORT}")
            print(f"  Mode         : Standard (Manual Refresh)")
            print(f"  Status       : ✅ RUNNING")
            print(f"------------------------------------------")
            print(f"  Press Ctrl+C to stop the server.")
            print(f"==========================================\n")

            # Start browser thread
            threading.Thread(target=open_browser, daemon=True).start()
            httpd.serve_forever()
            
    except OSError as e:
        if e.errno == 48:
            print(f"❌ Error: Port {PORT} is already in use.")
            print(f"   Close the other process or change PORT in run.py")
        else:
            print(f"❌ An unexpected error occurred: {e}")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\n\n👋 Server stopped. Have a great day!")
        sys.exit(0)

def main():
    os.chdir(DIRECTORY)
    
    # Try to use Advanced Mode (BrowserSync) if npx is available
    if check_npx():
        try:
            run_advanced_server()
        except KeyboardInterrupt:
            print("\n\n👋 Server stopped. Have a great day!")
            sys.exit(0)
    else:
        run_standard_server()

if __name__ == "__main__":
    main()
