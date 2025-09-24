#!/usr/bin/env python3
"""
AgriStack Server Launcher
Run this to start the Python backend server
"""

import subprocess
import sys
import os

def install_requirements():
    """Install required packages"""
    print("Installing Python dependencies...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Dependencies installed successfully!")
    except subprocess.CalledProcessError:
        print("❌ Failed to install dependencies")
        return False
    return True

def start_server():
    """Start the Flask server"""
    print("Starting AgriStack server...")
    print("🌾 Server will be available at: http://localhost:5000")
    print("📱 Open index.html in your browser to use the app")
    print("Press Ctrl+C to stop the server")
    
    try:
        subprocess.run([sys.executable, "app.py"])
    except KeyboardInterrupt:
        print("\n👋 Server stopped. Goodbye!")

if __name__ == "__main__":
    print("🌾 AgriStack - Smart Agriculture Management")
    print("=" * 50)
    
    if not os.path.exists("requirements.txt"):
        print("❌ requirements.txt not found!")
        sys.exit(1)
    
    if install_requirements():
        start_server()
    else:
        print("❌ Setup failed. Please install dependencies manually:")
        print("pip install Flask Flask-CORS Pillow requests")