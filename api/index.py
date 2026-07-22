import os
import sys

# Đảm bảo thư mục gốc dự án nằm trong sys.path để import Project.app
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

from Project.app import app
